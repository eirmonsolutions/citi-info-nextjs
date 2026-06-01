"use client";

import React, { useEffect, useMemo, useState } from "react";
import "../../../public/assets/css/BlogPages.css";
import { fetchPublishedBlogs } from "@/lib/api/blog";
import BlogCard from "./BlogCard";
import BlogListSkeleton from "./BlogListSkeleton";
import BlogSidebar from "./BlogSidebar";

export default function BlogListPage() {
  const [blogs, setBlogs] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [meta, setMeta] = useState({});
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBlogs = async () => {
      setLoading(true);
      setError("");

      try {
        const [listRes, recentRes] = await Promise.all([
          fetchPublishedBlogs({ page, perPage: 12 }),
          fetchPublishedBlogs({ page: 1, perPage: 5 }),
        ]);

        setBlogs(listRes.data || []);
        setMeta(listRes.meta || {});
        setRecentPosts(recentRes.data || []);
      } catch (err) {
        setBlogs([]);
        setMeta({});
        setError(
          err.message ||
            "Could not load blog posts. Please check the API server."
        );
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, [page]);

  const filteredBlogs = useMemo(() => {
    if (!query.trim()) return blogs;

    const term = query.trim().toLowerCase();

    return blogs.filter(
      (blog) =>
        blog.title?.toLowerCase().includes(term) ||
        blog.description?.toLowerCase().includes(term)
    );
  }, [blogs, query]);

  const lastPage = meta.last_page || 1;

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(search);
  };

  return (
    <main className="blog-page">
      <section className="blog-hero">
        <div className="container">
          <h1>Our Blog</h1>
          <form className="blog-hero-search" onSubmit={handleSearch}>
            <input
              type="search"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </section>

      <section className="blog-section">
        <div className="blog-layout">
          <div>
            <div className="blog-grid">
              {loading ? (
                <BlogListSkeleton count={4} />
              ) : error ? (
                <div className="blog-empty">
                  <p>{error}</p>
                </div>
              ) : filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))
              ) : (
                <div className="blog-empty">
                  <p>
                    {query
                      ? "No articles match your search."
                      : "No published blog posts yet."}
                  </p>
                </div>
              )}
            </div>

            {!loading && !error && !query && lastPage > 1 && (
              <div className="blog-pagination">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </button>

                {Array.from({ length: lastPage }).map((_, index) => {
                  const pageNumber = index + 1;

                  return (
                    <button
                      key={pageNumber}
                      type="button"
                      className={page === pageNumber ? "active" : ""}
                      onClick={() => setPage(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                <button
                  type="button"
                  disabled={page >= lastPage}
                  onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
                >
                  Next
                </button>
              </div>
            )}
          </div>

          <BlogSidebar recentPosts={recentPosts} />
        </div>
      </section>
    </main>
  );
}
