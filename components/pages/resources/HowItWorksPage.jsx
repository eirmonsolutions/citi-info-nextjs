import React from "react";
import Link from "next/link";
import "../../../public/assets/css/ResourcePages.css";
import ResourceHero from "./ResourceHero";
import { Settings } from "lucide-react";

const userSteps = [
  {
    title: "Search Local Businesses",
    text: "Use our homepage search or browse categories to find restaurants, salons, plumbers, and other services near you across Australia.",
  },
  {
    title: "Compare Listings",
    text: "View business profiles with contact details, hours, services, photos, reviews, and location information in one place.",
  },
  {
    title: "Connect Directly",
    text: "Call, email, or visit the business website through links on their Citiinfo listing. Send an enquiry using the contact form on listing pages.",
  },
];

const businessSteps = [
  {
    title: "Create Your Free Listing",
    text: "Click Add Listing and complete our simple step-by-step wizard with your business details, hours, services, photos, and features.",
  },
  {
    title: "Get Reviewed & Published",
    text: "After submission, our team reviews your listing for quality and accuracy. Once approved, your business appears in search and category pages.",
  },
  {
    title: "Reach More Customers",
    text: "Update your profile anytime, collect reviews, and help local customers discover your business through Australia's business directory.",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="resource-page">
      <ResourceHero
        title="How It Works"
        description="Whether you are looking for a local business or want to promote your own, Citiinfo makes it simple."
        icon={<Settings size={56} strokeWidth={1.5} />}
      />

      <section className="resource-body">
        <div className="container" style={{ width: "min(1100px, 92%)" }}>
          <h2 style={{ marginBottom: 20, fontSize: 26 }}>For Visitors</h2>
          <div className="how-steps-grid" style={{ marginBottom: 48 }}>
            {userSteps.map((step, i) => (
              <article key={step.title} className="how-step-card">
                <div className="step-num">{i + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>

          <h2 style={{ marginBottom: 20, fontSize: 26 }}>For Business Owners</h2>
          <div className="how-steps-grid">
            {businessSteps.map((step, i) => (
              <article key={step.title} className="how-step-card">
                <div className="step-num">{i + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>

          <div
            className="resource-notice info"
            style={{ marginTop: 32, textAlign: "center" }}
          >
            Ready to list your business?{" "}
            <Link href="/add-listing" style={{ fontWeight: 700 }}>
              Add your free listing today
            </Link>
            .
          </div>
        </div>
      </section>
    </main>
  );
}
