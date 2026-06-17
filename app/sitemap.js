import { getServerApiBase } from "@/lib/serverApi";

const DEFAULT_SITE_URL = "https://citiinfo.com.au";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(
  /\/+$/,
  "",
);

const API_URL = getServerApiBase().replace(/\/+$/, "");

function makeApiUrl(endpoint, page = 1) {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = new URL(`${API_URL}${cleanEndpoint}`);

  url.searchParams.set("per_page", "100");
  url.searchParams.set("page", String(page));

  return url.toString();
}

function getItems(json) {
  if (Array.isArray(json?.data?.data)) return json.data.data;
  if (Array.isArray(json?.data)) return json.data;
  if (Array.isArray(json)) return json;

  return [];
}

function getPagination(json, page) {
  return {
    currentPage:
      json?.data?.current_page ||
      json?.meta?.current_page ||
      json?.current_page ||
      page,

    lastPage:
      json?.data?.last_page || json?.meta?.last_page || json?.last_page || page,
  };
}

async function fetchAll(endpoint) {
  let page = 1;
  let all = [];

  while (true) {
    try {
      const fetchUrl = makeApiUrl(endpoint, page);

      const res = await fetch(fetchUrl, {
        headers: {
          Accept: "application/json",
        },
        next: {
          revalidate: 3600,
        },
      });

      if (!res.ok) {
        console.error(
          `Sitemap fetch failed: ${fetchUrl} Status: ${res.status}`,
        );
        break;
      }

      const json = await res.json();
      const items = getItems(json);

      all.push(...items);

      const { currentPage, lastPage } = getPagination(json, page);

      if (!lastPage || currentPage >= lastPage) {
        break;
      }

      page++;
    } catch (error) {
      console.error(`Sitemap fetch error: ${endpoint}`, error);
      break;
    }
  }

  return all;
}

export default async function sitemap() {
  const staticPages = [
    "",
    "/about-us",
    "/blog",
    "/contact-us",
    "/how-it-works",
    "/business-listings",
    "/categories",
    "/terms-and-conditions",
    "/privacy-policy",
  ];

  const [listings, blogs, categories] = await Promise.all([
    fetchAll("/listings"),
    fetchAll("/blogs"),
    fetchAll("/categories"),
  ]);

  return [
    ...staticPages.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: path === "" ? 1 : 0.8,
    })),

    ...listings
      .filter((item) => item?.slug)
      .map((item) => ({
        url: `${SITE_URL}/business-listings/${item.slug}`,
        lastModified: item.updated_at
          ? new Date(item.updated_at)
          : item.created_at
            ? new Date(item.created_at)
            : new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      })),

    ...blogs
      .filter((item) => item?.slug)
      .map((item) => ({
        url: `${SITE_URL}/blog/${item.slug}`,
        lastModified: item.updated_at
          ? new Date(item.updated_at)
          : item.created_at
            ? new Date(item.created_at)
            : new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      })),

    ...categories
      .filter((item) => item?.slug)
      .map((item) => ({
        url: `${SITE_URL}/categories/${item.slug}`,
        lastModified: item.updated_at
          ? new Date(item.updated_at)
          : item.created_at
            ? new Date(item.created_at)
            : new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      })),
  ];
}
