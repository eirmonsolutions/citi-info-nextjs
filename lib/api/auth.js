import { apiFetch, fetchSessionProfile, setToken } from "../api";
import { getBackendBase } from "./client";

export async function fetchProfile() {
  return fetchSessionProfile();
}

export async function loginWithSanctum({ email, password }) {
  const data = await apiFetch("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (data.token) {
    setToken(data.token);
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

export async function toggleWishlistItem(businessId) {
  return apiFetch("/wishlist/toggle", {
    method: "POST",
    body: JSON.stringify({ business_id: businessId }),
  });
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
