import React from "react";
import "../../../public/assets/css/ResourcePages.css";
import ResourceHero from "./ResourceHero";
import SectionList from "./SectionList";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
const sections = [
  {
    title: "Introduction",
    content: (
      <p>
        The information provided on Citiinfo is for general informational purposes only. We do our best to ensure the accuracy of all content, but we make no guarantees regarding the reliability or completeness of the information.
      </p>
    ),
  },
  {
    title: "No Professional Advice",
    content: (
      <p>
        Any content provided on Citiinfo should not be construed as professional advice. Always consult with a qualified professional for specific advice in areas such as legal, medical, or financial matters.
      </p>
    ),
  },
  {
    title: "Limitation of Liability",
    content: (
      <p>
        Citiinfo is not liable for any direct, indirect, incidental, or consequential damages arising from your use of the platform. We are not responsible for any errors or omissions in content provided by third-party users or businesses.
      </p>
    ),
  },
  {
    title: "External Links",
    content: (
      <p>
        Our website may contain links to third-party sites. Citiinfo is not responsible for the content, privacy policies, or practices of these external sites.
      </p>
    ),
  },
  {
    title: "Affiliate Links",
    content: (
      <p>
        Some links on Citiinfo may be affiliate links. If you make a purchase through these links, we may earn a commission at no additional cost to you.
      </p>
    ),
  },
  {
    title: "No Endorsement",
    content: (
      <p>
        The inclusion of businesses, individuals, or services on Citiinfo does not imply endorsement. We do not guarantee the quality or accuracy of services provided by listed businesses.
      </p>
    ),
  },
  {
    title: "Changes to Disclaimer",
    content: (
      <p>
        We may modify this Disclaimer from time to time. Any updates will be posted here with an updated date.
      </p>
    ),
  },
  {
    title: "Contact Information",
    content: (
      <p>
        For further inquiries or questions regarding this Disclaimer, please contact us at:
        <br />
        Email: <Link href="mailto:support@citiinfo.com.au">support@citiinfo.com.au</Link>
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
