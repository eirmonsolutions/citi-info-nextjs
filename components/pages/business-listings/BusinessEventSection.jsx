"use client";

import React from "react";
import { MapPin } from "lucide-react";
import Link from "next/link";

const STORAGE_URL = "http://localhost:8000/storage";

const BusinessEventSection = ({ listing }) => {
    const event = listing?.events?.[0];

    if (!event) return null;

    const eventImage = event.featured_image
        ? event.featured_image.startsWith("http")
            ? event.featured_image
            : `${STORAGE_URL}/${event.featured_image}`
        : "";

    const btnLink = event.ticket_url || "#";

    const location =
        event.location || listing?.address || "Location not available";

    const mapQuery = encodeURIComponent(
        `${listing?.business_name || ""}, ${location}`
    );

    // Date Format
    const formatDate = (date) => {
        if (!date) return "";

        return new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    // Time Format
    const formatTime = (time) => {
        if (!time) return "";

        const [hour, minute] = time.split(":");

        const date = new Date();
        date.setHours(hour, minute);

        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };

    // Final Date Time String
    const eventDateTime = `${formatDate(event.start_date)} ${event.start_time ? formatTime(event.start_time) : ""
        } ${event.end_date ? `- ${formatDate(event.end_date)}` : ""
        } ${event.end_time ? formatTime(event.end_time) : ""}`;

    return (
        <>
            <div className="ann-card ann-preview event-type-box">
                <div className="ann-card-head">
                    Latest Events
                </div>

                <div className="ann-card-body">
                    {eventImage && (
                        <div className="ann-preview-icon">
                            <img
                                src={eventImage}
                                alt={event.title || "Event"}
                            />
                        </div>
                    )}

                    <div className="ann-preview-texts">
                        <div className="ann-preview-title">
                            {event.title || "Event"}
                        </div>

                        <div className="ann-preview-desc">
                            {event.description || ""}
                        </div>

                        <div className="ann-listing-name">
                            {listing?.business_name}
                        </div>

                        <div className="ann-listing-location">
                            <span className="ann-icon-location">
                                <MapPin size={16} />
                            </span>

                            {location}
                        </div>

                        <div className="ann-listing-location">
                            <span className="ann-icon-location">
                                🕒
                            </span>

                            <span>{eventDateTime}</span>
                        </div>
                    </div>

                    <div className="event-btn-wrap">
                        <Link
                            href={btnLink}
                            className="ann-chip"
                            style={{
                                textDecoration: "none",
                                cursor: "pointer",
                            }}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View Event
                        </Link>
                    </div>
                </div>

                <div className="ann-card-body">
                    <iframe
                        src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                        width="100%"
                        height="220"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        style={{
                            borderRadius: "10px",
                            border: "0",
                        }}
                        allowFullScreen
                    ></iframe>
                </div>
            </div>

            <style jsx>{`
        .event-btn-wrap {
          margin-left: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 140px;
        }

        .ann-chip {
          background: #dbeafe;
          color: #0d6efd;
          padding: 12px 22px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .ann-chip:hover {
          background: #0d6efd;
          color: #fff;
        }

        @media (max-width: 768px) {
          .event-btn-wrap {
            width: 100%;
            margin-top: 15px;
            justify-content: flex-start;
          }

          .ann-chip {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
        </>
    );
};

export default BusinessEventSection;