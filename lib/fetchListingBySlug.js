const getApiBase = () =>
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

const normalizeSlug = (value) =>
  decodeURIComponent(String(value || ""))
    .trim()
    .toLowerCase();

export const matchesListingSlug = (item, slugValue) => {
  if (!item?.slug || !slugValue) return false;
  return normalizeSlug(item.slug) === normalizeSlug(slugValue);
};

const getLastPage = (payload) =>
  payload?.pagination?.last_page ??
  payload?.meta?.last_page ??
  1;

export async function fetchListingBySlug(slug) {
  const apiBase = getApiBase();
  const normalized = normalizeSlug(slug);

  if (!normalized) {
    return null;
  }

  let page = 1;
  let lastPage = 1;

  do {
    const res = await fetch(
      `${apiBase}/listings?page=${page}&per_page=50`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error("Unable to load listing.");
    }

    const data = await res.json();
    const listings = Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data)
        ? data
        : [];

    const match = listings.find((item) => matchesListingSlug(item, slug));

    if (match) {
      return match;
    }

    lastPage = getLastPage(data);
    page += 1;
  } while (page <= lastPage);

  return null;
}
