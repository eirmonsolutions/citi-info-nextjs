import React from "react";
import "../../../public/assets/css/ResourcePages.css";
import ResourceHero from "./ResourceHero";
import SectionList from "./SectionList";
import { FileText } from "lucide-react";

const sections = [
  {
    title: "Acceptance of Terms",
    content: (
      <p>
        By accessing and using Citiinfo, you accept and agree to be bound by these Terms and Conditions. If you do not agree, please do not use our platform.
      </p>
    ),
  },
  {
    title: "User Responsibilities",
    content: (
      <p>
        You agree to use Citiinfo only for lawful purposes and in a manner that does not infringe on the rights of others. You are responsible for maintaining the confidentiality of your account information.
      </p>
    ),
  },
  {
    title: "Services Provided",
    content: (
      <p>
        Citiinfo allows businesses to list their services on the platform for users to explore. We do not guarantee the accuracy, quality, or reliability of the services provided by listed businesses.
      </p>
    ),
  },
  {
    title: "User Content",
    content: (
      <p>
        Users can post reviews, comments, and other content. By posting content, you grant Citiinfo a non-exclusive, royalty-free license to use, modify, and display that content on our platform.
      </p>
    ),
  },
  {
    title: "Subscription & Payment",
    content: (
      <p>
        Certain services on Citiinfo may require a paid subscription. Payments must be made in accordance with the pricing structure provided. Failure to make payments may result in suspension of services.
      </p>
    ),
  },
  {
    title: "Termination",
    content: (
      <p>
        We reserve the right to suspend or terminate your account if you violate any terms. You can also close your account at any time by contacting our support.
      </p>
    ),
  },
  {
    title: "Limitation of Liability",
    content: (
      <p>
        Citiinfo is not responsible for any loss or damage arising from your use of the platform. We are not liable for any user-generated content or the actions of businesses listed on our site.
      </p>
    ),
  },
  {
    title: "Governing Law",
    content: (
      <p>
        These Terms and Conditions are governed by the laws of Australia. Any disputes will be resolved in the courts of Australia.
      </p>
    ),
  },
  {
    title: "Modifications to Terms",
    content: (
      <p>
        We may update these Terms from time to time. Any significant changes will be communicated via our platform, and the updated version will be posted here.
      </p>
    ),
  },
  {
    title: "Changes & Contact",
    content: (
      <p>
        For questions regarding these Terms, please contact us at:
        <a href="mailto:support@citiinfo.com.au"> Email: [support@citiinfo.com.au]</a>.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <main className="resource-page">
      <ResourceHero
        title="Terms & Conditions"
        description="Welcome to Citiinfo, an Australian business directory connecting users with local businesses. By accessing and using our platform, you agree to the following Terms and Conditions. Please read them carefully."
        icon={<FileText size={56} strokeWidth={1.5} />}
      />
      <SectionList
        sections={sections}
        notice={{
          type: "info",
          text: "By using Citiinfo, you agree to these Terms & Conditions and our Privacy Policy.",
        }}
      />
    </main>
  );
}
