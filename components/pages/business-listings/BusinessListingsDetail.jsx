"use client";

import React, { useEffect, useState } from "react";
import { Star, MapPin } from "lucide-react";

import FAQSection from "./FAQSection";
import ImgSliderSection from "./ImgSliderSection";
import BusinessAnnouncementSection from "./BusinessAnnouncementSection";
import BusinessEventSection from "./BusinessEventSection";
import FeaturesSection from "./FeaturesSection";
import ServicesSection from "./ServicesSection";
import CouponSideBarSection from "./CouponSideBarSection";
import ContactInfo from "./ContactInfo";
import BusinessHourSection from "./BusinessHourSection";
import BusinessReviewSection from "./BusinessReviewSection";
import BusinessContactFormSection from "./BusinessContactFormSection";

const API_URL = "http://localhost:8000/api/listings";
const STORAGE_URL = "https://citiinfo.com.au/storage";

const BusinessListingsDetail = ({ slug }) => {
  const [listing, setListing] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(API_URL, { cache: "no-store" });
        const data = await res.json();

        const listings = Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data)
            ? data
            : [];

        const matchedListing = listings.find(
          (item) => item.slug === slug
        );

        setListing(matchedListing || null);
      } catch (error) {
        console.error("Listing fetch error:", error);
      }
    };

    if (slug) {
      fetchListing();
    }
  }, [slug]);

  if (!listing) return null;

  const logoUrl = listing.logo
    ? listing.logo.startsWith("http")
      ? listing.logo
      : `${STORAGE_URL}/${listing.logo}`
    : "/assets/img/default-logo.png";

  const location = [
    listing.city_rel?.name,
    listing.state_rel?.name,
    listing.country_rel?.name,
  ]
    .filter(Boolean)
    .join(" , ");

  return (
    <>
      <section className="profile-details">
        <div className="container">
          <div className="profile-wrapper">
            <div className="profile-detail-area">
              <div className="profile-img">
                <img
                  src={logoUrl}
                  alt={listing.business_name || "Business Logo"}
                />
              </div>

              <div className="profile-content">
                <div className="profile-name">
                  <h1>{listing.business_name}</h1>
                </div>

                <div className="profile-reviews-area">
                  <ul>
                    <li>
                      <Star size={18} />
                      <span className="profile-review-number">
                        {listing.average_rating || "0.0"}
                      </span>
                      <span className="profile-review-count">
                        {Number(listing.reviews_count) > 0
                          ? ` (${listing.reviews_count} ratings)`
                          : " (No ratings)"}
                      </span>
                    </li>

                    <li>
                      <MapPin size={18} />
                      <span className="profile-review-count">
                        {location || "Location not available"}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="listing-details-area">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-12 col-xl-8">
              <ImgSliderSection listing={listing} />

              <BusinessAnnouncementSection listing={listing} />

              <div className="listing-details-about">
                <h2 className="heading-title">About</h2>
                <p>
                  {listing.description ||
                    "Business description not available."}
                </p>
              </div>

              <BusinessEventSection listing={listing} />

              <FeaturesSection listing={listing} />

              <ServicesSection listing={listing} />

              <FAQSection listing={listing} />

              <BusinessReviewSection listing={listing} user={null} />
            </div>

            <div className="col-lg-12 col-xl-4">
              <div className="top-sticky">
                <CouponSideBarSection listing={listing} />

                <ContactInfo listing={listing} />

                <BusinessHourSection listing={listing} />

                <BusinessContactFormSection listing={listing} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BusinessListingsDetail;