import { apiFetch, getBackendBase, setAuthSession } from "./client";

export async function loginWithSanctum({ email, password, remember = false }) {
  const data = await apiFetch("/login", {
    method: "POST",
    body: JSON.stringify({ email, password, remember }),
  });

  if (data.token) {
    setAuthSession({ token: data.token, user: data.user });
  }

  return data;
}

export async function registerUser(payload) {
  return apiFetch("/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function logoutUser() {
  try {
    await apiFetch("/logout", { method: "POST" });
  } catch {
    // ignore network errors on logout
  }
}

export function resolveLoginRedirect(redirectTo, user) {
  if (redirectTo?.startsWith("http")) {
    return redirectTo;
  }

  if (redirectTo?.startsWith("/")) {
    const role = user?.role;

    if (
      role === "blog_user" ||
      role === "superadmin" ||
      role === "admin"
    ) {
      return `${getBackendBase()}${redirectTo}`;
    }

    return redirectTo;
  }

  return "/";
}
