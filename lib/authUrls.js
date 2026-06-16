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

export function getMessagesUrl(user) {
  if (user?.messages_url) return user.messages_url;
  return `${getBackendBase()}/user/messages`;
}
