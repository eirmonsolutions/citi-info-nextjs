import PageLayout from "@/components/partials/PageLayout";
import DisclaimerPage from "@/components/pages/resources/DisclaimerPage";

export const metadata = {
  title: "Disclaimer | Citiinfo Australia Business Directory",
  description:
    "Review the Disclaimer for using Citiinfo. Understand the limitations of liability, content accuracy, and third-party links on the platform.",
};

export default function Page() {
  return (
    <PageLayout>
      <DisclaimerPage />
    </PageLayout>
  );
}
