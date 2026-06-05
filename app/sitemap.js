const SITE_URL = "https://citiinfo.com.au";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchAll(endpoint) {
  let page = 1;
  let all = [];

  while (true) {
    try {
      const separator = endpoint.includes("?") ? "&" : "?";

      const res = await fetch(
        `${API_URL}${endpoint}${separator}per_page=100&page=${page}`,
        {
          next: { revalidate: 3600 },
        }
      );

      if (!res.ok) break;

      const json = await res.json();

      const items = Array.isArray(json?.data?.data)
        ? json.data.data
        : Array.isArray(json?.data)
        ? json.data
        : Array.isArray(json)
        ? json
        : [];

      all = [...all, ...items];

      const currentPage = json?.data?.current_page;
      const lastPage = json?.data?.last_page;

      if (!lastPage || currentPage >= lastPage) break;

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

  const urls = [
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
        lastModified: item.updated_at || item.created_at || new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      })),

    ...blogs
      .filter((item) => item?.slug)
      .map((item) => ({
        url: `${SITE_URL}/blog/${item.slug}`,
        lastModified: item.updated_at || item.created_at || new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      })),

    ...categories
      .filter((item) => item?.slug)
      .map((item) => ({
        url: `${SITE_URL}/category/${item.slug}`,
        lastModified: item.updated_at || item.created_at || new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      })),
  ];

  return urls;
}