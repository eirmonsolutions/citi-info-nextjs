import PageLayout from "@/components/partials/PageLayout";
import BlogListPage from "@/components/pages/blog/BlogListPage";

export const metadata = {
  title: "Our Blog | Citiinfo Australia Business Directory",
  description:
    "Read articles and guides on Citiinfo about local business listings, growing your business, and finding services across Australia.",
};

export default function Page() {
  return (
    <PageLayout>
      <BlogListPage />
    </PageLayout>
  );
}
