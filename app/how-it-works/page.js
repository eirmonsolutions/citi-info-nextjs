import PageLayout from "@/components/partials/PageLayout";
import HowItWorksPage from "@/components/pages/resources/HowItWorksPage";

export const metadata = {
  title: "How It Works | Citiinfo",
  description:
    "Learn how to find local businesses on Citiinfo or add your free business listing to Australia's directory.",
};

export default function Page() {
  return (
    <PageLayout>
      <HowItWorksPage />
    </PageLayout>
  );
}
