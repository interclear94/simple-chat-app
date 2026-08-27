// import { NextFunction, Request, Response } from "express";

// import { UserService } from "../services/user.service.js";
// import { AppError } from "../utils/app-error.js";

// /*
//   Request body의 타입을 정의합니다.

//   Express의 req.body는 기본적으로 any이기 때문에
//   직접 타입을 지정해주는 것이 좋습니다.
// */
// interface CreateUserRequestBody {
//   email: string;
//   nickname: string;
// }

// export async function createUser(
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ): Promise<void> {
//   try {
//     const { email, nickname } = req.body as CreateUserRequestBody;

//     const user = await UserService.createUser({
//       email,
//       nickname,
//     });

//     res.status(201).json({
//       data: user,
//     });
//   } catch (error) {
//     next(error);
//   }
// }
// // export class UserController {
// //   /**
// //    * GET /api/users
// //    */
// //   static async getUsers(_req: Request, res: Response): Promise<void> {
// //     /*
// //       실제 DB 조회는 UserService에 맡깁니다.
// //     */
// //     const users = await UserService.getUsers();

// //     res.status(200).json({
// //       data: users,
// //     });
// //   }

// //   /**
// //    * POST /api/users
// //    */
// //   static async createUser(req: Request, res: Response): Promise<void> {
// //     /*
// //       req.body의 타입을 지정합니다.
// //     */
// //     const { email, nickname } = req.body as CreateUserRequestBody;

// //     /*
// //       요청 데이터가 있는지만 Controller에서 간단하게 확인합니다.

// //       복잡한 비즈니스 규칙은 Service에서 확인합니다.
// //     */
// //     if (!email || !nickname) {
// //       throw new AppError("email은 필수입니다.", 400);
// //     }

// //     /*
// //       실제 사용자를 생성하는 업무는 Service에 위임합니다.
// //     */
// //     const user = await UserService.createUser({
// //       email,
// //       nickname,
// //     });

// //     res.status(201).json({
// //       data: user,
// //     });
// //   }
// // }

import { Request, Response, NextFunction } from "express";
import { createUser } from "../services/user.service.js";

interface CreateUserRequestBody {
  email: string;
  nickname: string;
  password: string;
}

// export async function getUsers(
//   _req: Request,
//   res: Response,
//   next: NextFunction,
// ): Promise<void> {
//   try {
//     const users = await UserService.getUsers();

//     res.status(200).json({
//       data: users,
//     });
//   } catch (error) {
//     next(error);
//   }
// }

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, nickname, password } = req.body as CreateUserRequestBody;

    const user = await createUser({
      email,
      nickname,
      password,
    });

    res.status(201).json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
