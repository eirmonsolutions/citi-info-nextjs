"use client";

import React from "react";

const STORAGE_URL =
  process.env.NEXT_PUBLIC_STORAGE_URL || "http://localhost:8000/storage";

const FeaturesSection = ({ listing }) => {
  const features = listing?.features || [];

  const filteredFeatures = features.filter(
    (feat) =>
      feat?.feature_name?.trim() ||
      feat?.feature_image
  );

  if (!filteredFeatures.length) return null;

  return (
    <div className="listing-feature-show">
      <h2 className="heading-title">Features</h2>

      <div className="features-box-grid mt-4">
        {filteredFeatures.map((feat, index) => {
          const featureImage = feat.feature_image
            ? feat.feature_image.startsWith("http")
              ? feat.feature_image
              : `${STORAGE_URL}/${feat.feature_image}`
            : "";

          return (
            <div
              className="icon-box icon-box-one"
              key={feat.id || index}
            >
              <div className="icon">
                {featureImage && (
                  <img
                    src={featureImage}
                    alt={feat.feature_name || "Feature"}
                    className="feature-icon-img"
                    style={{
                      height: "40px",
                      width: "40px",
                      objectFit: "contain",
                    }}
                  />
                )}
              </div>

              <div className="info">
                <h6>{feat.feature_name}</h6>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturesSection;