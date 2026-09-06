import { Request, Response } from "express";
import { login } from "../services/auth.service";
import { createToken } from "../utils/jwt.js";

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  /**
   * user
   * 로그인 한 유저의 정보
   */
  const result = await login({ email, password });

  /**
   * access token 발급
   */
  const accessToken = createToken({ email, password });

  res.status(200).json({
    message: "로그인 성공",
    result,
    accessToken,
  });
};
