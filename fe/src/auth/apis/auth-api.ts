// src/api/auth-api.ts
import axios from "axios";

import { authHttp } from "../../api/axios";
import { useAuthStore, type UserDto } from "../store/auth-store";

type AuthResponse = {
  accessToken: string;
  user: UserDto;
};

let refreshInFlight: Promise<boolean> | null = null;

export function refreshSession(): Promise<boolean> {
  if (refreshInFlight) {
    return refreshInFlight;
  }

  const request: Promise<boolean> = authHttp
    .post<AuthResponse>("/api/auth/refresh")
    .then<boolean>(({ data }) => {
      useAuthStore.getState().setSession(data.accessToken, data.user);

      return true;
    })
    .catch((error: unknown): boolean => {
      /*
        refresh 실패 시 access token은 이미 없거나 곧 만료될 토큰이므로
        현재 탭의 인증 상태를 제거합니다.
      */
      useAuthStore.getState().clearSession();

      if (!axios.isAxiosError(error)) {
        console.error("알 수 없는 refresh 오류", error);
      }

      return false;
    });

  refreshInFlight = request;

  /*
    request 자체는 catch에서 항상 boolean으로 끝납니다.
    완료 후에만 다음 refresh 요청을 허용합니다.
  */
  void request.finally(() => {
    if (refreshInFlight === request) {
      refreshInFlight = null;
    }
  });

  return request;
}

export async function initializeAuth(): Promise<void> {
  await refreshSession();
}
