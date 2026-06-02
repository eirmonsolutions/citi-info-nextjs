import React from "react";
import "../../public/assets/css/AboutUsPage.css";
import Link from "next/link";


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
                            <Link href="https://citiinfo.com.au/">Citiinfo</Link> is a modern Australia business directory designed to help people easily discover trusted local businesses and services. Our platform connects users with companies across major Australian cities including Melbourne, Sydney, Brisbane, Perth, and Adelaide.
                        </p>

                        <p>
                            Whether you are searching for a reliable plumber, a nearby restaurant, a beauty salon, or a car rental service, Citiinfo helps you find the right business quickly and conveniently.
                        </p>

                        <p>
                            Our directory includes a wide range of industries such as restaurants, salons, dentists, hospitals, plumbers, real estate agencies, towing services, skip bin hire companies, and many other local service providers.
                        </p>

                        <p>
                            Citiinfo also helps businesses grow their online presence by allowing them to <Link href="https://citiinfo.com.au/add-listing"> create business listings,</Link> showcase services, display contact information, and reach more customers across Australia.
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
                                <strong>100+</strong>
                                <span>Business Listings</span>
                            </div>
                            <div className="stat-card green">
                                <IconMap />
                                <strong>50+</strong>
                                <span>Australian Locations</span>
                            </div>
                            <div className="stat-card purple">
                                <IconUsers />
                                <strong>5K+</strong>
                                <span>Monthly Visitors</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="about-section light">
                <div className="container">
                    <div className="section-center">
                        <span className="section-tag">What We Do</span>
                        <h2>How Citiinfo Helps You Connect with Local Businesses</h2>
                    </div>

                    <div className="help-grid">
                        <div className="help-card blue">
                            <IconSearch />
                            <h3>Discover Local Businesses</h3>
                            <p>Find trusted businesses, services, and professionals across Australia.</p>
                        </div>
                        <div className="help-card green">
                            <IconCompare />
                            <h3>Compare Businesses</h3>
                            <p>Compare services, ratings, business information, and contact details.</p>
                        </div>
                        <div className="help-card purple">
                            <IconHandshake />
                            <h3>Connect with Service Providers</h3>
                            <p>contact businesses through phone, email, website, social profiles, or location details</p>
                        </div>
                        <div className="help-card orange">
                            <IconMegaphone />
                            <h3>Promote Your Business</h3>
                            <p>Create a business listing on Citiinfo and increase your visibility.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="about-section">
                <div className="container">
                    <div className="section-center">
                        <span className="section-tag">Why Businesses Trust Citiinfo</span>
                        <h2>Built to Help Australian Businesses Grow</h2>
                    </div>

                    <div className="trust-grid">
                        <div className="trust-item blue">
                            <IconShield />
                            <div>
                                <h3>Easy to Search</h3>
                                <p>Find local businesses quickly and easily.</p>
                            </div>
                        </div>
                        <div className="trust-item green">
                            <IconBuilding />
                            <div>
                                <h3>Free Business Listings</h3>
                                <p>Create and manage listings for free.</p>
                            </div>
                        </div>
                        <div className="trust-item purple">
                            <IconMegaphone />
                            <div>
                                <h3>Local SEO Benefits</h3>
                                <p>Improve visibility in local search results.</p>
                            </div>
                        </div>
                        <div className="trust-item orange">
                            <IconShield />
                            <div>
                                <h3>Verified Business Information</h3>
                                <p>Accurate details for trusted business connections.</p>
                            </div>
                        </div>
                    </div>

                    <div className="mission-grid">
                        <div className="mission-card">
                            <IconMap />
                            <div>
                                <h3>Our Mission</h3>
                                <p>
                                    To make finding local businesses easier by creating a trusted online directory that connects Australian consumers with reliable service providers while helping businesses grow their digital presence.
                                </p>
                            </div>
                        </div>

                        <div className="mission-card green-bg">
                            <IconSearch />
                            <div>
                                <h3>Our Vision</h3>
                                <p>
                                    To become Australia's preferred business directory platform by helping local businesses gain visibility and making it easier for customers to discover quality services in their communities.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="about-cta">
                        <div>
                            <h2>Ready to Grow Your Business Online?</h2>
                            <p>Join thousands of Australian businesses using Citiinfo to increase visibility, attract more customers, and build a stronger local presence.</p>
                        </div>
                        <div className="cta-buttons">
                            <a href="/add-listing" className="btn-primary">+ Add Your Business</a>
                            <a href="/business-listings" className="btn-outline">Explore Business Listings</a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AboutUsPage;