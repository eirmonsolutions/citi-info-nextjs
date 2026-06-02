import React from "react";
import "../../../public/assets/css/ResourcePages.css";
import ResourceHero from "./ResourceHero";
import SectionList from "./SectionList";
import { ShieldCheck } from "lucide-react";

const sections = [
  {
    title: "Information We Collect",
    content: (
      <>
        <p>
          We collect personal information that you provide directly, such as:
        </p>
        <ul>
          <li>Name, Email Address, Phone Number</li>
          <li>Account information</li>
          <li>Payment details (if applicable)</li>
        </ul>
        <p>
          We may also collect technical data including IP addresses, browser type, and usage data to improve our website’s functionality and user experience.
        </p>
      </>
    ),
  },
  {
    title: "How We Use Your Information",
    content: (
      <>
        <p>Your personal information may be used for:</p>
        <ul>
          <li>Providing and improving our services</li>
          <li>Sending notifications and updates</li>
          <li>Processing payments</li>
          <li>Responding to inquiries and feedback</li>
        </ul>
      </>
    ),
  },
  {
    title: "Sharing Your Information",
    content: (
      <p>
        We do not sell or rent your personal information to third parties. We may share your data with trusted service providers who assist in running the platform (such as payment processors or hosting providers), or as required by law.
      </p>
    ),
  },
  {
    title: "Data Security",
    content: (
      <p>
        We use industry-standard security measures to protect your data from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
      </p>
    ),
  },
  {
    title: "Your Rights",
    content: (
      <>
        <p>You have the right to:</p>
        <ul>
          <li>Access, correct, or delete your personal information</li>
          <li>
            Opt-out of marketing communications at any time by contacting us
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "Cookies",
    content: (
      <p>
        We use cookies to improve your experience, remember your preferences, and analyze traffic. You can manage your cookie settings through your browser preferences.
      </p>
    ),
  },
  {
    title: "Third-Party Websites",
    content: (
      <p>
        Our website may contain links to third-party sites. We are not responsible for their privacy practices or content.
      </p>
    ),
  },
  {
    title: "Changes to This Policy",
    content: (
      <p>
        We may update this Privacy Policy from time to time to reflect changes
        in our services, legal requirements, or business practices. Any updates
        will be posted on this page along with the revised effective date.
      </p>
    ),
  },
  {
    title: "Contact Information",
    content: (
      <p>
        For questions regarding our Privacy Policy, please contact us at{" "}
        <a href="mailto:support@citiinfo.com.au">
          support@citiinfo.com.au
        </a>
        .
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
        description="At Citiinfo, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains what information we collect, how we use it, and the choices you have regarding your data."
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
