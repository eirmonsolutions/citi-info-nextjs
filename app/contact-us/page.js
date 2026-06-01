import PageLayout from "@/components/partials/PageLayout";
import ContactPage from "@/components/pages/resources/ContactPage";

export const metadata = {
  title: "Contact Us | Citiinfo Australia Business Directory",
  description:
    "Contact the Citiinfo team for listing support, account help, or general enquiries about our Australia business directory.",
};

export default function Page() {
  return (
    <PageLayout>
      <ContactPage />
    </PageLayout>
  );
}
