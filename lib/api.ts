const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const TOKEN_KEY = "citiinfo_token";

export function getApiBase(): string {
  return API_URL || "http://localhost:8000/api";
}

export function getBackendBase(): string {
  return getApiBase().replace(/\/api\/?$/, "");
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
}

function getCsrfToken(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)XSRF-TOKEN=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

let sessionCsrfToken: string | null = null;

export async function resolveCsrfToken(): Promise<string | null> {
  if (getToken()) return null;

  const cookieToken = getCsrfToken();
  if (cookieToken) {
    sessionCsrfToken = cookieToken;
    return cookieToken;
  }

  if (sessionCsrfToken) return sessionCsrfToken;

  await ensureCsrfCookie();

  const cookieAfter = getCsrfToken();
  if (cookieAfter) {
    sessionCsrfToken = cookieAfter;
    return cookieAfter;
  }

  try {
    const res = await fetch(`${getApiBase()}/auth/csrf-token`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok && data.token) {
      sessionCsrfToken = data.token;
      return data.token;
    }
  } catch {
    // ignore
  }

  return null;
}

export async function ensureCsrfCookie() {
  await fetch(`${getBackendBase()}/sanctum/csrf-cookie`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  });
}

export function parseAuthUser(data: Record<string, unknown> | null | undefined) {
  if (!data || data.authenticated === false || !data.user) {
    return null;
  }

  return data.user as Record<string, unknown>;
}

export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = getToken();
  const method = (options.method || "GET").toUpperCase();
  const isMutating = ["POST", "PUT", "PATCH", "DELETE"].includes(method);

  if (isMutating && !token) {
    await resolveCsrfToken();
  }

  const csrfToken = !token ? sessionCsrfToken || getCsrfToken() : null;

  const headers: HeadersInit = {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(csrfToken ? { "X-XSRF-TOKEN": csrfToken } : {}),
    ...options.headers,
  };

  const hasBody = options.body !== undefined && options.body !== null;
  const isFormData =
    typeof FormData !== "undefined" && options.body instanceof FormData;

  if (hasBody && !isFormData && !(headers as Record<string, string>)["Content-Type"]) {
    (headers as Record<string, string>)["Content-Type"] = "application/json";
  }

  const res = await fetch(`${getApiBase()}${path}`, {
    ...options,
    credentials: "include",
    headers,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) throw { status: res.status, ...data };

  return data;
}
