import { getBackendBase } from "./api";

export function getBackendLoginUrl() {
  return `${getBackendBase()}/login`;
}

export function getBackendRegisterUrl() {
  return `${getBackendBase()}/register`;
}

export function redirectToBackendLogin() {
  if (typeof window !== "undefined") {
    window.location.href = getBackendLoginUrl();
  }
}

export function redirectToBackendRegister() {
  if (typeof window !== "undefined") {
    window.location.href = getBackendRegisterUrl();
  }
}
