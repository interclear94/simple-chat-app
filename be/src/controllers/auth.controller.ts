import { NextFunction, Request, Response } from "express";
import { login, refreshSession } from "../services/auth.service";
import { createAccessToken } from "../utils/jwt.js";
import { clearRefreshCookie, refreshCookieOptions } from "../utils/cookie";
import { AppError } from "../utils/app-error";

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  /**
   * user
   * 로그인 한 유저의 정보
   */
  const result = await login({ email, password });

  // cookie refresh token 보냄
  res.cookie("refreshToken", result.refreshToken, refreshCookieOptions);

  res.status(200).json({
    message: "로그인 성공",
    result: {
      user: result.user,
      accessToken: result.accessToken,
    },
  });
};

export const refreshController = async (req: Request, res: Response) => {
  const rawRefreshToken = req.cookies.refreshToken as string | undefined;

  const result = await refreshSession(rawRefreshToken);

  /*
      service가 새 토큰을 만들고,
      controller가 HTTP cookie 응답으로 설정합니다.
    */
  res.cookie("refreshToken", result.refreshToken, refreshCookieOptions);

  return res.status(200).json({
    accessToken: result.accessToken,
    user: result.user,
  });
};
