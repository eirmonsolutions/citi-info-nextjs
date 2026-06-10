import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container px-2 md:px-4 site-footer-inner">
        <div className="footer-col footer-brand">
          <Link href="/" className="footer-logo">
            <img src="/assets/images/logo.png" alt="Citiinfo" />
          </Link>
          <p>
            Australia&apos;s trusted business directory. Find local businesses
            &amp; services near you.
          </p>
          <div className="footer-social">
            <Link href="https://www.facebook.com/profile.php?id=100090399916917" target="_blank" rel="noreferrer" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </Link>

            <Link href="https://www.instagram.com/citiinfoaustralia/" target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </Link>

            <Link href="https://x.com/Citiinfo1" target="_blank" rel="noreferrer" aria-label="Twitter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </Link>

            <Link href="https://au.pinterest.com/citiinfoaustralia/" target="_blank" rel="noreferrer" aria-label="Pinterest">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.42 7.63 11.17-.11-.95-.2-2.41.04-3.45.22-.94 1.41-5.98 1.41-5.98s-.36-.72-.36-1.78c0-1.67.97-2.92 2.17-2.92 1.02 0 1.51.77 1.51 1.69 0 1.03-.66 2.57-1 4-.28 1.2.6 2.18 1.78 2.18 2.14 0 3.78-2.26 3.78-5.52 0-2.89-2.07-4.91-5.03-4.91-3.43 0-5.44 2.57-5.44 5.23 0 1.04.4 2.15.9 2.75.1.12.11.22.08.34-.09.38-.3 1.2-.34 1.37-.05.22-.18.27-.41.16-1.53-.71-2.49-2.94-2.49-4.74 0-3.86 2.8-7.4 8.08-7.4 4.24 0 7.54 3.02 7.54 7.07 0 4.21-2.65 7.6-6.33 7.6-1.24 0-2.4-.64-2.8-1.4l-.76 2.9c-.28 1.08-1.03 2.43-1.53 3.25C9.52 23.87 10.74 24 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z" />
              </svg>
            </Link>

          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/business-listings">Business Listings</Link></li>
            <li><Link href="/categories">Categories</Link></li>
            <li><Link href="/about-us">About Us</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/how-it-works">How It Works</Link></li>
            <li><Link href="/contact-us">Contact Us</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Legal</h4>
          <ul>
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/disclaimer">Disclaimer</Link></li>
            <li><Link href="/terms-and-conditions">Terms &amp; Conditions</Link></li>
            <li><Link href="/faqs">FAQ</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>List Your Business</h4>
          <ul>
            <li><Link href="/add-listing">Add Free Listing</Link></li>
            <li><Link href="/login">Login</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} Citiinfo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
