import React from "react";
import Link from "next/link";
import "../../../public/assets/css/ResourcePages.css";
import ResourceHero from "./ResourceHero";
import { Settings } from "lucide-react";

const userSteps = [
  {
    title: "Discover Local Businesses",
    text: "Search by business name, service, category, or location to find trusted businesses across Australia. Whether you're looking for a restaurant, tradie, healthcare provider, beauty salon, or professional service, Citiinfo helps you find the right option quickly.",
  },
  {
    title: "Compare Businesses",
    text: "Explore detailed business profiles featuring contact information, services, operating hours, photos, websites, reviews, and business descriptions. Compare multiple businesses and make informed decisions with confidence.",
  },
  {
    title: "Connect With Confidence",
    text: "Contact businesses directly via phone, email, website, social media, or enquiry forms. Get quotes, ask questions, and connect with local providers all from one convenient platform.",
  },
];

const businessSteps = [
  {
    title: "Create Your Free Business Listing",
    text: "Add your business to Citiinfo in just a few steps. Include your company details, contact information, business hours, services, photos, social links, and more to create a professional online presence.",
  },
  {
    title: "Review & Approval Process",
    text: "Our team reviews every submission to help maintain quality and accuracy across the directory. Once approved, your listing becomes visible to customers searching for businesses in your category and location.",
  },
  {
    title: "Grow Your Business Online",
    text: "Increase your online visibility, improve local discoverability, attract more enquiries, and connect with customers actively searching for your services. Update your profile anytime to keep your information current.",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="resource-page">
      <ResourceHero
        title="How Citiinfo Works"
        description="Whether you're searching for a trusted local business or looking to promote your own, Citiinfo makes the process simple, fast, and effective."
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
