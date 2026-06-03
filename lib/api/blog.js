import { apiFetch, getApiBase } from "./client";

export const RECENT_BLOGS_LIMIT = 5;

export async function fetchPublishedBlogs({ page = 1, perPage = 12 } = {}) {
  const params = new URLSearchParams({
    page: String(page),
    per_page: String(perPage),
  });

  return apiFetch(`/blogs?${params}`, { cache: "no-store" });
}

export async function fetchPublishedBlogBySlug(slug) {
  const encoded = encodeURIComponent(slug);
  const res = await fetch(`${getApiBase()}/blogs/${encoded}`, {
    cache: "no-store",
    headers: { Accept: "application/json" },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok || data.ok === false) {
    const error = new Error(data.message || "Blog not found.");
    error.status = 404;
    error.data = data;
    throw error;
  }

  return data;
}

/** Server-side fetch for generateMetadata (returns null if not found). */
export async function fetchPublishedBlogBySlugServer(slug) {
  try {
    const res = await fetch(
      `${getApiBase()}/blogs/${encodeURIComponent(slug)}`,
      { next: { revalidate: 60 } }
    );
    const data = await res.json().catch(() => ({}));

    if (!res.ok || data.ok === false) {
      return null;
    }

    return data.data || null;
  } catch {
    return null;
  }
}

/** Latest published blogs for sidebar (excludes current slug, max 5). */
export async function fetchRecentPublishedBlogs(excludeSlug = "") {
  const res = await fetch(
    `${getApiBase()}/blogs?page=1&per_page=20`,
    {
      cache: "no-store",
      headers: { Accept: "application/json" },
    }
  );

  const data = await res.json().catch(() => ({}));

  if (!res.ok || data.ok === false) {
    return [];
  }

  return (data.data || [])
    .filter((post) => post.slug && post.slug !== excludeSlug)
    .slice(0, RECENT_BLOGS_LIMIT);
}

export function getBlogFaqItems(blog) {
  const items = Array.isArray(blog?.faq_items) ? blog.faq_items : [];
  return items.filter(
    (item) => String(item?.question ?? "").trim() && String(item?.answer ?? "").trim()
  );
}

export async function fetchManageBlogs({ page = 1, perPage = 12 } = {}) {
  const params = new URLSearchParams({
    page: String(page),
    per_page: String(perPage),
  });

  return apiFetch(`/manage/blogs?${params}`, { cache: "no-store" });
}

export async function fetchManageBlog(id) {
  return apiFetch(`/manage/blogs/${id}`, { cache: "no-store" });
}

export async function createBlog(payload) {
  const body =
    payload instanceof FormData ? payload : JSON.stringify(payload);

  return apiFetch("/manage/blogs", {
    method: "POST",
    body,
  });
}

export async function updateBlog(id, payload) {
  return apiFetch(`/manage/blogs/${id}`, {
    method: "PUT",
    body: payload instanceof FormData ? payload : JSON.stringify(payload),
  });
}

export async function deleteBlog(id) {
  return apiFetch(`/manage/blogs/${id}`, {
    method: "DELETE",
  });
}

export function getBlogExcerpt(blog, maxLength = 160) {
  const raw = blog?.description || blog?.content || "";

  const text = String(raw)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}…`;
}

export function formatBlogDate(value) {
  if (!value) return "";

  return new Date(value).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getBlogImageUrl(blog) {
  return (
    blog?.image_url ||
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
  );
}
