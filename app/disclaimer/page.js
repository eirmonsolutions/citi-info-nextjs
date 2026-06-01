import PageLayout from "@/components/partials/PageLayout";
import DisclaimerPage from "@/components/pages/resources/DisclaimerPage";

export const metadata = {
  title: "Disclaimer | Citiinfo",
  description:
    "Read the Citiinfo disclaimer regarding business listings, external links, and use of our directory.",
};

export default function Page() {
  return (
    <PageLayout>
      <DisclaimerPage />
    </PageLayout>
  );
}
