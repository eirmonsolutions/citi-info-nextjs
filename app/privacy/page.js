import PageLayout from "@/components/partials/PageLayout";
import PrivacyPolicyPage from "@/components/pages/resources/PrivacyPolicyPage";

export const metadata = {
  title: "Privacy Policy | Citiinfo",
  description:
    "Learn how Citiinfo collects, uses, and protects your personal information on our Australia business directory.",
};

export default function Page() {
  return (
    <PageLayout>
      <PrivacyPolicyPage />
    </PageLayout>
  );
}
