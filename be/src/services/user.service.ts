// import { UniqueConstraintError } from "sequelize";

// import { User } from "../models/User.js";
// import { AppError } from "../utils/app-error.js";

// /*
//   UserService는 사용자와 관련된 비즈니스 로직을 담당합니다.

//   Controller는 HTTP 요청과 응답에 집중하고,
//   실제 사용자 생성이나 조회 규칙은 이곳에 작성합니다.
// */
// export class UserService {
//   /**
//    * 사용자 목록을 조회합니다.
//    */
//   static async getUsers(): Promise<User[]> {
//     return User.findAll({
//       /*
//         ID가 큰 사용자부터 최신 사용자라고 가정합니다.
//       */
//       order: [["id", "DESC"]],

//       /*
//         응답에 필요한 컬럼만 조회합니다.
//       */
//       attributes: ["id", "email", "nickname", "createdAt"],
//     });
//   }

//   /**
//    * 사용자 한 명을 생성합니다.
//    *
//    * 현재 단계에서는 DB 연결 확인을 위해
//    * email과 nickname만 사용합니다.
//    *
//    * 실제 회원가입 단계에서는 여기에 passwordHash와
//    * bcrypt 처리 로직을 추가합니다.
//    */
//   static async createUser(params: {
//     email: string;
//     nickname: string;
//   }): Promise<User> {
//     /*
//       trim은 문자열 양쪽의 공백을 제거합니다.
//     */
//     const email = params.email.trim().toLowerCase();
//     const nickname = params.nickname.trim();

//     if (!email || !nickname) {
//       throw new AppError("email과 nickname은 필수입니다.", 400);
//     }

//     /*
//       간단한 이메일 형식 검사입니다.

//       실제 프로젝트에서는 zod, joi, express-validator 등을
//       사용해 검증 로직을 분리하는 것이 더 좋습니다.
//     */
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!emailPattern.test(email)) {
//       throw new AppError("올바른 이메일 형식이 아닙니다.", 400);
//     }

//     if (nickname.length > 50) {
//       throw new AppError("닉네임은 50자 이하이어야 합니다.", 400);
//     }

//     try {
//       /*
//         User.create는 users 테이블에 INSERT합니다.
//       */
//       return await User.create({
//         email,
//         nickname,
//       });
//     } catch (error) {
//       /*
//         email 또는 nickname의 UNIQUE 제약 조건이
//         위반되었을 때 발생합니다.
//       */
//       if (error instanceof UniqueConstraintError) {
//         throw new AppError("이미 사용 중인 이메일 또는 닉네임입니다.", 409);
//       }

//       /*
//         우리가 예상하지 못한 오류는 그대로 던집니다.
//         최종적으로 error middleware가 처리합니다.
//       */
//       throw error;
//     }
//   }
// }

import { UniqueConstraintError } from "sequelize";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import { badRequest, conflict } from "../utils/httpErrors.js";

export async function createUser(params: {
  email: string;
  nickname: string;
  password: string;
}): Promise<User> {
  const email = params.email.trim().toLowerCase();
  const nickname = params.nickname.trim();

  if (!email || !nickname) {
    badRequest("email과 nickname은 필수입니다.");
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /**
   * emailPattern.test(email)
   * 정규식 규칙 판별
   */
  if (!emailPattern.test(email)) {
    throw badRequest("올바른 이메일 형식이 아닙니다.");
  }

  if (nickname.length > 50) {
    throw badRequest("닉네임은 50자 이하이어야 합니다.");
  }

  const password = params.password;

  if (password.length < 8) {
    throw badRequest("비밀번호는 8자 이상이어야합니다.");
  }

  const passwordHash = await bcrypt.hash(password, 5);

  try {
    return await User.create({
      email,
      nickname,
      passwordHash,
    });
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      throw conflict("이미 사용 중인 이메일 또는 닉네임입니다.");
    }

    throw err;
  }
}
