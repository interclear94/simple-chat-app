import { create } from "zustand";

export type UserDto = {
  id: number;
  email: string;
  nickname: string;
  role: "user" | "admin";
};

type AuthStatus = "checking" | "authenticated" | "unauthenticated";

type AuthState = {
  accessToken: string | null;
  user: UserDto | null;
  status: AuthStatus;

  setSession: (accessToken: string, user: UserDto) => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  // 앱 시작 시 refresh token으로 로그인 상태를 확인하는 동안 사용
  status: "checking",

  setSession: (accessToken, user) =>
    set({
      accessToken,
      user,
      status: "authenticated",
    }),

  clearSession: () =>
    set({
      accessToken: null,
      user: null,
      status: "unauthenticated",
    }),
}));
