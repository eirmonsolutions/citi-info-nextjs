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
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              f
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
              𝕏
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              in
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              ◎
            </a>
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
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/disclaimer">Disclaimer</Link></li>
            <li><Link href="/terms">Terms &amp; Conditions</Link></li>
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
