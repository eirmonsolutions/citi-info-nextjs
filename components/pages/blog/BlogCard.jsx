import Link from "next/link";
import { Clock } from "lucide-react";
import {
  formatBlogDate,
  getBlogExcerpt,
  getBlogImageUrl,
} from "@/lib/api/blog";

export default function BlogCard({ blog }) {
  return (
    <article className="blog-box">
      <div className="blog-img">
        <Link href={`/blog/${blog.slug}`}>
          <img src={getBlogImageUrl(blog)} alt={blog.title} loading="lazy" />
        </Link>
      </div>

      <div className="blog-content">
        <div className="post-meta">
          <span className="item-meta post-date">
            <Clock size={16} />
            {formatBlogDate(blog.created_at)}
          </span>
        </div>

        <h3>
          <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
        </h3>

        <p>{getBlogExcerpt(blog)}</p>

        <div className="blog-btn">
          <Link className="listing-btn blog-read-more" href={`/blog/${blog.slug}`}>
            Read More →
          </Link>
        </div>
      </div>
    </article>
  );
}
