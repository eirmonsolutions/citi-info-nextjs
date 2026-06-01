"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import "../../../public/assets/css/ResourcePages.css";
import ResourceHero from "./ResourceHero";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQ_DATA = {
  "General Questions": [
    {
      q: "What is Citiinfo?",
      a: "Citiinfo is an Australia business directory that helps people find local businesses, compare services, and connect with providers. Business owners can list their company for free to reach more customers.",
    },
    {
      q: "Is Citiinfo free to use?",
      a: "Yes. Searching and browsing listings is free for visitors. Business owners can submit a free listing through our Add Listing page. Optional paid features may be available in the future.",
    },
    {
      q: "How do I search for a business?",
      a: "Use the search bar on the homepage or browse Categories and Business Listings. You can filter by location, category, and business name.",
    },
  ],
  "Listings & Business": [
    {
      q: "How do I add my business?",
      a: "Click Add Listing in the header and complete the step-by-step form with your business details, contact info, hours, services, photos, and features. Your listing is reviewed before going live.",
    },
    {
      q: "How long does approval take?",
      a: "Most listings are reviewed within a few business days. You will receive confirmation once your listing is approved and published on Citiinfo.",
    },
    {
      q: "Can I edit my listing later?",
      a: "Yes. Log in to your account dashboard to update business information, photos, hours, and services at any time.",
    },
  ],
  "Account Support": [
    {
      q: "How do I create an account?",
      a: "Click Login and choose Register, or sign up when submitting a listing. You will need a valid email address to verify your account.",
    },
    {
      q: "I forgot my password. What should I do?",
      a: "Use the password reset option on the login page. If you need further help, contact our support team via the Contact Us page.",
    },
  ],
  "Privacy & Security": [
    {
      q: "How is my data protected?",
      a: "We use reasonable security measures to protect your information. Read our Privacy Policy for details on what we collect and how we use it.",
    },
    {
      q: "Can I request deletion of my data?",
      a: "Yes. Contact us with your request and we will process it in line with applicable privacy laws and our Privacy Policy.",
    },
  ],
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
      <ResourceHero
        variant="faq-hero"
        title="Frequently Asked Questions"
        description="Find answers about using Citiinfo, adding your business, and managing your account."
        icon={<HelpCircle size={56} strokeWidth={1.5} />}
        
      />

      <section className="resource-body">
        <div className="faq-page-layout">
          <aside className="faq-sidebar">
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
          </aside>

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
                        onClick={() =>
                          setOpenIndex(isOpen ? -1 : index)
                        }
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
                <h3>Can&apos;t find your answer?</h3>
                <p>Our support team is ready to help.</p>
                <Link href="/contact-us">Contact Support</Link>
              </div>
              <div className="faq-support-card">
                <h3>Still have questions?</h3>
                <p>Send us a message and we will get back to you.</p>
                <Link href="/contact-us">Get in Touch</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
