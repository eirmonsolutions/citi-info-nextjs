import PageLayout from "@/components/partials/PageLayout";
import FaqsPage from "@/components/pages/resources/FaqsPage";

export const metadata = {
  title: "FAQs | Citiinfo Australia Business Directory",
  description:
    "Frequently asked questions about using Citiinfo, adding a business listing, accounts, and privacy.",
};

export default function Page() {
  return (
    <PageLayout>
      <FaqsPage />
    </PageLayout>
  );
}
