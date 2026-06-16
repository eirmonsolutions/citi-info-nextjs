"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { redirectToBackendLogin } from "@/lib/authUrls";

export default function WishlistButton({ businessId, className = "", onChange }) {
  const { isAuthenticated, isWishlisted, toggleWishlist } = useAuth();
  const [pending, setPending] = useState(false);

  const active = isWishlisted(businessId);

  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      redirectToBackendLogin();
      return;
    }

    if (pending) return;

    setPending(true);

    const wasActive = active;

    try {
      const data = await toggleWishlist(businessId);
      const wishlisted =
        data?.saved ?? data?.wishlisted ?? data?.is_wishlisted ?? !wasActive;

      if (onChange) {
        onChange(wishlisted);
      }
    } catch {
      // state reverted in context
    } finally {
      setPending(false);
    }
  };

  return (
    <button
      type="button"
      className={`action-btn wishlist-btn ${active ? "active" : ""} ${className}`.trim()}
      onClick={handleClick}
      disabled={pending}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={active}
    >
      <Heart size={22} fill={active ? "currentColor" : "none"} />
    </button>
  );
}
