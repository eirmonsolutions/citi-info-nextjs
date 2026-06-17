const STORAGE_URL = (
  process.env.NEXT_PUBLIC_STORAGE_URL || "https://api.citiinfo.com.au/storage"
).replace(/\/$/, "");

const FRONTEND_HOSTS = new Set(["citiinfo.com.au", "www.citiinfo.com.au"]);

function rewriteWrongStorageHost(url) {
  try {
    const parsed = new URL(url);

    if (!parsed.pathname.startsWith("/storage/")) {
      return url;
    }

    if (FRONTEND_HOSTS.has(parsed.hostname)) {
      return `${STORAGE_URL}${parsed.pathname.replace(/^\/storage/, "")}`;
    }
  } catch {
    // ignore invalid URLs
  }

  return url;
}

/** Build absolute storage URL on api.citiinfo.com.au */
export function getStorageUrl(path) {
  if (!path) return "";

  const clean = String(path).replace(/^\/+/, "");

  if (clean.startsWith("http://") || clean.startsWith("https://")) {
    return rewriteWrongStorageHost(clean);
  }

  const relative = clean.startsWith("storage/") ? clean.slice("storage/".length) : clean;

  return `${STORAGE_URL}/${relative}`;
}
