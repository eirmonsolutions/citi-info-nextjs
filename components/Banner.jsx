"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Banner() {

    const router = useRouter();

    const [service, setService] = useState("");
    const [location, setLocation] = useState("");

    // ✅ AUTO DETECT USER LOCATION
    useEffect(() => {

        if (!navigator.geolocation) return;

        navigator.geolocation.getCurrentPosition(

            async (position) => {

                try {

                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;

                    // ✅ Reverse Geocode
                    const res = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
                    );

                    const data = await res.json();

                    const city =
                        data.address?.city ||
                        data.address?.town ||
                        data.address?.suburb ||
                        data.address?.state ||
                        "";

                    setLocation(city);

                } catch (error) {

                }

            },

        );

    }, []);

    // ✅ SEARCH REDIRECT
    const handleSearch = () => {

        const params = new URLSearchParams();

        if (service) {
            params.append("q", service);
        }

        if (location) {
            params.append("city", location.toLowerCase());
        }

        router.push(`/business-listings?${params.toString()}`);
    };

    // ✅ TAG CLICK
    const handleTagSearch = (tag) => {

        const params = new URLSearchParams();

        params.append("q", tag);

        if (location) {
            params.append("city", location.toLowerCase());
        }

        router.push(`/business-listings?${params.toString()}`);
    };

    return (
        <section className="hero-banner">

            <div className="hero-overlay"></div>

            <div className="container hero-inner">

                {/* Heading */}
                <h1 className="hero-title">
                    Australia Business Directory <br />
                    <span>
                        Find Local Businesses & Services Near You
                    </span>
                </h1>

                <p className="hero-subtitle">
                    Search, discover and connect with trusted local businesses across Australia.
                </p>

                {/* Search Box */}
                <div className="search-box">

                    {/* SERVICE */}
                    <div className="search-field">

                        <span className="search-icon">

                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.3-4.3" />
                            </svg>

                        </span>

                        <input
                            type="text"
                            placeholder="What service do you need?"
                            value={service}
                            onChange={(e) => setService(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSearch();
                                }
                            }}
                        />

                    </div>

                    {/* LOCATION */}
                    <div className="search-field">

                        <span className="search-icon">

                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>

                        </span>

                        <input
                            type="text"
                            placeholder="Enter location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSearch();
                                }
                            }}
                        />

                    </div>

                    {/* BUTTON */}
                    <button
                        className="search-btn"
                        onClick={handleSearch}
                    >
                        Search
                    </button>

                </div>

                {/* TAGS */}
                <div className="popular-tags">

                    <button onClick={() => handleTagSearch("Electrician")}>
                        Electrician
                    </button>

                    <button onClick={() => handleTagSearch("Plumbing")}>
                        Plumbing
                    </button>

                    <button onClick={() => handleTagSearch("Hospitals")}>
                        Hospitals
                    </button>

                    <button onClick={() => handleTagSearch("Roofing")}>
                        Roofing
                    </button>

                    <button onClick={() => handleTagSearch("Salon")}>
                        Beauty Salons & Spas
                    </button>

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