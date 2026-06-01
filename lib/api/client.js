export const getApiBase = () =>
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.VITE_API_URL ||
  "http://127.0.0.1:8000/api";

export const getBackendBase = () =>
  getApiBase().replace(/\/api\/?$/, "");

export const getAuthToken = () => {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("token") || "";
};

export const getAuthUser = () => {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const setAuthSession = ({ token, user }) => {
  if (typeof window === "undefined") return;

  if (token) {
    localStorage.setItem("token", token);
  }

  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  }
};

export const clearAuthSession = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getAuthHeaders = (extra = {}) => {
  const headers = {
    Accept: "application/json",
    ...extra,
  };

  const token = getAuthToken();

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

export async function apiFetch(path, options = {}) {
  const url = path.startsWith("http") ? path : `${getApiBase()}${path}`;
  const { headers: optionHeaders, body, ...rest } = options;

  const isFormData =
    typeof FormData !== "undefined" && body instanceof FormData;

  const headers = getAuthHeaders(
    isFormData
      ? { ...optionHeaders }
      : {
          "Content-Type": "application/json",
          ...optionHeaders,
        }
  );

  if (isFormData) {
    delete headers["Content-Type"];
  }

  const res = await fetch(url, {
    ...rest,
    headers,
    body,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const error = new Error(
      data.message || data.error || "Something went wrong."
    );
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
}
