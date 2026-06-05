import Link from "next/link";
import {
  RECENT_BLOGS_LIMIT,
  formatBlogDate,
  getBlogImageUrl,
} from "@/lib/api/blog";

export default function BlogSidebar({ recentPosts = [] }) {
  const posts = recentPosts.slice(0, RECENT_BLOGS_LIMIT);

  return (
    <aside className="blog-sidebar">
      <div className="blog-widget">
        <h4>Recent Posts</h4>

        <ul>
          {posts.length > 0 ? (
            posts.map((post) => (
              <li key={post.id}>
                <Link href={`/blog/${post.slug}`} className="recent-post">
                  <img
                    src={getBlogImageUrl(post)}
                    alt={post.title}
                    loading="lazy"
                  />

                  <div>
                    {post.title}
                    <span>{formatBlogDate(post.blog_date)}</span>
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <li>No posts yet.</li>
          )}
        </ul>
      </div>
    </aside>
  );
}