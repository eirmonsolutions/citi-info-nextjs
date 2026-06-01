import React from "react";

export default function ResourceHero({
  variant = "default",
  title,
  description,
  meta,
  icon,
  search,
}) {
  return (
    <section className={`resource-hero ${variant}`}>
      <div className="container">
        <div className="resource-hero-grid">
          <div>
            <h1>{title}</h1>
            {description && <p>{description}</p>}
            {meta && <p className="resource-hero-meta">{meta}</p>}
            {search}
          </div>
          {icon && <div className="resource-hero-icon">{icon}</div>}
        </div>
      </div>
    </section>
  );
}
