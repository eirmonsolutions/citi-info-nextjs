"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQSection = ({ listing }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const allItems =
    listing?.faqs?.flatMap((faq) => faq.items || []) || [];

  const filteredFaqs = allItems.filter(
    (item) => item?.question?.trim() && item?.answer?.trim()
  );

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (!filteredFaqs.length) return null;

  return (
    <div className="faq">
      <h2 className="heading-title">Frequently Asked Questions</h2>

      <div className="faq-list mt-4">
        {filteredFaqs.map((item, index) => (
          <div className="faq-item" key={item.id || index}>
            <div
              className={`faq-question ${activeIndex === index ? "active" : ""}`}
              onClick={() => toggleFaq(index)}
            >
              <span>{item.question}</span>

              <ChevronDown
                size={18}
                className={`faq-icon ${activeIndex === index ? "rotate" : ""}`}
              />
            </div>

            <div
              className="faq-answer"
              style={{
                display: activeIndex === index ? "block" : "none",
              }}
            >
              <p style={{ whiteSpace: "pre-line" }}>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;