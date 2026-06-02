import PageLayout from "@/components/partials/PageLayout";
import PrivacyPolicyPage from "@/components/pages/resources/PrivacyPolicyPage";

export const metadata = {
  title: "Privacy Policy | Citiinfo Australia Business Directory",
  description:
    "Learn how Citiinfo collects, uses, and protects your personal data. We prioritize your privacy and comply with data protection regulations.",
};

export default function Page() {
  return (
    <PageLayout>
      <PrivacyPolicyPage />
    </PageLayout>
  );
}
