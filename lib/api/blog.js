import { apiFetch } from "./client";

export async function fetchPublishedBlogs({ page = 1, perPage = 12 } = {}) {
  const params = new URLSearchParams({
    page: String(page),
    per_page: String(perPage),
  });

  return apiFetch(`/blogs?${params}`, { cache: "no-store" });
}

export async function fetchPublishedBlogBySlug(slug) {
  const encoded = encodeURIComponent(slug);
  return apiFetch(`/blogs/${encoded}`, { cache: "no-store" });
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
