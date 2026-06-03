import Link from "next/link";
import PageLayout from "@/components/partials/PageLayout";

export default function BlogNotFound() {
  return (
    <PageLayout>
      <main className="blog-page">
        <section className="blog-detail-section">
          <div className="blog-detail-wrap text-center" style={{ padding: "48px 0" }}>
            <h1>Article not found</h1>
            <p className="mt-3">
              This blog post may have been removed or is unpublished.
            </p>
            <Link href="/blog" className="btn-add d-inline-flex mt-4">
              ← Back to Blogs
            </Link>
          </div>
        </section>
      </main>
    </PageLayout>
  );
}
