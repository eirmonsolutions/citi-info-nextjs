import React from "react";

const BusinessListingDetailSkeleton = () => {
  return (
    <>
      <section className="profile-details detail-skeleton-profile">
        <div className="container">
          <div className="profile-wrapper">
            <div className="profile-detail-area">
              <div className="profile-img">
                <div className="skeleton detail-skeleton-logo" />
              </div>
              <div className="profile-content">
                <div className="skeleton detail-skeleton-business-name" />
                <div className="skeleton detail-skeleton-meta" />
                <div className="skeleton detail-skeleton-meta short" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="listing-details-area detail-skeleton-body">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-12 col-xl-8">
              <div className="skeleton detail-skeleton-slider" />

              <div className="detail-skeleton-section">
                <div className="skeleton detail-skeleton-heading" />
                <div className="skeleton detail-skeleton-line" />
                <div className="skeleton detail-skeleton-line" />
                <div className="skeleton detail-skeleton-line medium" />
              </div>

              <div className="detail-skeleton-section">
                <div className="skeleton detail-skeleton-heading" />
                <div className="detail-skeleton-grid">
                  <div className="skeleton detail-skeleton-card" />
                  <div className="skeleton detail-skeleton-card" />
                  <div className="skeleton detail-skeleton-card" />
                </div>
              </div>

              <div className="detail-skeleton-section">
                <div className="skeleton detail-skeleton-heading" />
                <div className="skeleton detail-skeleton-block tall" />
              </div>
            </div>

            <div className="col-lg-12 col-xl-4">
              <div className="detail-skeleton-sidebar">
                <div className="skeleton detail-skeleton-sidebar-card" />
                <div className="skeleton detail-skeleton-sidebar-card" />
                <div className="skeleton detail-skeleton-sidebar-card" />
                <div className="skeleton detail-skeleton-sidebar-card large" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BusinessListingDetailSkeleton;
