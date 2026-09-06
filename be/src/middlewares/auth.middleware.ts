import { NextFunction, Request, Response } from "express";
import { unauthorized } from "../utils/httpErrors";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId?: number;
}

export const authMiddleware = (
  req: AuthRequest,
  _res: Response,
  next: NextFunction,
) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    throw unauthorized("인증이 필요합니다.");
  }

  const [type, token] = authorization.split(" ");

  if (type !== "Bearer" || !token) {
    throw unauthorized("유효하지 않은 인증 형식입니다.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: number;
    };

    req.userId = decoded.userId;

    next();
  } catch (error) {
    throw unauthorized("유효하지 않은 인증 토큰입니다.");
  }
};
