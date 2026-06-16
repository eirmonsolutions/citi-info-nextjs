"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutGrid,
  Info,
  SquarePen,
  PhoneCall,
  CircleQuestionMark,
  Settings,
  FileText,
  ShieldCheck,
  ChevronDown,
  MessageSquare,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  getBackendLoginUrl,
  getBackendRegisterUrl,
  getMessagesUrl,
} from "@/lib/authUrls";
import { getUserDisplayName, getUserInitials } from "@/lib/userDisplay";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const { user, isAuthenticated, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [resourceOpen, setResourceOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const isActive = (path) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const isResourceActive = [
    "/about-us",
    "/blog",
    "/contact-us",
    "/faqs",
    "/how-it-works",
    "/terms-and-conditions",
    "/privacy-policy",
    "/disclaimer",
  ].some((path) => pathname.startsWith(path));

  const userName = getUserDisplayName(user);
  const userInitials = getUserInitials(user);

  const handleLogout = async () => {
    await logout();
    setUserOpen(false);
    router.push("/");
  };

  return (
    <header className="site-header">
      <div className="header-top">
        <div className="container header-top-inner">
          <Link href="/" className="logo">
            <img src="/assets/images/logo.png" alt="Citiinfo" />
          </Link>

          <div className="header-actions">
            <Link href="/add-listing" className="btn-add">
              <span className="icon">+</span>
              Add Listing
            </Link>

            {isAuthenticated && user ? (
              <div
                className={`dashboard-right-header user-dd ${userOpen ? "open" : ""}`}
              >
                {user.avatar ? (
                  <div className="profile-img">
                    <img
                      src={user.avatar}
                      alt={userName}
                    />
                  </div>
                ) : (
                  <div className="profile-box">
                    {userInitials}
                  </div>
                )}

                <button
                  type="button"
                  className="dropdown-trigger"
                  onClick={() => setUserOpen(!userOpen)}
                  aria-expanded={userOpen}
                >
                  <span className="user-name">
                    {userName}
                  </span>

                  <span className="chev">
                    <ChevronDown size={18} />
                  </span>
                </button>

                <div className="dropdown-menu-user">
                  <div className="dd-profile">
                    <div className="dd-profile-initials">
                      {userInitials}
                    </div>
                    <div>
                      <strong>{userName}</strong>
                    </div>
                  </div>

                  <div className="dd-divider"></div>

                  <a
                    href={getMessagesUrl(user)}
                    className="dd-item"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageSquare size={16} />
                    Messages
                  </a>

                  {user.dashboard_url && (
                    <a
                      href={user.dashboard_url}
                      className="dd-item"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Dashboard
                    </a>
                  )}

                  <div className="dd-divider"></div>

                  <button
                    type="button"
                    className="dd-item dd-danger"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="header-auth-buttons">
                <a href={getBackendLoginUrl()} className="btn-login">
                  Login
                </a>
                <a href={getBackendRegisterUrl()} className="btn-register">
                  Register
                </a>
              </div>
            )}

            <button
              type="button"
              className="menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>

      <nav className={`main-nav ${menuOpen ? "show" : ""}`}>
        <div className="container nav-inner">
          <Link href="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>
            <span className="icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              </svg>
            </span>
            Home
          </Link>

          <Link
            href="/business-listings"
            className={`nav-link ${isActive("/business-listings") ? "active" : ""}`}
          >
            <span className="icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
                <path d="M16 13H8" />
                <path d="M16 17H8" />
              </svg>
            </span>
            Business Listings
          </Link>

          <Link
            href="/categories"
            className={`nav-link ${isActive("/categories") ? "active" : ""}`}
          >
            <span className="icon">
              <LayoutGrid size={18} />
            </span>
            Categories
          </Link>

          <div className="nav-dropdown">
            <button
              type="button"
              className={`nav-link dropdown-btn ${isResourceActive ? "active" : ""}`}
              onClick={() => setResourceOpen(!resourceOpen)}
            >
              <span className="icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </svg>
              </span>
              Resources
              <svg className="dropdown-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            <div className={`dropdown-menu-custom ${resourceOpen ? "show" : ""}`}>
              <Link href="/about-us"><span className="dd-icon"><Info size={18} /></span>About Us</Link>
              <Link href="/blog"><span className="dd-icon"><SquarePen size={18} /></span>Blog</Link>
              <Link href="/contact-us"><span className="dd-icon"><PhoneCall size={18} /></span>Contact Us</Link>
              <Link href="/faqs"><span className="dd-icon"><CircleQuestionMark size={18} /></span>FAQs</Link>
              <Link href="/how-it-works"><span className="dd-icon"><Settings size={18} /></span>How It Works</Link>
              <Link href="/terms-and-conditions"><span className="dd-icon"><FileText size={18} /></span>Terms & Conditions</Link>
              <Link href="/privacy-policy"><span className="dd-icon"><ShieldCheck size={18} /></span>Privacy Policy</Link>
              <Link href="/disclaimer"><span className="dd-icon"><Info size={18} /></span>Disclaimer</Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
