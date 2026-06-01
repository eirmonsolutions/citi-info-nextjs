"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
} from "lucide-react";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace("/api", "");

const LOGIN_URL =
  process.env.NEXT_PUBLIC_LOGIN_URL ||
  "https://api.citiinfo.com.au/login";

export default function Header() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [resourceOpen, setResourceOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [authUser, setAuthUser] = useState(null);

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
    "/terms",
    "/privacy",
    "/disclaimer",
  ].some((path) => pathname.startsWith(path));

  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${BASE_URL}/api/auth-user`, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          cache: "no-store",
        });

        const data = await res.json();

        if (data.authenticated) {
          setAuthUser(data.user);
        } else {
          setAuthUser(null);
        }
      } catch (error) {
        setAuthUser(null);
      }
    };

    fetchAuthUser();
  }, []);

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`${BASE_URL}/api/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
    } catch (error) { }

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";
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

            {authUser ? (
              <div className={`dashboard-right-header user-dd ${userOpen ? "open" : ""}`}>
                {authUser.avatar ? (
                  <div className="profile-img">
                    <img src={authUser.avatar} alt={authUser.display_name} />
                  </div>
                ) : (
                  <div className="profile-box">
                    {authUser.initials || "U"}
                  </div>
                )}

                <button
                  type="button"
                  className="dropdown-trigger"
                  onClick={() => setUserOpen(!userOpen)}
                  aria-expanded={userOpen}
                >
                  <span className="user-name">
                    {authUser.display_name || "User"}
                  </span>

                  <span className="chev">
                    <ChevronDown size={18} />
                  </span>
                </button>

                <div className="dropdown-menu-user">
                  <a href={authUser.dashboard_url} className="dd-item">
                    Dashboard
                  </a>

                  <a href="#" className="dd-item">
                    My Profile
                  </a>

                  <a href="#" className="dd-item">
                    Wishlist ({authUser.wishlist_count || 0})
                  </a>

                  <a href="#" className="dd-item">
                    Notifications
                  </a>

                  <a href="#" className="dd-item">
                    Settings
                  </a>

                  <div className="dd-divider"></div>

                  <button
                    type="button"
                    className="dd-item dd-danger"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link href={LOGIN_URL} className="btn-login">
                Login
              </Link>
            )}

            <button
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
              <Link href="/terms"><span className="dd-icon"><FileText size={18} /></span>Terms & Conditions</Link>
              <Link href="/privacy"><span className="dd-icon"><ShieldCheck size={18} /></span>Privacy Policy</Link>
              <Link href="/disclaimer"><span className="dd-icon"><Info size={18} /></span>Disclaimer</Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}