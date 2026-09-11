import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import { unauthorized } from "../utils/httpErrors.js";
import {
  createAccessToken,
  createRefreshToken,
  RefreshClaims,
  verifyRefreshToken,
} from "../utils/jwt.js";
import { clearRefreshCookie } from "../utils/cookie.js";
import { sequelize } from "../config/database.js";

export const login = async (params: { email: string; password: string }) => {
  const email = params.email.trim().toLowerCase();

  const user = await User.findOne({
    where: { email },
  });

  // 이메일이 존재하지 않아도 동일한 에러 반환
  if (!user) {
    throw unauthorized("이메일 또는 비밀번호가 올바르지 않습니다.");
  }

  const isPasswordValid = await bcrypt.compare(
    params.password,
    user.passwordHash,
  );

  if (!isPasswordValid) {
    throw unauthorized("이메일 또는 비밀번호가 올바르지 않습니다.");
  }

  //  access token 발급
  const accessToken = createAccessToken(user);

  // refreshToken 발급
  const { token: refreshToken } = createRefreshToken(user.id);

  await user.update({
    refreshTokenHash: await bcrypt.hash(refreshToken, 5),
  });

  return {
    user: {
      id: user.id,
      email: user.email,
    },
    accessToken,
    refreshToken,
  };
};

export const refreshSession = async (refreshToken: string | undefined) => {
  if (!refreshToken) {
    throw unauthorized("로그인이 필요합니다.");
  }

  let claims: RefreshClaims;

  try {
    claims = verifyRefreshToken(refreshToken);
  } catch (error) {
    throw unauthorized("유효하지 않거나 만료된 로그인 세션입니다.");
  }

  const result = await sequelize.transaction(async (transaction) => {
    const user = await User.findByPk(Number(claims.sub), {
      transaction,
      lock: transaction.LOCK.UPDATE,
    });

    let tokenMatches = false;

    if (user?.refreshTokenHash) {
      tokenMatches = await bcrypt.compare(refreshToken, user.refreshTokenHash);
    }

    if (!user || !tokenMatches) {
      /*
          JWT 서명은 정상인데 DB hash가 다르면,
          이미 rotation된 이전 refresh token의 재사용일 수 있습니다.

          사용자당 refresh token 하나만 관리하는 구조에서는
          현재 세션 하나를 폐기합니다.

          여기서 throw하면 update도 롤백되므로,
          실패 결과를 return해 트랜잭션을 정상 커밋합니다.
        */
      if (user) {
        await user.update(
          {
            refreshTokenHash: null,
          },
          { transaction },
        );
      }

      return { ok: false };
    }

    /*
        Refresh Token Rotation:
        매 refresh마다 새 refresh token과 hash로 교체합니다.
        이전 refresh token은 즉시 무효가 됩니다.
      */
    const { token: nextRefreshToken, expiresAt } = createRefreshToken(user.id);

    await user.update(
      {
        refreshTokenHash: await bcrypt.hash(nextRefreshToken, 12),
      },
      { transaction },
    );

    return {
      ok: true,
      user,
      accessToken: createAccessToken(user),
      refreshToken: nextRefreshToken,
    };
  });

  /*
    transaction은 이미 끝났고, 무효 세션이라면
    refreshTokenHash를 null로 변경한 내용도 커밋된 상태입니다.
  */
  if (!result.ok) {
    throw unauthorized("유효하지 않은 로그인 세션입니다.");
  }

  return result;
};
