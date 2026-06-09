"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
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
import BusinessListingDetailSkeleton from "./BusinessListingDetailSkeleton";
import { fetchListingBySlug } from "@/lib/fetchListingBySlug";

const STORAGE_URL =
  process.env.NEXT_PUBLIC_STORAGE_URL || "https://api.citiinfo.com.au/storage";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://api.citiinfo.com.au";

const BusinessListingsDetail = ({ slug }) => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadListing = async () => {
      if (!slug) {
        setLoading(false);
        setNotFound(true);
        return;
      }

      setLoading(true);
      setNotFound(false);
      setLoadError("");
      setListing(null);

      try {
        const matchedListing = await fetchListingBySlug(slug);

        if (cancelled) return;

        if (matchedListing) {
          setListing(matchedListing);
          setNotFound(false);
        } else {
          setListing(null);
          setNotFound(true);
        }
      } catch (error) {
        console.error("Listing fetch error:", error);

        if (cancelled) return;

        setListing(null);
        setNotFound(false);
        setLoadError(
          "Could not connect to the server. Make sure the API is running and try again."
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadListing();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    if (!slug || !listing?.id) return;

    const trackView = async () => {
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/listings/${slug}/view`,
          { method: "POST" }
        );
      } catch (error) {
        console.error("View tracking failed:", error);
      }
    };

    trackView();
  }, [slug, listing?.id]);

  if (loading) {
    return <BusinessListingDetailSkeleton />;
  }

  if (loadError) {
    return (
      <section className="listing-details-area">
        <div className="container py-5 text-center">
          <h1>Unable to load listing</h1>
          <p className="mt-3">{loadError}</p>
          <button
            type="button"
            className="btn-add d-inline-flex mt-4"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      </section>
    );
  }

  if (notFound || !listing) {
    return (
      <section className="listing-details-area">
        <div className="container py-5 text-center">
          <h1>Listing not found</h1>
          <p className="mt-3">
            This business listing may have been removed or is no longer available.
          </p>
          <Link href="/business-listings" className="btn-add d-inline-flex mt-4">
            Back to Business Listings
          </Link>
        </div>
      </section>
    );
  }

  const logoPath = listing.logo ? String(listing.logo) : "";

  const logoUrl = logoPath
    ? logoPath.startsWith("http")
      ? logoPath
      : logoPath.startsWith("storage/")
        ? `${SITE_URL}/${logoPath}`
        : `${STORAGE_URL}/${logoPath}`
    : "/assets/img/default-logo.png";

  const location = [
    listing.city_rel?.name,
    listing.state_rel?.name,
    listing.country_rel?.name,
  ]
    .filter(Boolean)
    .join(" , ");

  const getRating = (item) => {
    if (item.average_rating) return Number(item.average_rating).toFixed(1);

    if (item.reviews_avg_rating) return Number(item.reviews_avg_rating).toFixed(1);

    if (item.reviews?.length > 0) {
      const total = item.reviews.reduce(
        (sum, review) => sum + Number(review.rating || 0),
        0
      );

      return (total / item.reviews.length).toFixed(1);
    }

    return "0.0";
  };

  const getReviewCount = (item) => {
    if (item.reviews_count !== undefined && item.reviews_count !== null) {
      return Number(item.reviews_count);
    }

    if (item.reviews?.length > 0) {
      return item.reviews.length;
    }

    return 0;
  };

  const rating = getRating(listing);
  const reviewCount = getReviewCount(listing);

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
                        {rating}
                      </span>
                      <span className="profile-review-count">
                        {reviewCount > 0
                          ? ` (${reviewCount} ratings)`
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