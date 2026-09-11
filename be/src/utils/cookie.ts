import { CookieOptions, Response } from "express";

const isProduction = process.env.NODE_ENV === "production";

const refreshCookieBase: CookieOptions = {
  httpOnly: true,
  // JavaScript가 document.cookie로 읽을 수 없게 해 XSS 탈취 위험을 줄입니다.

  secure: isProduction,

  sameSite: "lax",
  // 프론트와 API가 같은 site일 때 CSRF 방어에 유리합니다.
  // 다른 사이트라서 None을 써야 한다면 secure: true와 CSRF 방어가 필수입니다.

  path: "/auth",
  // refresh cookie를 auth API에만 전송합니다.

  // domain은 생략합니다.
  // host-only cookie가 되어 불필요한 서브도메인 전송을 줄입니다.
};

export const refreshCookieOptions: CookieOptions = {
  ...refreshCookieBase,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export function clearRefreshCookie(res: Response) {
  // 삭제할 때도 path, sameSite, secure를 동일하게 맞춥니다.
  res.clearCookie("refreshToken", refreshCookieBase);
}
