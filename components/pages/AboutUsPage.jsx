import React from "react";
import "../../public/assets/css/AboutUsPage.css";

const IconSearch = () => (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
        <path d="M20 20L16.5 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const IconBuilding = () => (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
        <path d="M4 21V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v16" stroke="currentColor" strokeWidth="2" />
        <path d="M9 21v-4h3v4M8 7h1M12 7h1M8 11h1M12 11h1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M17 9h1a2 2 0 0 1 2 2v10" stroke="currentColor" strokeWidth="2" />
    </svg>
);

const IconMap = () => (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
        <path d="M12 21s7-5.2 7-12A7 7 0 0 0 5 9c0 6.8 7 12 7 12Z" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" />
    </svg>
);

const IconUsers = () => (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" />
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const IconCompare = () => (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
        <path d="M7 3v18M17 3v18M4 7h6M14 7h6M5 7l2 5 2-5M15 7l2 5 2-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M4 14h6M14 14h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const IconHandshake = () => (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
        <path d="M8.5 12.5 11 15a3 3 0 0 0 4.2 0l3.3-3.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M2 12l4-4 4 4M22 12l-4-4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M6 8h4l2 2h2l4-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const IconMegaphone = () => (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
        <path d="M3 11v2a2 2 0 0 0 2 2h3l7 4V5L8 9H5a2 2 0 0 0-2 2Z" stroke="currentColor" strokeWidth="2" />
        <path d="M19 9a4 4 0 0 1 0 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const IconShield = () => (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" stroke="currentColor" strokeWidth="2" />
        <path d="m9 12 2 2 4-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const AboutUsPage = () => {
    return (
        <main className="about-page">
            <section className="about-hero">
                <div className="container about-hero-grid">
                    <div>
                        <span className="eyebrow">Australia Business Directory</span>
                        <h1>About Citiinfo</h1>
                        <p>
                            Citiinfo helps people discover trusted local businesses, compare services,
                            and connect with providers across Australia.
                        </p>

                        <div className="about-search-box">
                            <IconSearch />
                            <input placeholder="Search businesses, services or categories..." />
                            <button>Search</button>
                        </div>
                    </div>

                    <div className="hero-visual">
                        <div className="map-card">
                            <IconMap />
                            <div>
                                <strong>Find Local Services</strong>
                                <span>Fast, simple and trusted</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="about-section">
                <div className="container about-two-col">
                    <div>
                        <span className="section-tag">Who We Are</span>
                        <h2>About Citiinfo</h2>
                        <p>
                            Citiinfo is a modern Australian business directory designed to help users
                            easily discover trusted local businesses and services.
                        </p>
                        <p>
                            Whether you are searching for a plumber, restaurant, beauty salon,
                            real estate agency, hospital, dentist, or skip bin hire company,
                            Citiinfo helps you find the right business quickly.
                        </p>
                        <p>
                            For business owners, Citiinfo provides a simple way to create listings,
                            showcase services, display contact details, and reach more local customers.
                        </p>
                    </div>

                    <div>
                        <div className="about-image-card">
                            <img
                                src="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=900&q=80"
                                alt="Australia city"
                            />
                        </div>

                        <div className="stats-grid">
                            <div className="stat-card blue">
                                <IconBuilding />
                                <strong>10K+</strong>
                                <span>Local Businesses</span>
                            </div>
                            <div className="stat-card green">
                                <IconMap />
                                <strong>50+</strong>
                                <span>Australian Cities</span>
                            </div>
                            <div className="stat-card purple">
                                <IconUsers />
                                <strong>25K+</strong>
                                <span>Growing Users</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="about-section light">
                <div className="container">
                    <div className="section-center">
                        <span className="section-tag">What We Do</span>
                        <h2>How Citiinfo Helps You</h2>
                    </div>

                    <div className="help-grid">
                        <div className="help-card blue">
                            <IconSearch />
                            <h3>Discover Local Businesses</h3>
                            <p>Find trusted businesses near you across multiple categories.</p>
                        </div>
                        <div className="help-card green">
                            <IconCompare />
                            <h3>Compare Services</h3>
                            <p>Compare ratings, services, and business details before choosing.</p>
                        </div>
                        <div className="help-card purple">
                            <IconHandshake />
                            <h3>Connect With Providers</h3>
                            <p>Reach businesses quickly through phone, email, website, or address.</p>
                        </div>
                        <div className="help-card orange">
                            <IconMegaphone />
                            <h3>Promote Your Business</h3>
                            <p>Create a listing and improve your local online visibility.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="about-section">
                <div className="container">
                    <div className="section-center">
                        <span className="section-tag">Why Businesses Trust Citiinfo</span>
                        <h2>Built for Local. Built for Growth.</h2>
                    </div>

                    <div className="trust-grid">
                        <div className="trust-item blue">
                            <IconShield />
                            <div>
                                <h3>Easy to Search</h3>
                                <p>Simple and user-friendly browsing for everyone.</p>
                            </div>
                        </div>
                        <div className="trust-item green">
                            <IconBuilding />
                            <div>
                                <h3>Free Business Listings</h3>
                                <p>Businesses can create and manage profiles easily.</p>
                            </div>
                        </div>
                        <div className="trust-item purple">
                            <IconMegaphone />
                            <div>
                                <h3>Local SEO Support</h3>
                                <p>Improve visibility and get discovered by local customers.</p>
                            </div>
                        </div>
                        <div className="trust-item orange">
                            <IconShield />
                            <div>
                                <h3>Verified Details</h3>
                                <p>Accurate business information for trusted connections.</p>
                            </div>
                        </div>
                    </div>

                    <div className="mission-grid">
                        <div className="mission-card">
                            <IconMap />
                            <div>
                                <h3>Our Mission</h3>
                                <p>
                                    To create a reliable local business discovery platform that helps
                                    people find trusted services while supporting businesses online.
                                </p>
                            </div>
                        </div>

                        <div className="mission-card green-bg">
                            <IconSearch />
                            <div>
                                <h3>Our Vision</h3>
                                <p>
                                    To become one of Australia’s leading business directories,
                                    helping customers quickly connect with reliable local providers.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="about-cta">
                        <div>
                            <h2>Ready to grow your local visibility?</h2>
                            <p>Join Australian businesses already listed on Citiinfo.</p>
                        </div>
                        <div className="cta-buttons">
                            <a href="/add-listing" className="btn-primary">+ Add Your Business</a>
                            <a href="/business-listings" className="btn-outline">Browse Listings</a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AboutUsPage;