"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import "../../../public/assets/css/BlogPages.css";
import {
  fetchPublishedBlogBySlug,
  fetchPublishedBlogs,
  formatBlogDate,
  getBlogImageUrl,
} from "@/lib/api/blog";
import BlogSidebar from "./BlogSidebar";

export default function BlogDetailPage({ slug }) {
  const [blog, setBlog] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadBlog = async () => {
      if (!slug) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");
      setNotFound(false);

      try {
        const [detailRes, recentRes] = await Promise.all([
          fetchPublishedBlogBySlug(slug),
          fetchPublishedBlogs({ page: 1, perPage: 5 }),
        ]);

        if (cancelled) return;

        setBlog(detailRes.data || null);
        setRecentPosts(
          (recentRes.data || []).filter((post) => post.slug !== slug)
        );
      } catch (err) {
        if (cancelled) return;

        if (err.status === 404) {
          setNotFound(true);
        } else {
          setError(
            err.message ||
              "Could not load this article. Please check the API server."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadBlog();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <main className="blog-page">
        <section className="blog-hero">
          <div className="container">
            <div className="skeleton" style={{ height: 40, width: 320 }} />
          </div>
        </section>
        <section className="blog-detail-section">
          <div className="blog-detail-wrap">
            <div className="skeleton blog-skeleton-img" style={{ marginBottom: 24 }} />
            <div className="skeleton" style={{ height: 16, width: 140, marginBottom: 16 }} />
            <div className="skeleton" style={{ height: 14, width: "100%", marginBottom: 10 }} />
            <div className="skeleton" style={{ height: 14, width: "92%", marginBottom: 10 }} />
            <div className="skeleton" style={{ height: 14, width: "85%" }} />
          </div>
        </section>
      </main>
    );
  }

  if (notFound) {
    return (
      <main className="blog-page">
        <section className="blog-detail-section">
          <div className="blog-detail-wrap text-center">
            <h1>Article not found</h1>
            <p className="mt-3">This blog post may have been removed or unpublished.</p>
            <Link href="/blog" className="btn-add d-inline-flex mt-4">
              Back to Blog
            </Link>
          </div>
        </section>
      </main>
    );
  }

  if (error || !blog) {
    return (
      <main className="blog-page">
        <section className="blog-detail-section">
          <div className="blog-detail-wrap text-center">
            <h1>Unable to load article</h1>
            <p className="mt-3">{error}</p>
            <button
              type="button"
              className="btn-add mt-4"
              onClick={() => window.location.reload()}
            >
              Reload
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="blog-page">
      <section className="blog-hero">
        <div className="container">
          <h1>{blog.title}</h1>
          <p className="post-date" style={{ color: "rgba(255,255,255,0.9)" }}>
            {formatBlogDate(blog.created_at)}
            {blog.author?.name ? ` · By ${blog.author.name}` : ""}
          </p>
        </div>
      </section>

      <section className="blog-section blog-detail-section">
        <div className="blog-layout">
          <div className="blog-detail-wrap" style={{ width: "100%", margin: 0 }}>
            {blog.image_url && (
              <div className="blog-detail-img">
                <img src={getBlogImageUrl(blog)} alt={blog.title} />
              </div>
            )}

            {blog.description && (
              <p className="lead">{blog.description}</p>
            )}

            {blog.content && (
              <div
                className="blog-inner-content"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            )}

            <div className="mt-4">
              <Link href="/blog" className="listing-btn blog-read-more">
                ← Back to Blogs
              </Link>
            </div>
          </div>

          <BlogSidebar recentPosts={recentPosts} />
        </div>
      </section>
    </main>
  );
}
