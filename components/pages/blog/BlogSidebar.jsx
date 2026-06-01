import Link from "next/link";
import { formatBlogDate, getBlogImageUrl } from "@/lib/api/blog";

export default function BlogSidebar({ recentPosts = [] }) {
  return (
    <aside className="blog-sidebar">
      <div className="blog-widget">
        <h4>Recent Posts</h4>
        <ul>
          {recentPosts.length > 0 ? (
            recentPosts.map((post) => (
              <li key={post.id}>
                <Link href={`/blog/${post.slug}`} className="recent-post">
                  <img
                    src={getBlogImageUrl(post)}
                    alt={post.title}
                    loading="lazy"
                  />
                  <div>
                    {post.title}
                    <span>{formatBlogDate(post.created_at)}</span>
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <li>No posts yet.</li>
          )}
        </ul>
      </div>

      <div className="blog-widget newsletter-widget">
        <h4>Subscribe Newsletter</h4>
        <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 12 }}>
          Get business tips and directory updates from Citiinfo.
        </p>
        <input type="email" placeholder="Your email address" />
        <button type="button">Subscribe</button>
      </div>
    </aside>
  );
}
