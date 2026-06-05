import PageLayout from "@/components/partials/PageLayout";
import HowItWorksPage from "@/components/pages/resources/HowItWorksPage";

export const metadata = {
  title: "How Citiinfo Works | Find Local Businesses & List Your Business",
  description:
    "Learn how Citiinfo helps Australians find trusted local businesses and how business owners can create a free listing, increase visibility, attract customers.",
};

export default function Page() {
  return (
    <PageLayout>
      <HowItWorksPage />
    </PageLayout>
  );
}
