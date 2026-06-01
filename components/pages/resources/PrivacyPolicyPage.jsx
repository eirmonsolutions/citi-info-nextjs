import React from "react";
import "../../../public/assets/css/ResourcePages.css";
import ResourceHero from "./ResourceHero";
import SectionList from "./SectionList";
import { ShieldCheck } from "lucide-react";

const sections = [
  {
    title: "Information We Collect",
    content: (
      <p>
        When you use Citiinfo, we may collect information you provide directly—such
        as your name, email address, phone number, and business details when you
        create a listing or contact a business. We also collect technical data
        like browser type, device information, and pages visited to improve our
        Australia business directory.
      </p>
    ),
  },
  {
    title: "How We Use Information",
    content: (
      <p>
        We use your information to operate and improve Citiinfo, display business
        listings, process enquiries, send service-related communications, and
        help users find local businesses and services across Australia. We do not
        sell your personal information to third parties.
      </p>
    ),
  },
  {
    title: "Cookies Policy",
    content: (
      <p>
        Citiinfo uses cookies and similar technologies to remember your
        preferences, keep you signed in, analyse site traffic, and improve search
        and listing performance. You can manage cookies through your browser
        settings, though some features may not work correctly if cookies are
        disabled.
      </p>
    ),
  },
  {
    title: "Data Security",
    content: (
      <p>
        We implement reasonable technical and organisational measures to protect
        your data against unauthorised access, alteration, or disclosure. No
        method of transmission over the internet is completely secure, and we
        encourage users to use strong passwords and protect their account
        credentials.
      </p>
    ),
  },
  {
    title: "Third-Party Services",
    content: (
      <p>
        Our website may link to external business websites, payment providers,
        maps, or analytics tools. Citiinfo is not responsible for the privacy
        practices of third-party sites. We recommend reviewing their policies
        before sharing personal information.
      </p>
    ),
  },
  {
    title: "User Rights",
    content: (
      <p>
        Depending on applicable law, you may request access to, correction of, or
        deletion of your personal data. You may also opt out of marketing
        communications at any time. To exercise your rights, contact us using the
        details on our Contact Us page.
      </p>
    ),
  },
  {
    title: "Contact Information",
    content: (
      <p>
        For privacy-related questions, please visit our{" "}
        <a href="/contact-us">Contact Us</a> page or email{" "}
        <a href="mailto:privacy@citiinfo.com.au">privacy@citiinfo.com.au</a>.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="resource-page">
      <ResourceHero
        variant="privacy-hero"
        title="Privacy Policy"
        description="Learn how Citiinfo collects, uses, and protects your information when you browse our Australia business directory or list your business."
        meta="Last updated: June 2026"
        icon={
          <span className="shield">
            <ShieldCheck size={56} strokeWidth={1.5} />
          </span>
        }
      />
      <SectionList
        sections={sections}
        notice={{
          type: "info",
          text: "By using our website, you agree to the terms of this Privacy Policy.",
        }}
      />
    </main>
  );
}
