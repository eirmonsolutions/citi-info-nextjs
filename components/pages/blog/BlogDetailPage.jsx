"use client";

import { Inter, Playpen_Sans } from "next/font/google";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import "../../../public/assets/css/BlogPages.css";
import {
  fetchPublishedBlogBySlug,
  fetchRecentPublishedBlogs,
  formatBlogDate,
  getBlogFaqItems,
  getBlogImageUrl,
} from "@/lib/api/blog";
import BlogFaqAccordion from "./BlogFaqAccordion";
import BlogSidebar from "./BlogSidebar";

const FAQ_SCHEMA_SCRIPT_ID = "blog-faq-schema";

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
        const [detailRes, recent] = await Promise.all([
          fetchPublishedBlogBySlug(slug),
          fetchRecentPublishedBlogs(slug).catch(() => []),
        ]);

        if (cancelled) return;

        setBlog(detailRes.data || null);
        setRecentPosts(recent);
      } catch (err) {
        if (cancelled) return;

        if (err.status === 404 || err.data?.ok === false) {
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

  useEffect(() => {
    if (!blog) return;

    if (blog.meta_title) {
      document.title = blog.meta_title;
    }

    let metaDesc = document.querySelector('meta[name="description"]');

    if (blog.meta_description) {
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.setAttribute("name", "description");
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute("content", blog.meta_description);
    }
  }, [blog]);

  useEffect(() => {
    const existing = document.getElementById(FAQ_SCHEMA_SCRIPT_ID);
    existing?.remove();

    if (!blog?.faq_schema) return;

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = FAQ_SCHEMA_SCRIPT_ID;
    script.text = JSON.stringify(blog.faq_schema);
    document.head.appendChild(script);

    return () => {
      document.getElementById(FAQ_SCHEMA_SCRIPT_ID)?.remove();
    };
  }, [blog]);

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
            <div
              className="skeleton blog-skeleton-img"
              style={{ marginBottom: 24 }}
            />
            <div
              className="skeleton"
              style={{ height: 16, width: 140, marginBottom: 16 }}
            />
            <div
              className="skeleton"
              style={{ height: 14, width: "100%", marginBottom: 10 }}
            />
            <div
              className="skeleton"
              style={{ height: 14, width: "92%", marginBottom: 10 }}
            />
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
            <p className="mt-3">
              This blog post may have been removed or unpublished.
            </p>
            <Link href="/blog" className="btn-add d-inline-flex mt-4">
              ← Back to Blogs
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

  const faqItems = getBlogFaqItems(blog);
  const accordionId = `blog-faq-${blog.slug || slug}`;

  return (
    <main className="blog-page">
      <section className="blog-hero">
        <div className="container">
          <h1>{blog.title}</h1>
        </div>
      </section>

      <section className="blog-section blog-detail-section">
        <div className="blog-layout blog-detail-layout">
          <div className="blog-detail-main">
            <div className="post-meta mb-3">
              <span className="item-meta post-date">
                {formatBlogDate(blog.blog_date)}
              </span>
            </div>

            


            {blog.image_url && (
              <div className="blog-detail-img mb-4">
                <img
                  src={blog.image_url || getBlogImageUrl(blog)}
                  alt={blog.title}
                  className="w-100"
                />
              </div>
            )}



            

            {blog.content && (
              <div
                className="blog-inner-content"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            )}

            {faqItems.length > 0 && (
              <BlogFaqAccordion
                faqItems={faqItems}
                accordionId={accordionId}
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
