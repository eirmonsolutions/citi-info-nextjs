"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "@/context/AuthContext";
import { submitBusinessEnquiry } from "@/lib/api/enquiry";
import { resolveCsrfToken } from "@/lib/api";
import {
  getBackendLoginUrl,
  getMessagesUrl,
} from "@/lib/authUrls";
import { getUserDisplayName } from "@/lib/userDisplay";

function getErrorMessage(error, fallback) {
  if (!error) return fallback;

  if (error.status === 401) {
    return "Please login to send an enquiry.";
  }

  if (error.status === 422 && error.errors) {
    const firstField = Object.keys(error.errors)[0];
    if (firstField && error.errors[firstField]?.[0]) {
      return error.errors[firstField][0];
    }
  }

  return error.message || fallback;
}

const BusinessContactFormSection = ({ listing }) => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      window.location.href = getBackendLoginUrl();
      return;
    }

    if (!listing?.id) {
      Swal.fire("Error", "Listing not found. Please refresh the page.", "error");
      return;
    }

    if (!form.phone.trim() || !form.message.trim()) {
      Swal.fire("Required", "Please fill phone and message fields.", "warning");
      return;
    }

    if (form.message.trim().length < 10) {
      Swal.fire(
        "Message too short",
        "Your message must be at least 10 characters.",
        "warning"
      );
      return;
    }

    setLoading(true);

    try {
      await resolveCsrfToken();

      const data = await submitBusinessEnquiry({
        listingId: listing.id,
        phone: form.phone.trim(),
        message: form.message.trim(),
      });

      setForm({ phone: "", message: "" });

      const messagesUrl = data.messages_url || getMessagesUrl(user);

      Swal.fire({
        icon: "success",
        title: "Enquiry Sent!",
        html: `
          <p>${data.message || "Your enquiry has been sent successfully."}</p>
          <p class="mt-2">You can view your message and any replies in your dashboard.</p>
        `,
        confirmButtonText: "Go to Messages",
        showCancelButton: true,
        cancelButtonText: "Close",
        confirmButtonColor: "#087df2",
      }).then((result) => {
        if (result.isConfirmed) {
          window.open(messagesUrl, "_blank");
        }
      });
    } catch (error) {
      if (error?.status === 401) {
        window.location.href = getBackendLoginUrl();
        return;
      }

      Swal.fire(
        "Error",
        getErrorMessage(error, "Unable to send enquiry."),
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="business-contact-card">
      <h2 className="heading-title">Quick Enquiry</h2>

      {authLoading ? (
        <p className="text-muted mt-3 mb-0">Checking login status...</p>
      ) : !isAuthenticated ? (
        <div className="enquiry-login-prompt mt-3">
          <p className="mb-3">You must be logged in to send a quick enquiry.</p>
          <a href={getBackendLoginUrl()} className="add-review-btn add-review-login">
            Login to send enquiry
          </a>
        </div>
      ) : (
        <>
          <div className="enquiry-user-details mt-3">
            <div className="enquiry-user-row">
              <span className="label">Name</span>
              <span className="value">{getUserDisplayName(user)}</span>
            </div>
            <div className="enquiry-user-row">
              <span className="label">Email</span>
              <span className="value">{user?.email || "—"}</span>
            </div>
          </div>

          <form className="mt-3" onSubmit={handleSubmit}>
            <div className="contact-form-group">
              <label>
                Phone Number <span className="required">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="800-123-4567"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact-form-group">
              <label>
                Message <span className="required">*</span>
              </label>
              <textarea
                name="message"
                rows="4"
                placeholder="Write your enquiry (minimum 10 characters)"
                value={form.message}
                onChange={handleChange}
                required
                minLength={10}
              />
            </div>

            <button
              type="submit"
              className="contact-submit-btn"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default BusinessContactFormSection;
