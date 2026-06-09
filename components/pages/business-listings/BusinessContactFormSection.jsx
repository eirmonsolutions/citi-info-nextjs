"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/business-enquiry`;

const BusinessContactFormSection = ({ listing }) => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
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

    if (!form.name || !form.email || !form.phone) {
      Swal.fire("Required", "Please fill all required fields.", "warning");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          listing_id: listing?.id,
          ...form,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const msg =
          data.message ||
          (data.errors
            ? Object.values(data.errors).flat().join(", ")
            : "Something went wrong.");
        Swal.fire("Error", msg, "error");
        return;
      }

      if (data.success) {
        Swal.fire("Success", data.message, "success");

        setForm({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        Swal.fire("Error", data.message || "Something went wrong.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Unable to send enquiry.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="business-contact-card">
      <h2 className="heading-title">Quick Enquiry</h2>

      <form className="mt-3" onSubmit={handleSubmit}>
        <div className="contact-form-group">
          <label>
            Enter Your Name <span className="required">*</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="contact-form-group">
          <label>
            Enter Your Email <span className="required">*</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="abcd@gmail.com"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="contact-form-group">
          <label>
            Enter Your Phone Number <span className="required">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="800-123-4567"
            value={form.phone}
            onChange={handleChange}
          />
        </div>

        <div className="contact-form-group">
          <label>Message</label>
          <textarea
            name="message"
            rows="4"
            placeholder="Describe your business, services, and specialties"
            value={form.message}
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit" className="contact-submit-btn" disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default BusinessContactFormSection;