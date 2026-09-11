import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "./env";
import { User, UserRole } from "../models/User";

interface LoginDto {
  email: string;
  password: string;
}

export interface AccessClaims extends JwtPayload {
  typ: "access";
  role: UserRole;
}

export interface RefreshClaims extends JwtPayload {
  typ: "refresh";
}

export const createAccessToken = (user: User) => {
  return jwt.sign({ typ: "access", role: user.role }, env.jwt_access_secret, {
    subject: String(user.id),
    expiresIn: "15m",
    algorithm: "HS256",
  });
};

/*
  refresh token에는 권한을 넣지 않습니다.
  용도(typ)와 사용자 식별자(sub)만 있으면 충분합니다.
*/
export function createRefreshToken(userId: number) {
  const token = jwt.sign({ typ: "refresh" }, env.jwt_refresh_secret, {
    subject: String(userId),
    expiresIn: "14d",
    algorithm: "HS256",
  });

  return {
    token,
    expiresAt: new Date(Date.now() + "14d"),
  };
}

export const verifyAccessToken = (token: string): AccessClaims => {
  const payload = jwt.verify(token, env.jwt_access_secret, {
    algorithms: ["HS256"],
  });

  if (
    typeof payload === "string" ||
    payload.typ !== "access" ||
    typeof payload.sub !== "string" ||
    typeof payload.role !== "string"
  ) {
    throw new Error("Invalid access token");
  }

  return payload as AccessClaims;
};

export const verifyRefreshToken = (token: string): RefreshClaims => {
  const payload = jwt.verify(token, env.jwt_refresh_secret, {
    algorithms: ["HS256"],
  });

  if (
    typeof payload === "string" ||
    payload.typ !== "refresh" ||
    typeof payload.sub !== "string"
  ) {
    throw new Error("Invalid refresh token");
  }

  return payload as RefreshClaims;
};
