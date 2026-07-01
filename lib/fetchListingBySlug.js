import { getApiBase } from "./api";

const normalizeSlug = (value) =>
  decodeURIComponent(String(value || ""))
    .trim()
    .toLowerCase();

export const matchesListingSlug = (item, slugValue) => {
  if (!item?.slug || !slugValue) return false;
  return normalizeSlug(item.slug) === normalizeSlug(slugValue);
};

export async function fetchListingBySlug(slug) {
  const normalized = normalizeSlug(slug);

  if (!normalized) {
    return null;
  }

  const encoded = encodeURIComponent(String(slug).trim());
  const res = await fetch(`${getApiBase()}/listings/${encoded}`, {
    cache: "no-store",
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Unable to load listing.");
  }

  const data = await res.json();
  return data?.data ?? null;
}
