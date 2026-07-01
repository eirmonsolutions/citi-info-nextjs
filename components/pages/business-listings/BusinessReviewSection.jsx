"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Star } from "lucide-react";
import Swal from "sweetalert2";
import { apiFetch, resolveCsrfToken } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { getBackendLoginUrl } from "@/lib/authUrls";
import { getUserDisplayName } from "@/lib/userDisplay";
import { getLogoUrl } from "@/lib/listingHelpers";

const MIN_REVIEW_CHARS = 10;
const REVIEW_TAGS = ["Quality", "Service", "Value", "Staff", "Experience"];
const PREVIEW_LENGTH = 180;
const RATING_ROWS = [5, 4, 3, 2, 1];

function getErrorMessage(error, fallback) {
  if (!error) return fallback;

  if (error.status === 422 && error.errors) {
    const firstField = Object.keys(error.errors)[0];
    if (firstField && error.errors[firstField]?.[0]) {
      return error.errors[firstField][0];
    }
  }

  if (error.status === 419) {
    return "Session expired. Please refresh the page and try again.";
  }

  return error.message || fallback;
}

function formatReviewDate(value) {
  if (!value) return "Recently";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently";

  return date.toLocaleDateString("en-AU", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getInitials(name) {
  const parts = String(name || "U")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

function DisplayStars({ rating, size = 18 }) {
  const value = Number(rating) || 0;

  return (
    <span className="reviews-display-stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          fill={i <= Math.round(value) ? "#ff6b35" : "transparent"}
          color={i <= Math.round(value) ? "#ff6b35" : "#d1d5db"}
        />
      ))}
    </span>
  );
}

function StarRatingInput({ value, onChange }) {
  const [hover, setHover] = useState(0);
  const active = hover || value;

  const labels = ["", "Poor", "Fair", "Good", "Very good", "Excellent"];

  return (
    <div className="reviews-star-input">
      <div className="reviews-star-input-row">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`reviews-star-btn ${star <= active ? "is-active" : ""}`}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onChange(star)}
            aria-label={`${star} star${star > 1 ? "s" : ""}`}
          >
            <Star size={34} strokeWidth={1.5} />
          </button>
        ))}
        <span className="reviews-star-label">
          {active ? labels[active] : "Select your rating"}
        </span>
      </div>
    </div>
  );
}

