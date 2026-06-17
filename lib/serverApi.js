const DEFAULT_API = "https://api.citiinfo.com.au/api";
const DEFAULT_STORAGE = "https://api.citiinfo.com.au/storage";

/**
 * Absolute API base for Server Components / build-time fetch.
 * Relative NEXT_PUBLIC_API_URL (/api) does not work in Node fetch.
 */
export function getServerApiBase() {
  const configured = process.env.NEXT_PUBLIC_API_URL?.trim();

  if (configured?.startsWith("http")) {
    return configured.replace(/\/$/, "");
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

export function getServerStorageUrl() {
  const configured = process.env.NEXT_PUBLIC_STORAGE_URL?.trim();

  if (configured?.startsWith("http")) {
    return configured.replace(/\/$/, "");
  }

  return DEFAULT_STORAGE;
}
