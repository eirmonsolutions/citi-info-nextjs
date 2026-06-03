"use client";

export default function BlogFaqAccordion({
  faqItems = [],
  accordionId = "blogFaqAccordion",
}) {
  if (!faqItems.length) return null;

  return (
    <div className="blog-detail-faq">
      <h3>Frequently Asked Questions (FAQs)</h3>

      <div className="faq-list mt-4">
        <div className="accordion" id={accordionId}>
          {faqItems.map((item, index) => {
            const collapseId = `${accordionId}-collapse-${index}`;
            const isFirst = index === 0;

            return (
              <div className="accordion-item" key={item.id ?? index}>
                <h2 className="accordion-header">
                  <button
                    className={`accordion-button ${isFirst ? "" : "collapsed"}`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#${collapseId}`}
                    aria-expanded={isFirst}
                    aria-controls={collapseId}
                  >
                    {index + 1}. {item.question}
                  </button>
                </h2>
                <div
                  id={collapseId}
                  className={`accordion-collapse collapse ${isFirst ? "show" : ""}`}
                  data-bs-parent={`#${accordionId}`}
                >
                  <div className="accordion-body">{item.answer}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
