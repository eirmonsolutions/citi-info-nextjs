import PageLayout from "@/components/partials/PageLayout";
import TermsPage from "@/components/pages/resources/TermsPage";

export const metadata = {
  title: "Terms & Conditions | Citiinfo Australia Business Directory",
  description:
    "Review the Terms & Conditions of using the Citiinfo platform. Understand your rights and responsibilities when accessing and using our services in Australia.",
};

export default function Page() {
  return (
    <PageLayout>
      <TermsPage />
    </PageLayout>
  );
}
