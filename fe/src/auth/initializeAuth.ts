import { useAuthStore } from "./store/auth-store";

async function initializeAuth() {
  const auth = useAuthStore.getState();

  try {
    const response = await fetch("/auth/refresh", {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      auth.clearAuth();
      return;
    }

    const { accessToken, user } = await response.json();
    auth.setAuth(accessToken, user);
  } catch {
    auth.clearAuth();
  } finally {
    auth.setInitialized(true);
  }
}
