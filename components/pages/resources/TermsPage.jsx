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
        By accessing or using Citiinfo, you agree to these Terms &amp; Conditions.
        If you do not agree, please do not use our website or submit a business
        listing.
      </p>
    ),
  },
  {
    title: "Use of the Directory",
    content: (
      <p>
        Citiinfo provides a platform to discover and list local businesses in
        Australia. You agree to use the site lawfully and not to post false,
        misleading, offensive, or infringing content. We may remove listings that
        violate our guidelines.
      </p>
    ),
  },
  {
    title: "Business Listings",
    content: (
      <p>
        When you submit a listing, you confirm that you have authority to
        represent the business and that the information provided is accurate. Free
        and paid listings may be subject to review before publication. We reserve
        the right to edit, reject, or remove listings at our discretion.
      </p>
    ),
  },
  {
    title: "User Accounts",
    content: (
      <p>
        You are responsible for maintaining the confidentiality of your account
        credentials and for all activity under your account. Notify us promptly if
        you suspect unauthorised access.
      </p>
    ),
  },
  {
    title: "Reviews & User Content",
    content: (
      <p>
        Reviews and comments must be honest and based on genuine experience. We
        may moderate or remove content that appears fake, defamatory, or spam.
        By submitting content, you grant Citiinfo a licence to display it on the
        platform.
      </p>
    ),
  },
  {
    title: "Intellectual Property",
    content: (
      <p>
        The Citiinfo name, logo, website design, and original content are owned by
        Citiinfo or its licensors. You may not copy, scrape, or redistribute site
        content without written permission.
      </p>
    ),
  },
  {
    title: "Limitation of Liability",
    content: (
      <p>
        Citiinfo is provided &quot;as is.&quot; We are not liable for indirect or
        consequential damages arising from your use of the directory, listings, or
        third-party services linked from our site.
      </p>
    ),
  },
  {
    title: "Changes & Contact",
    content: (
      <p>
        We may update these terms from time to time. Continued use of the site
        constitutes acceptance of the updated terms. Questions? Visit{" "}
        <a href="/contact-us">Contact Us</a>.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <main className="resource-page">
      <ResourceHero
        title="Terms & Conditions"
        description="The rules and guidelines for using Citiinfo, Australia's trusted business directory for local listings and services."
        meta="Last updated: June 2026"
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
