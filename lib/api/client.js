import {
  apiFetch,
  clearToken,
  getApiBase,
  getBackendBase,
  getToken,
  parseAuthUser,
  setToken,
  TOKEN_KEY,
} from "../api";

export { apiFetch, TOKEN_KEY, getApiBase, getBackendBase, parseAuthUser };

export const getAuthToken = () => getToken() || "";

export const getAuthUser = () => null;

export const setAuthSession = ({ token }) => {
  if (token) {
    setToken(token);
  }
};

export const clearAuthSession = () => {
  clearToken();
};

export const getAuthHeaders = (extra = {}) => {
  const headers = {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
    ...extra,
  };

  const token = getToken();

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};
