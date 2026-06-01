import PageLayout from "@/components/partials/PageLayout";
import BlogDetailPage from "@/components/pages/blog/BlogDetailPage";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  return {
    title: `${slug.replace(/-/g, " ")} | Citiinfo Blog`,
    description: "Read the latest articles on Citiinfo Australia business directory.",
  };
}

export default async function Page({ params }) {
  const { slug } = await params;

  return (
    <PageLayout>
      <BlogDetailPage slug={slug} />
    </PageLayout>
  );
}
