import React from "react";

export default function SectionList({ sections, variant = "default", notice }) {
  return (
    <section className="resource-body">
      <div className="container">
        <div className="resource-section-list">
          {sections.map((section, index) => (
            <article
              key={section.title}
              className={`resource-section-card ${variant}`}
            >
              <div className="resource-section-num">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div>
                <h2>{section.title}</h2>
                {section.content}
              </div>
            </article>
          ))}
        </div>
        {notice && (
          <div className={`resource-notice ${notice.type || "info"}`}>
            {notice.text}
          </div>
        )}
      </div>
    </section>
  );
}
