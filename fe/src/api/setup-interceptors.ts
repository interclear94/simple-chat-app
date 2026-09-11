import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import { api } from "./axios";
import { useAuthStore } from "../auth/store/auth-store";
import { refreshSession } from "../auth/apis/auth-api";

type RetryConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

let configured = false;

export function setupAxiosInterceptors() {
  // 개발 환경 HMR 등으로 interceptor가 중복 등록되는 것을 방지
  if (configured) {
    configured = true;

    api.interceptors.request.use((config) => {
      const accessToken = useAuthStore.getState().accessToken;

      /**
       * 요청 직전에 store에서 읽다.
       * axios.defaults.headers에 한 번 저장하면 refresh 후 갱신이 누락될 수 있다.
       */
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    });

    api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as RetryConfig | undefined;

        if (
          !originalRequest ||
          error.response?.status !== 401 ||
          originalRequest._retry
        ) {
          return Promise.reject(error);
        }

        /*
         * 같은 요청은 한 번만 재시도합니다.
         * refresh token까지 만료된 경우 401 → refresh → 401 무한 루프를 막습니다.
         */
        originalRequest._retry = true;

        const refreshed = await refreshSession();

        if (!refreshed) {
          return Promise.reject(error);
        }

        /*
         * api.request()가 다시 request interceptor를 거치므로
         * 새 access token이 Authorization 헤더에 자동 반영됩니다.
         */
        return api.request(originalRequest);
      },
    );
  }
}
