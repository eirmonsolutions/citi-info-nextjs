"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Star } from "lucide-react";
import Swal from "sweetalert2";
import { apiFetch, resolveCsrfToken } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { getBackendLoginUrl } from "@/lib/authUrls";
import { getUserDisplayName } from "@/lib/userDisplay";

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

const BusinessReviewSection = ({ listing }) => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();

  const [reviews, setReviews] = useState(listing?.reviews || []);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    rating: "",
    review: "",
  });

  useEffect(() => {
    setReviews(listing?.reviews || []);
  }, [listing?.id, listing?.reviews]);

  const ratingRows = [5, 4, 3, 2, 1];
  const totalReviews = reviews.length;

  const avgRating = useMemo(() => {
    if (totalReviews === 0) return "0.0";

    const total = reviews.reduce(
      (sum, review) => sum + Number(review.rating || 0),
      0
    );

    return (total / totalReviews).toFixed(1);
  }, [reviews, totalReviews]);

  const getRatingCount = (rate) => {
    return reviews.filter((review) => Number(review.rating) === rate).length;
  };

  const getRatingPercent = (rate) => {
    if (totalReviews === 0) return "0%";
    return `${(getRatingCount(rate) / totalReviews) * 100}%`;
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
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

    if (!form.rating || !form.review) {
      Swal.fire("Required", "Please fill all required fields.", "warning");
      return;
    }

    if (form.review.trim().length < 10) {
      Swal.fire(
        "Review too short",
        "Your review must be at least 10 characters.",
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
      };

      setReviews((prev) => [newReview, ...prev]);
      setForm({ rating: "", review: "" });

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
    <div className="listing-review-area">
      <div className="review-header">
        <h2 className="heading-title">Reviews</h2>
      </div>

      <div className="row g-4 pb-3 mb-3">
        <div className="col-sm-5 col-md-3 col-lg-4">
          <div className="review-score-card">
            <h3>{avgRating}</h3>

            <div className="review-stars">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={30} fill="#ff8a2a" color="#ff8a2a" />
              ))}
            </div>

            <p>
              {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
            </p>
          </div>
        </div>

        <div className="col-sm-7 col-md-9 col-lg-8">
          <div className="review-rating-list">
            {ratingRows.map((rate) => (
              <div className="review-rating-row" key={rate}>
                <div className="rating-label">
                  <span>{rate}</span>
                  <Star size={24} fill="#ff8a2a" color="#ff8a2a" />
                </div>

                <div className="rating-line">
                  <span style={{ width: getRatingPercent(rate) }}></span>
                </div>

                <div className="rating-count">{getRatingCount(rate)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {totalReviews > 0 ? (
        reviews.map((review) => (
          <div className="review-item" key={review.id}>
            <strong>{review.name || "User"}</strong>
            <p>{review.review}</p>
          </div>
        ))
      ) : (
        <p className="text-muted mb-3">
          No reviews yet. Be the first one to review.
        </p>
      )}

      <div className="listing-review-form-wrap">
        <h3 className="heading-title h5 mb-3">Write a review</h3>

        {authLoading ? (
          <p className="text-muted mb-0">Checking login status...</p>
        ) : isAuthenticated ? (
          <form className="review-form review-form-inline" onSubmit={submitReview}>
            <div className="form-group">
              <label htmlFor="review-rating">
                Rating <span>*</span>
              </label>
              <select
                id="review-rating"
                name="rating"
                value={form.rating}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select rating
                </option>
                <option value="5">5 Star</option>
                <option value="4">4 Star</option>
                <option value="3">3 Star</option>
                <option value="2">2 Star</option>
                <option value="1">1 Star</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="review-text">
                Review <span>*</span>
              </label>
              <textarea
                id="review-text"
                name="review"
                value={form.review}
                onChange={handleChange}
                placeholder="Share your experience (minimum 10 characters)."
                required
                minLength={10}
                rows={4}
              />
            </div>

            <button
              type="submit"
              className="submit-review-btn"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit review"}
            </button>
          </form>
        ) : (
          <div className="review-login-prompt">
            <p className="mb-3">You must be logged in to write a review.</p>
            <a href={getBackendLoginUrl()} className="add-review-btn add-review-login">
              Login to write a review
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessReviewSection;
