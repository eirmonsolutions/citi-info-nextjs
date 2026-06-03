import { notFound } from "next/navigation";
import PageLayout from "@/components/partials/PageLayout";
import BlogDetailPage from "@/components/pages/blog/BlogDetailPage";
import { fetchPublishedBlogBySlugServer } from "@/lib/api/blog";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await fetchPublishedBlogBySlugServer(slug);

  if (!blog) {
    return {
      title: "Article not found | Citiinfo Blog",
      description: "The requested blog article could not be found.",
    };
  }

  return {
    title: blog.meta_title || blog.title,
    description: blog.meta_description || blog.description || undefined,
    keywords: blog.meta_keywords || undefined,
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const blog = await fetchPublishedBlogBySlugServer(slug);

  if (!blog) {
    notFound();
  }

  return (
    <PageLayout>
      <BlogDetailPage slug={slug} />
    </PageLayout>
  );
}
