import type { PropsWithChildren } from "react";
import { useAuthStore } from "../auth/store/auth-store";
import { Navigate } from "react-router-dom";

export const RequireAuth = ({ children }: PropsWithChildren) => {
  const status = useAuthStore((state) => state.status);

  if (status === "checking") {
    return <div>확인 중...</div>;
  }

  if (status === "authenticated") {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
