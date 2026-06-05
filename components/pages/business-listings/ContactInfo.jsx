"use client";

import React from "react";
import { MapPin, PhoneCall, Mail, Globe } from "lucide-react";

const ContactInfo = ({ listing }) => {
  const contact = listing?.contacts?.[0] || {};

  const socialLinks = {};
  (listing?.social_links || []).forEach((item) => {
    if (item?.platform && item?.url) {
      socialLinks[item.platform.toLowerCase()] = item.url.trim();
    }
  });

  const address = listing?.address || "";
  const mapQuery = encodeURIComponent(
    `${listing?.business_name || ""}, ${address}`
  );

  return (
    <>
      <div className="listing-details-sidebar">
        <h3 className="heading-title">Contact Information</h3>

        <div className="row mt-3">
          <div className="col-md-12">
            <div className="contact-info">
              <ul>
                {address && (
                  <li>
                    <span className="contact-icon">
                      <MapPin size={18} />
                    </span>
                    {address}
                  </li>
                )}

                {contact.phone && (
                  <li>
                    <span className="contact-icon">
                      <PhoneCall size={18} />
                    </span>
                    <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                  </li>
                )}

                {contact.email && (
                  <li>
                    <span className="contact-icon">
                      <Mail size={18} />
                    </span>
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  </li>
                )}

                {contact.website && (
                  <li>
                    <span className="contact-icon">
                      <Globe size={18} />
                    </span>
                    <a href={contact.website} target="_blank" rel="noopener noreferrer">
                      {contact.website}
                    </a>
                  </li>
                )}
              </ul>
            </div>


            <div className="social-links">
              {socialLinks.facebook && (
                <a href={socialLinks.facebook} className="social-link facebook" target="_blank" rel="noopener noreferrer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
              )}

              {socialLinks.instagram && (
                <a href={socialLinks.instagram} className="social-link instagram" target="_blank" rel="noopener noreferrer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
              )}

              {socialLinks.youtube && (
                <a href={socialLinks.youtube} className="social-link youtube" target="_blank" rel="noopener noreferrer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                    <path d="m10 15 5-3-5-3z" />
                  </svg>
                </a>
              )}

              {socialLinks.twitter && (
                <a href={socialLinks.twitter} className="social-link twitter" target="_blank" rel="noopener noreferrer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </a>
              )}

              {socialLinks.linkedin && (
                <a href={socialLinks.linkedin} className="social-link linkedin" target="_blank" rel="noopener noreferrer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              )}

              {socialLinks.snapchat && (
                <a href={socialLinks.snapchat} className="social-link snapchat" target="_blank" rel="noopener noreferrer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2c-3.4 0-6 2.6-6 6v2.3c0 .6-.3 1.1-.8 1.4-.6.4-1.3.7-2 .9-.7.2-1.2.7-1.2 1.3 0 .7.7 1.2 1.7 1.6 1.3.5 2.2 1.2 2.8 2.1.4.6 1 .9 1.7.9h1.1c.4 0 .7.2 1 .5.5.5 1.1.8 1.7.8s1.2-.3 1.7-.8c.3-.3.6-.5 1-.5h1.1c.7 0 1.3-.3 1.7-.9.6-.9 1.5-1.6 2.8-2.1 1-.4 1.7-.9 1.7-1.6 0-.6-.5-1.1-1.2-1.3-.7-.2-1.4-.5-2-.9-.5-.3-.8-.8-.8-1.4V8c0-3.4-2.6-6-6-6z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {address && (
        <div className="map-sidebar">
          <iframe
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            width="100%"
            height="220"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            style={{ borderRadius: "10px", border: "0" }}
            allowFullScreen
          ></iframe>
        </div>
      )}
    </>
  );
};

export default ContactInfo;