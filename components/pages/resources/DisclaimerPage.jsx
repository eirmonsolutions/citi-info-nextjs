import React from "react";
import "../../../public/assets/css/ResourcePages.css";
import ResourceHero from "./ResourceHero";
import SectionList from "./SectionList";
import { AlertTriangle } from "lucide-react";

const sections = [
  {
    title: "General Information",
    content: (
      <p>
        The content on Citiinfo is provided for general information purposes
        only. While we strive to maintain an accurate Australia business
        directory, we make no guarantees about the completeness or suitability of
        any listing, review, or page content.
      </p>
    ),
  },
  {
    title: "External Links Disclaimer",
    content: (
      <p>
        Citiinfo may contain links to third-party websites, including business
        websites and social profiles. We are not responsible for the content,
        availability, or practices of external sites. Visiting linked websites is
        at your own risk.
      </p>
    ),
  },
  {
    title: "Accuracy of Information",
    content: (
      <p>
        Business names, addresses, phone numbers, hours, services, and images are
        submitted by listing owners or gathered from public sources. Information
        may change without notice. Users should verify details directly with the
        business before making decisions.
      </p>
    ),
  },
  {
    title: "Limitation of Liability",
    content: (
      <p>
        To the fullest extent permitted by law, Citiinfo and its operators shall
        not be liable for any loss or damage arising from your use of the website,
        reliance on listings or reviews, or interactions with businesses found
        through our directory.
      </p>
    ),
  },
  {
    title: "Contact Us",
    content: (
      <p>
        If you have questions about this disclaimer, please visit our{" "}
        <a href="/contact-us">Contact Us</a> page.
      </p>
    ),
  },
];

export default function DisclaimerPage() {
  return (
    <main className="resource-page">
      <ResourceHero
        variant="disclaimer-hero"
        title="Disclaimer"
        description="Important information about how you should use Citiinfo and the limitations of our business directory content."
        meta="Last updated: June 2026"
        icon={
          <span className="warning">
            <AlertTriangle size={56} strokeWidth={1.5} />
          </span>
        }
      />
      <SectionList
        sections={sections}
        variant="disclaimer"
        notice={{
          type: "warning",
          text: "By using our website, you acknowledge that you have read and understood this disclaimer.",
        }}
      />
    </main>
  );
}
