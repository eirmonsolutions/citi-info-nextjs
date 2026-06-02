import PageLayout from "@/components/partials/PageLayout";
import FaqsPage from "@/components/pages/resources/FaqsPage";

export const metadata = {
  title: "Frequently Asked Questions | Citiinfo Australia Business Directory",
  description:
    "Find answers to common questions on Citiinfo, Australia’s top business directory. Learn how to list a business, leave reviews, and more.",
};

export default function Page() {
  return (
    <PageLayout>
      <FaqsPage />
    </PageLayout>
  );
}
