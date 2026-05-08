"use client";

import React, { useState } from "react";
import { Star, PenLine, X } from "lucide-react";
import Swal from "sweetalert2";

const API_URL = "http://localhost:8000/api/business-reviews";

const BusinessReviewSection = ({ listing, user }) => {
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
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        html: `
          <p>Please login first to submit your review.</p>
          <p>If you are already registered, please login first. Otherwise, create a new account to continue.</p>
        `,
        showCancelButton: true,
        confirmButtonText: "Login",
        cancelButtonText: "Register",
        confirmButtonColor: "#0d6efd",
        cancelButtonColor: "#111827",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          window.location.href = "/register";
        }
      });

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

    if (form.review.length < 50) {
      Swal.fire(
        "Review too short",
        "Your review must be at least 50 characters.",
        "warning"
      );
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          business_id: listing?.id,
          rating: form.rating,
          review: form.review,
        }),
      });

      const data = await res.json();

      if (res.status === 401) {
        Swal.fire({
          icon: "warning",
          title: "Login Required",
          html: `
            <p>Please login first to submit your review.</p>
            <p>If you are already registered, please login first. Otherwise, create a new account to continue.</p>
          `,
          showCancelButton: true,
          confirmButtonText: "Login",
          cancelButtonText: "Register",
          confirmButtonColor: "#0d6efd",
          cancelButtonColor: "#111827",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/login";
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            window.location.href = "/register";
          }
        });

        return;
      }

      if (data.success) {
        Swal.fire("Success", data.message, "success");

        setForm({
          rating: "",
          review: "",
        });

        setOpenModal(false);
      } else {
        Swal.fire("Error", data.message || "Something went wrong.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Unable to submit review.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="listing-review-area">
        <div className="review-header">
          <h2 className="heading-title">Reviews</h2>

          <button className="add-review-btn" onClick={handleAddReview}>
            <PenLine size={20} />
            Add review
          </button>
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

              <button onClick={() => setOpenModal(false)}>
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
                  placeholder="Your review must be at least 50 characters."
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