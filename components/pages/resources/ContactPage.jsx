"use client";

import React, { useState } from "react";
import "../../../public/assets/css/ResourcePages.css";
import ResourceHero from "./ResourceHero";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import Swal from "sweetalert2";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Required Fields",
        text: "Please enter your name, email, and message.",
        confirmButtonColor: "#087df2",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      await Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text:
          data.message ||
          "Thank you for contacting Citiinfo. Our team will respond as soon as possible.",
        confirmButtonColor: "#087df2",
      });

      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Message Not Sent",
        text:
          error.message ||
          "Unable to send your message right now. Please try again later.",
        confirmButtonColor: "#087df2",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="resource-page">
      <ResourceHero
        variant="contact-hero"
        title="Contact Us"
        description="Have a question about listings, your account, or advertising on Citiinfo? We are here to help businesses and customers across Australia."
      />

      <section className="resource-body">
        <div className="contact-page-grid">
          <div className="contact-info-card">
            <h2>Get in Touch</h2>

            <ul className="contact-info-list">
              

              <li>
                <Mail size={22} color="#087df2" />
                <div>
                  <strong>Email</strong>
                  <a href="mailto:support@citiinfo.com.au">
                    support@citiinfo.com.au
                  </a>
                </div>
              </li>

              <li>
                <Clock size={22} color="#087df2" />
                <div>
                  <strong>Business Hours</strong>
                  <span>Monday – Friday, 9:00 AM – 5:00 PM (AEST)</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="contact-form-card">
            <h2>Send a Message</h2>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">
                  Your Name <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  autoComplete="name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  Email <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="0412 345 678"
                  autoComplete="tel"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Listing enquiry"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">
                  Message <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  rows={6}
                />
              </div>

              <button
                type="submit"
                className="contact-submit"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}