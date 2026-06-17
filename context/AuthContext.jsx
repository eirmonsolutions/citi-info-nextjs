"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  apiFetch,
  clearToken,
  ensureCsrfCookie,
  getBackendBase,
  getToken,
  parseAuthUser,
} from "@/lib/api";
import { logoutUser } from "@/lib/api/auth";

const AuthContext = createContext(null);

function getCsrfFromCookie() {
  const match = document.cookie.match(/(?:^|;\s*)XSRF-TOKEN=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async () => {
    try {
      if (!getToken()) {
        await ensureCsrfCookie();
      }

      const data = await apiFetch("/auth/profile");
      const profileUser = parseAuthUser(data);
      setUser(profileUser);
    } catch (error) {
      if (error?.status === 401 || error?.status === 403) {
        clearToken();
        setUser(null);
      } else if (process.env.NODE_ENV !== "production") {
        console.warn("[auth] profile sync failed:", error);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();

    const syncSession = () => {
      loadProfile();
    };

    window.addEventListener("focus", syncSession);
    window.addEventListener("pageshow", syncSession);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        syncSession();
      }
    });

    return () => {
      window.removeEventListener("focus", syncSession);
      window.removeEventListener("pageshow", syncSession);
    };
  }, [loadProfile]);

  const logout = useCallback(async () => {
    try {
      if (getToken()) {
        await logoutUser();
      } else {
        await ensureCsrfCookie();
        const csrf = getCsrfFromCookie();

        await fetch(`${getBackendBase()}/logout`, {
          method: "POST",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
            ...(csrf ? { "X-XSRF-TOKEN": csrf } : {}),
          },
        });
      }
    } catch {
      // ignore network errors on logout
    }

    clearToken();
    setUser(null);
  }, []);

  const updateUserWishlist = useCallback((businessId, wishlisted, wishlistCount, wishlistIds) => {
    setUser((prev) => {
      if (!prev) return prev;

      const ids =
        wishlistIds ??
        (wishlisted
          ? [...new Set([...(prev.wishlist_ids || []), businessId])]
          : (prev.wishlist_ids || []).filter((id) => id !== businessId));

      return {
        ...prev,
        wishlist_ids: ids,
        wishlist_count:
          wishlistCount ??
          (wishlisted
            ? (prev.wishlist_count || 0) + 1
            : Math.max(0, (prev.wishlist_count || 0) - 1)),
      };
    });
  }, []);

  const toggleWishlist = useCallback(
    async (businessId) => {
      if (!user) return null;

      const wasWishlisted = (user.wishlist_ids || []).includes(businessId);
      const previousUser = user;

      updateUserWishlist(businessId, !wasWishlisted);

      try {
        const data = await apiFetch("/wishlist/toggle", {
          method: "POST",
          body: JSON.stringify({ business_id: businessId }),
        });

        const wishlisted =
          data.wishlisted ?? data.is_wishlisted ?? data.saved ?? !wasWishlisted;

        updateUserWishlist(
          businessId,
          wishlisted,
          data.wishlist_count,
          data.wishlist_ids
        );

        return data;
      } catch (error) {
        setUser(previousUser);
        throw error;
      }
    },
    [user, updateUserWishlist]
  );

  const isWishlisted = useCallback(
    (businessId) => (user?.wishlist_ids || []).includes(businessId),
    [user]
  );

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: !!user,
      logout,
      loadProfile,
      toggleWishlist,
      isWishlisted,
    }),
    [user, loading, logout, loadProfile, toggleWishlist, isWishlisted]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
