import { useEffect, type PropsWithChildren } from "react";
import { useAuthStore } from "../auth/store/auth-store";
import { initializeAuth } from "../auth/apis/auth-api";

export const AuthBootstrap = ({ children }: PropsWithChildren) => {
  const status = useAuthStore((state) => state.status);

  useEffect(() => {
    void initializeAuth();
  }, []);

  if (status === "checking") {
    return <div>로그인 상태를 확인하고 있습니다.</div>;
  }

  return <>{children}</>;
};
