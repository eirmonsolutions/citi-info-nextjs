const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const TOKEN_KEY = "citiinfo_token";

const DEFAULT_API = "https://api.citiinfo.com.au/api";

function getDirectBackendApiBase(): string | null {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "");

  if (!backendUrl?.startsWith("http")) {
    return null;
  }

  return `${backendUrl}/api`;
}

export function getApiBase(): string {
  const configured = API_URL?.trim();

  if (configured?.startsWith("http")) {
    return configured.replace(/\/$/, "");
  }

  if (typeof window !== "undefined") {
    // citiinfo.com.au → api.citiinfo.com.au: browser must call API directly.
    // Next.js /api proxy does not pass Sanctum stateful session auth correctly.
    const backendApi = getDirectBackendApiBase();
    if (backendApi) {
      try {
        const frontendHost = window.location.hostname;
        const backendHost = new URL(backendApi).hostname;

        if (frontendHost !== backendHost) {
          return backendApi;
        }
      } catch {
        // fall through to same-origin path
      }
    }

    const path = configured?.startsWith("/") ? configured : "/api";
    return `${window.location.origin}${path}`.replace(/\/$/, "");
  }

  const proxyTarget = process.env.API_PROXY_TARGET?.replace(/\/$/, "");
  if (proxyTarget?.startsWith("http")) {
    return proxyTarget;
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (configured?.startsWith("/") && siteUrl?.startsWith("http")) {
    return `${siteUrl}${configured}`;
  }

  return DEFAULT_API;
}

export function getBackendBase(): string {
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    process.env.NEXT_PUBLIC_SITE_URL;

  if (backendUrl) {
    return backendUrl.replace(/\/$/, "");
  }

  return getApiBase().replace(/\/api\/?$/, "");
}

/** Sanctum CSRF — use Next.js proxy on local dev (CSP-safe). */
function getSanctumBase(): string {
  const configured = API_URL?.trim();

  if (typeof window !== "undefined" && configured?.startsWith("/")) {
    try {
      const frontendHost = window.location.hostname;
      const backendHost = new URL(getBackendBase()).hostname;

      if (frontendHost === backendHost || frontendHost === "localhost") {
        return window.location.origin;
      }
    } catch {
      // fall through
    }
  }

  return getBackendBase();
}

/** Web route — same session as api.citiinfo.com.au/login (not /api/*). */
export async function fetchSessionProfile() {
  const res = await fetch(`${getBackendBase()}/auth/session-profile`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) throw { status: res.status, ...data };

  return data;
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
  await fetch(`${getSanctumBase()}/sanctum/csrf-cookie`, {
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
