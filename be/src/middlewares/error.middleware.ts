import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

import { ValidationError } from "sequelize";
import { AppError } from "../utils/app-error.js";
import { clearRefreshCookie } from "../utils/cookie.js";

/*
  Express의 에러 미들웨어는
  반드시 매개변수가 4개여야 합니다.

  err, req, res, next

  첫 번째 매개변수 err가 있기 때문에
  일반 미들웨어와 구분됩니다.
*/
export const errorMiddleware: ErrorRequestHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  console.error(error);

  /*
    우리가 직접 만든 AppError인 경우입니다.

    예:
    throw new AppError("이미 존재합니다.", 409);
  */
  if (error instanceof AppError) {
    if ("shouldClearRefreshCookie" in error && error.shouldClearRefreshCookie) {
      clearRefreshCookie(res);
    }

    res.status(error.statusCode).json({
      message: error.message,
    });

    return;
  }

  /*
    Sequelize의 ValidationError입니다.

    예:
    email 형식이 잘못된 경우
  */
  if (error instanceof ValidationError) {
    res.status(400).json({
      message: "입력값이 올바르지 않습니다.",
      errors: error.errors.map((item) => ({
        field: item.path,
        message: item.message,
      })),
    });

    return;
  }

  /*
    위에서 처리하지 않은 예상하지 못한 오류입니다.

    실제 오류 내용을 그대로 사용자에게 보내면
    내부 구조가 노출될 수 있으므로
    일반적인 메시지만 응답합니다.
  */
  res.status(500).json({
    message: "서버 내부 오류가 발생했습니다.",
  });
};