function ReviewCard({ review }) {
  const [expanded, setExpanded] = useState(false);
  const text = review.review || review.comment || "";
  const isLong = text.length > PREVIEW_LENGTH;
  const displayText =
    !isLong || expanded ? text : `${text.slice(0, PREVIEW_LENGTH).trim()}...`;

  return (
    <article className="reviews-list-card">
      <div className="reviews-list-card-head">
        <div className="reviews-avatar">{getInitials(review.name)}</div>
        <div className="reviews-list-card-meta">
          <strong className="reviews-author">{review.name || "User"}</strong>
          <div className="reviews-list-card-sub">
            <DisplayStars rating={review.rating} size={14} />
            <span className="reviews-date">{formatReviewDate(review.created_at)}</span>
          </div>
        </div>
      </div>

      <p className="reviews-list-text">{displayText}</p>

      {isLong && (
        <button
          type="button"
          className="reviews-read-more"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </article>
  );
}

const BusinessReviewSection = ({ listing, onReviewsChange }) => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();

  const [reviews, setReviews] = useState(listing?.reviews || []);
  const [loading, setLoading] = useState(false);
  const [hoverTag, setHoverTag] = useState("");
  const [form, setForm] = useState({
    rating: 0,
    review: "",
  });

  useEffect(() => {
    const nextReviews = listing?.reviews || [];
    setReviews(nextReviews);
    onReviewsChange?.(nextReviews);
  }, [listing?.id, listing?.reviews, onReviewsChange]);

  const updateReviews = (updater) => {
    setReviews((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      onReviewsChange?.(next);
      return next;
    });
  };

  const location = [listing?.city_rel?.name, listing?.state_rel?.name]
    .filter(Boolean)
    .join(", ");

  const totalReviews = reviews.length;

  const avgRating = useMemo(() => {
    if (totalReviews === 0) return "0.0";

    const total = reviews.reduce(
      (sum, review) => sum + Number(review.rating || 0),
      0
    );

    return (total / totalReviews).toFixed(1);
  }, [reviews, totalReviews]);

  const getRatingCount = (rate) =>
    reviews.filter((review) => Number(review.rating) === rate).length;

  const getRatingPercent = (rate) => {
    if (totalReviews === 0) return 0;
    return Math.round((getRatingCount(rate) / totalReviews) * 100);
  };

  const charCount = form.review.trim().length;
  const charProgress = Math.min((charCount / MIN_REVIEW_CHARS) * 100, 100);
  const canSubmit =
    form.rating > 0 && charCount >= MIN_REVIEW_CHARS && !loading;

  const handleTagClick = (tag) => {
    const snippet = `${tag}: `;
    setForm((prev) => {
      if (prev.review.includes(snippet)) return prev;
      return {
        ...prev,
        review: prev.review ? `${prev.review.trim()}\n${snippet}` : snippet,
      };
    });
  };

  const submitReview = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      window.location.href = getBackendLoginUrl();
      return;
    }

    if (!listing?.id) {
      Swal.fire("Error", "Listing not found. Please refresh the page.", "error");
      return;
    }

    if (!form.rating || !form.review.trim()) {
      Swal.fire("Required", "Please add a rating and your review.", "warning");
      return;
    }

    if (form.review.trim().length < MIN_REVIEW_CHARS) {
      Swal.fire(
        "Review too short",
        `Your review must be at least ${MIN_REVIEW_CHARS} characters.`,
        "warning"
      );
      return;
    }

    setLoading(true);

    try {
      await resolveCsrfToken();

      const data = await apiFetch("/business-reviews", {
        method: "POST",
        body: JSON.stringify({
          business_id: listing.id,
          rating: Number(form.rating),
          review: form.review.trim(),
        }),
      });

      const newReview = {
        id: Date.now(),
        name: getUserDisplayName(user),
        rating: Number(form.rating),
        review: form.review.trim(),
        created_at: new Date().toISOString(),
      };

      updateReviews((prev) => [newReview, ...prev]);
      setForm({ rating: 0, review: "" });

      Swal.fire(
        "Success",
        data.message || "Your review has been submitted.",
        "success"
      );
    } catch (error) {
      if (error?.status === 401) {
        window.location.href = getBackendLoginUrl();
        return;
      }

      Swal.fire(
        "Error",
        getErrorMessage(error, "Unable to submit review."),
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="listing-review-area reviews-unified">
      <h2 className="reviews-main-title">Reviews</h2>

      <div className="reviews-summary">
        <div className="reviews-score-box">
          <div className="reviews-score-value">{avgRating}</div>
          <DisplayStars rating={avgRating} size={22} />
          <p className="reviews-score-count">
            {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
          </p>
        </div>

        <div className="reviews-breakdown">
          {RATING_ROWS.map((rate) => (
            <div className="reviews-breakdown-row" key={rate}>
              <span className="reviews-breakdown-label">
                {rate} <Star size={14} fill="#ff6b35" color="#ff6b35" />
              </span>
              <div className="reviews-breakdown-bar">
                <span style={{ width: `${getRatingPercent(rate)}%` }} />
              </div>
              <span className="reviews-breakdown-count">{getRatingCount(rate)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="reviews-divider" />

      <div className="reviews-compose-block">
        <div className="reviews-business-chip">
          <img
            src={getLogoUrl(listing)}
            alt={listing?.business_name || "Business"}
            className="reviews-business-logo"
          />
          <div>
            <h3 className="reviews-business-name">
              {listing?.business_name || "Business"}
            </h3>
            {location && <p className="reviews-business-location">{location}</p>}
          </div>
        </div>

        <h3 className="reviews-block-title">How would you rate your experience?</h3>
        <StarRatingInput
          value={form.rating}
          onChange={(rating) => setForm((prev) => ({ ...prev, rating }))}
        />

        {authLoading ? (
          <p className="reviews-muted">Checking login status...</p>
        ) : isAuthenticated ? (
          <form className="reviews-form" onSubmit={submitReview}>
            <h3 className="reviews-block-title">Tell us about your experience</h3>
            <p className="reviews-tag-hint">A few things to consider in your review</p>

            {/* <div className="reviews-tags">
              {REVIEW_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className={`reviews-tag ${hoverTag === tag ? "is-hover" : ""}`}
                  onMouseEnter={() => setHoverTag(tag)}
                  onMouseLeave={() => setHoverTag("")}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </button>
              ))}
            </div> */}

            <textarea
              id="review-text"
              name="review"
              value={form.review}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, review: e.target.value }))
              }
              placeholder="Start your review..."
              rows={6}
              className="reviews-textarea"
            />

            <div className="reviews-form-footer">
              <div className="reviews-char-progress">
                <svg viewBox="0 0 36 36" className="reviews-char-ring">
                  <path
                    className="reviews-char-ring-bg"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="reviews-char-ring-fill"
                    strokeDasharray={`${charProgress}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="reviews-char-hint">
                  Reviews need to be at least {MIN_REVIEW_CHARS} characters
                </span>
              </div>

              <button
                type="submit"
                className="reviews-post-btn"
                disabled={!canSubmit}
              >
                {loading ? "Posting..." : "Post Review"}
              </button>
            </div>
          </form>
        ) : (
          <div className="reviews-login-box">
            <p>You must be logged in to write a review.</p>
            <a href={getBackendLoginUrl()} className="reviews-post-btn">
              Login to post review
            </a>
          </div>
        )}
      </div>

      <div className="reviews-divider" />

      <div className="reviews-list-section">
        <h3 className="reviews-block-title">
          {totalReviews > 0
            ? `All reviews (${totalReviews})`
            : "Customer reviews"}
        </h3>

        {totalReviews > 0 ? (
          <div className="reviews-list">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <p className="reviews-muted">
            No reviews yet. Be the first to share your experience.
          </p>
        )}
      </div>
    </div>
  );
};

export default BusinessReviewSection;
