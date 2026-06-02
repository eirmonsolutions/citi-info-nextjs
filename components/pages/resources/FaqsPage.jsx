"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import "../../../public/assets/css/ResourcePages.css";
import ResourceHero from "./ResourceHero";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQ_DATA = {
  "Citiinfo FAQs": [
    {
      q: "What is Citiinfo?",
      a: "Citiinfo is a leading Australian business directory that helps you discover trusted local businesses in cities like Melbourne, Sydney, Brisbane, and beyond. Whether you’re searching for restaurants, plumbers, dentists, or more, Citiinfo connects you with verified businesses.",
    },
    {
      q: "How can I list my business on Citiinfo?",
      a: "To list your business on Citiinfo, simply click on the Add Listing button at the top of the page. You’ll be prompted to fill in your business details, including your services, contact information, and location. Once submitted, your listing will be reviewed and published.",
    },
    {
      q: "Is listing my business free on Citiinfo?",
      a: "Yes, Citiinfo offers a free business listing option for all local businesses in Australia. You can also opt for premium listings with added features to boost visibility, but the basic listing service is free.",
    },
    {
      q: "How do I search for businesses on Citiinfo?",
      a: "You can search for businesses by category, such as Restaurants, Plumbers, Hair Salons, or by location, such as Melbourne or Sydney, directly from the homepage search bar. You can also filter results by ratings, price range, and distance for more refined results.",
    },
    {
      q: "How accurate are the business details listed on Citiinfo?",
      a: "We make every effort to ensure that the details on Citiinfo are accurate and up-to-date. However, we rely on business owners to keep their information current. Users are encouraged to verify business details directly with the companies listed.",
    },
    {
      q: "Can I leave a review for businesses listed on Citiinfo?",
      a: "Yes, Citiinfo allows users to leave reviews and ratings for businesses they’ve interacted with. This helps other users make informed decisions. Simply search for a business and leave your honest feedback.",
    },
    {
      q: "How do I update my business listing on Citiinfo?",
      a: "If you need to update your business details, log into your account and go to your Business Profile page. From there, you can update information such as your services, contact details, and operating hours.",
    },
    {
      q: "Can I advertise on Citiinfo?",
      a: "Yes, Citiinfo offers advertising opportunities to help you gain more exposure for your business. We have banner ads, featured listings, and social media promotions to help promote your services to a wider audience. Contact our sales team for more information.",
    },
    {
      q: "How can I contact customer support for Citiinfo?",
      a: "If you need help or have questions, you can contact Citiinfo customer support via email at support@citiinfo.com.au. We are available 9 AM to 6 PM AEST, Monday through Friday.",
    },
    {
      q: "How do I report incorrect information on Citiinfo?",
      a: "If you find any incorrect or outdated information on Citiinfo, please let us know immediately. You can report errors by clicking on the Report a Problem link on the business listing page. Our team will review and update the information promptly.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_DATA["Citiinfo FAQs"].map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

const CATEGORIES = Object.keys(FAQ_DATA);

export default function FaqsPage() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [openIndex, setOpenIndex] = useState(0);
  const [search, setSearch] = useState("");

  const filteredFaqs = useMemo(() => {
    const items = FAQ_DATA[activeCategory] || [];
    if (!search.trim()) return items;

    const term = search.toLowerCase();

    return items.filter(
      (item) =>
        item.q.toLowerCase().includes(term) ||
        item.a.toLowerCase().includes(term)
    );
  }, [activeCategory, search]);

  return (
    <main className="resource-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <ResourceHero
        variant="faq-hero"
        title="Frequently Asked Questions"
        description="Find answers about using Citiinfo, adding your business, searching local services, reviews, advertising, and account support."
        icon={<HelpCircle size={56} strokeWidth={1.5} />}
      />

      <section className="resource-body">
        <div className="faq-page-layout">
          {/* <aside className="faq-sidebar">
            <h3>Categories</h3>

            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={activeCategory === cat ? "active" : ""}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenIndex(0);
                }}
              >
                {cat}
              </button>
            ))}
          </aside> */}

          <div className="faq-main">
            <h2>{activeCategory}</h2>

            

            <div className="faq-list">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((item, index) => {
                  const isOpen = openIndex === index;

                  return (
                    <div className="faq-item" key={item.q}>
                      <div
                        className="faq-question"
                        onClick={() => setOpenIndex(isOpen ? -1 : index)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            setOpenIndex(isOpen ? -1 : index);
                          }
                        }}
                      >
                        <span>{item.q}</span>
                        <ChevronDown
                          size={20}
                          className={`faq-icon ${isOpen ? "rotate" : ""}`}
                        />
                      </div>

                      {isOpen && (
                        <div className="faq-answer">
                          <p>{item.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <p style={{ color: "#6b7280" }}>
                  No questions match your search. Try another keyword or{" "}
                  <Link href="/contact-us">contact us</Link>.
                </p>
              )}
            </div>

            <div className="faq-support-row">
              <div className="faq-support-card">
                <h3>Still Have Questions?</h3>
                <p>
                  If your question is not answered here, feel free to reach out
                  to our customer support team.
                </p>
                <a href="mailto:support@citiinfo.com.au">
                  support@citiinfo.com.au
                </a>
              </div>

              <div className="faq-support-card">
                <h3>Need Business Support?</h3>
                <p>
                  Get help with listings, updates, reviews, advertising, and
                  account-related questions.
                </p>
                <Link href="/contact-us">Contact Support</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}