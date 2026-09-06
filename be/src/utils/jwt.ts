import jwt from "jsonwebtoken";
import { env } from "./env";

interface LoginDto {
  email: string;
  password: string;
}

export const createToken = (loginData: LoginDto) => {
  return jwt.sign(loginData, env.jwt, { expiresIn: "15m", algorithm: "HS256" });
};
