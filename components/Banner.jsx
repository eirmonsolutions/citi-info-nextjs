"use client";

export default function Banner() {
    return (
        <section className="hero-banner">

            <div className="hero-overlay"></div>

            <div className="container hero-inner">

                {/* Heading */}
                <h1 className="hero-title">
                    Australia Business Directory <br />
                    <span>Find Local Businesses & Services Near You</span>
                </h1>

                <p className="hero-subtitle">
                    Search, discover and connect with trusted local businesses across Australia.
                </p>

                {/* Search Box */}
                <div className="search-box">

                    {/* Service */}
                    <div className="search-field">
                        <span className="search-icon">
                            {/* Search Icon */}
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.3-4.3" />
                            </svg>
                        </span>
                        <input type="text" placeholder="What service do you need?" />
                    </div>

                    {/* Location */}
                    <div className="search-field">
                        <span className="search-icon">
                            {/* Location Icon */}
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                        </span>
                        <input type="text" placeholder="Enter location" />
                    </div>

                    {/* Button */}
                    <button className="search-btn">Search</button>

                </div>

                {/* Popular Tags */}
                <div className="popular-tags">
                    <button>Electrician</button>
                    <button>Plumbing</button>
                    <button>Hospitals</button>
                    <button>Roofing</button>
                    <button>Salon</button>
                </div>

            </div>

            <div className="hero-wave">
                <svg
                    viewBox="0 0 1440 120"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0,60 C360,120 1080,0 1440,60 L1440,120 L0,120 Z"
                        fill="#f8fbff"
                    />
                </svg>
            </div>
        </section>
    );
}