import PageLayout from "@/components/partials/PageLayout";
import ContactPage from "@/components/pages/resources/ContactPage";

export const metadata = {
  title: "Contact Us | Citiinfo Australia Business Directory",
  description:
    "Get in touch with Citiinfo for inquiries, business listing support, or feedback. We're here to help! Reach out to our team for assistance.",
};

export default function Page() {
  return (
    <PageLayout>
      <ContactPage />
    </PageLayout>
  );
}
