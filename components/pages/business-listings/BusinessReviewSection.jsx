"use client";

import React, { useState } from "react";
import { Star, PenLine, X } from "lucide-react";
import Swal from "sweetalert2";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { redirectToBackendLogin, getBackendLoginUrl } from "@/lib/authUrls";

function getErrorMessage(error, fallback) {
  if (!error) return fallback;

  if (error.status === 422 && error.errors) {
    const firstField = Object.keys(error.errors)[0];
    if (firstField && error.errors[firstField]?.[0]) {
      return error.errors[firstField][0];
    }
  }

  return error.message || fallback;
}

const BusinessReviewSection = ({ listing }) => {
  const { isAuthenticated } = useAuth();

  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    rating: "",
    review: "",
  });

  const reviews = listing?.reviews || [];
  const ratingRows = [5, 4, 3, 2, 1];

  const totalReviews = reviews.length;

  const avgRating =
    totalReviews > 0
      ? (
          reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) /
          totalReviews
        ).toFixed(1)
      : "0.0";

  const getRatingCount = (rate) => {
    return reviews.filter((review) => Number(review.rating) === rate).length;
  };

  const getRatingPercent = (rate) => {
    if (totalReviews === 0) return "0%";
    return `${(getRatingCount(rate) / totalReviews) * 100}%`;
  };

  const handleAddReview = () => {
    if (!isAuthenticated) {
      redirectToBackendLogin();
      return;
    }

    setOpenModal(true);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitReview = async (e) => {
    e.preventDefault();

    if (!form.rating || !form.review) {
      Swal.fire("Required", "Please fill all required fields.", "warning");
      return;
    }

    if (form.review.length < 10) {
      Swal.fire(
        "Review too short",
        "Your review must be at least 10 characters.",
        "warning"
      );
      return;
    }

    setLoading(true);

    try {
      const data = await apiFetch("/business-reviews", {
        method: "POST",
        body: JSON.stringify({
          business_id: listing?.id,
          rating: Number(form.rating),
          review: form.review,
        }),
      });

      Swal.fire(
        "Success",
        data.message || "Your review has been submitted.",
        "success"
      );

      setForm({
        rating: "",
        review: "",
      });

      setOpenModal(false);
    } catch (error) {
      if (error?.status === 401) {
        redirectToBackendLogin();
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
    <>
      <div className="listing-review-area">
        <div className="review-header">
          <h2 className="heading-title">Reviews</h2>

          {isAuthenticated ? (
            <button className="add-review-btn" onClick={handleAddReview}>
              <PenLine size={20} />
              Add review
            </button>
          ) : (
            <a
              href={getBackendLoginUrl()}
              className="add-review-btn add-review-login"
            >
              Login to write a review
            </a>
          )}
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
          <p className="text-muted mb-0">
            No reviews yet. Be the first one to review.
          </p>
        )}
      </div>

      {openModal && (
        <div className="review-modal-overlay">
          <div className="review-modal">
            <div className="review-modal-header">
              <h3>Write a review</h3>

              <button type="button" onClick={() => setOpenModal(false)}>
                <X size={26} />
              </button>
            </div>

            <form className="review-form" onSubmit={submitReview}>
              <div className="form-group">
                <label>
                  Rating <span>*</span>
                </label>

                <select
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
                <label>
                  Review <span>*</span>
                </label>

                <textarea
                  name="review"
                  value={form.review}
                  onChange={handleChange}
                  placeholder="Your review must be at least 10 characters."
                  required
                  minLength={10}
                ></textarea>
              </div>

              <div className="review-modal-footer">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setOpenModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="submit-review-btn"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default BusinessReviewSection;
