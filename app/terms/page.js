import PageLayout from "@/components/partials/PageLayout";
import TermsPage from "@/components/pages/resources/TermsPage";

export const metadata = {
  title: "Terms & Conditions | Citiinfo",
  description:
    "Read the terms and conditions for using Citiinfo, Australia's business directory for local listings and services.",
};

export default function Page() {
  return (
    <PageLayout>
      <TermsPage />
    </PageLayout>
  );
}
