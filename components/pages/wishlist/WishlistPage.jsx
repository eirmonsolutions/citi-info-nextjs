"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { fetchWishlist } from "@/lib/api/wishlist";
import { redirectToBackendLogin } from "@/lib/authUrls";
import ListingCard from "@/components/listings/ListingCard";

export default function WishlistPage() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadWishlist = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await fetchWishlist();
      setListings(data.listings || []);
    } catch (err) {
      if (err?.status === 401) {
        redirectToBackendLogin();
        return;
      }

      setListings([]);
      setError(err?.message || "Unable to load wishlist.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
      redirectToBackendLogin();
      return;
    }

    loadWishlist();
  }, [authLoading, isAuthenticated, loadWishlist]);

  const handleRemoveFromList = (businessId) => {
    setListings((prev) => prev.filter((item) => item.id !== businessId));
  };

  if (authLoading || (loading && isAuthenticated)) {
    return (
      <section className="popular-categories wishlist-page">
        <div className="container">
          <div className="section-heading">
            <div className="section-icon">
              <Heart size={22} />
            </div>
            <div className="section-heading-info">
              <h2>My Wishlist</h2>
              <p>Loading your saved listings...</p>
            </div>
          </div>

          <div className="listing-area-front">
            <div className="row">
              {[...Array(3)].map((_, index) => (
                <div className="col-md-6 col-lg-6 col-xl-4" key={index}>
                  <div className="front-listing-box">
                    <div className="listing-skeleton-img skeleton"></div>
                    <div className="front-listing-content">
                      <div className="listing-skeleton-title skeleton"></div>
                      <div className="listing-skeleton-small skeleton"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="popular-categories wishlist-page">
      <div className="container">
        <div className="section-heading">
          <div className="section-icon">
            <Heart size={22} />
          </div>
          <div className="section-heading-info">
            <h2>My Wishlist</h2>
            <p>
              {listings.length > 0
                ? `${listings.length} saved ${listings.length === 1 ? "listing" : "listings"}`
                : "Your saved business listings"}
            </p>
          </div>
        </div>

        {error && (
          <div className="listing-empty-alert mb-4">
            {error}{" "}
            <button type="button" className="btn-link p-0 border-0 bg-transparent" onClick={loadWishlist}>
              Try again
            </button>
          </div>
        )}

        <div className="listing-area-front">
          <div className="row">
            {listings.length > 0 ? (
              listings.map((item) => (
                <ListingCard
                  key={item.id}
                  item={item}
                  onWishlistChange={handleRemoveFromList}
                />
              ))
            ) : (
              <div className="col-12">
                <div className="listing-empty-alert wishlist-empty">
                  <Heart size={40} />
                  <h3>No saved listings yet</h3>
                  <p>
                    Browse businesses and tap the heart icon to save them here.
                  </p>
                  <Link href="/business-listings" className="view-categories-btn">
                    Browse Listings <span>→</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
