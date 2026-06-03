"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import { LayoutGrid, List, Heart, Clock, Star, MapPin } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL;

const STORAGE_URL =
  process.env.NEXT_PUBLIC_STORAGE_URL;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL;

const FALLBACK_IMAGE = `${SITE_URL}/assets/images/no-image.png`;

const FALLBACK_LOGO = `${SITE_URL}/assets/images/favicon.jpg`;

const BusinessListingContent = ({
  categorySlug = "",
  categoryName = "",
  limit = 12,
  hideFilters = false,
  hidePagination = false,
  showViewAll = false,
}) => {
  const [listings, setListings] = useState([]);
  const [pagination, setPagination] = useState({});
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name_asc");
  const [page, setPage] = useState(1);
  const [view, setView] = useState("grid");
  const [loading, setLoading] = useState(true);

  const isCategoryPage = !!categoryName;
  const firstLoad = useRef(true);
  const skipScrollOnPageChange = useRef(true);
  const listingsSectionRef = useRef(null);

  const [city, setCity] = useState("");
  const [querySearch, setQuerySearch] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setCity(params.get("city") || "");
    setQuerySearch(params.get("q") || "");
  }, []);

  const getImageUrl = (path, fallback = FALLBACK_IMAGE) => {
    if (!path) return fallback;
    const cleanPath = String(path).replace(/^\/+/, "");
    if (cleanPath.startsWith("http")) return cleanPath;
    if (cleanPath.startsWith("storage/")) return `${SITE_URL}/${cleanPath}`;
    if (cleanPath.startsWith("business/gallery/")) return `${STORAGE_URL}/${cleanPath}`;
    if (cleanPath.startsWith("business/logo/")) return `${STORAGE_URL}/${cleanPath}`;
    return `${STORAGE_URL}/business/gallery/${cleanPath}`;
  };

  const getLogoUrl = (item) => {
    if (!item.logo) return FALLBACK_LOGO;

    const cleanLogo = String(item.logo).replace(/^\/+/, "");

    if (cleanLogo.startsWith("http")) return cleanLogo;

    if (cleanLogo.startsWith("storage/")) {
      return `${SITE_URL}/${cleanLogo}`;
    }

    if (cleanLogo.startsWith("business/")) {
      return `${STORAGE_URL}/${cleanLogo}`;
    }

    return `${STORAGE_URL}/${cleanLogo}`;
  };

  const getGalleryImages = (item) => {
    if (!item.gallery || !Array.isArray(item.gallery)) return [];
    return item.gallery;
  };

  const getListingFeatures = (item) => {
    const features = item?.features || [];
    return features
      .filter((feat) => feat?.feature_name?.trim() || feat?.feature_image)
      .slice(0, 8);
  };

  const getFeatureImageUrl = (feat) => {
    const img = feat?.feature_image;
    if (!img) return "";
    const clean = String(img).replace(/^\/+/, "");
    if (clean.startsWith("http")) return clean;
    if (clean.startsWith("storage/")) return `${SITE_URL}/${clean}`;
    return `${STORAGE_URL}/${clean}`;
  };

  const changePage = (pageNumber) => {
    skipScrollOnPageChange.current = false;
    setPage(pageNumber);
  };

  const getCategoryName = (item) => {
    return item.category_rel?.name || item.categoryRel?.name || item.category_rel?.title || item.category || "Business";
  };

  const getCityName = (item) => {
    return item.city_rel?.name || item.cityRel?.name || item.city || "Australia";
  };

  const getRating = (item) => {
    if (item.reviews_avg_rating) return Number(item.reviews_avg_rating).toFixed(1);

    if (item.reviews?.length > 0) {
      const total = item.reviews.reduce(
        (sum, review) => sum + Number(review.rating || 0),
        0
      );
      return (total / item.reviews.length).toFixed(1);
    }

    return "0.0";
  };

  const fetchListings = async (
    searchValue = search,
    sortValue = sort,
    pageValue = page
  ) => {
    try {
      setLoading(true);

      const url = `${API_URL}/listings?q=${encodeURIComponent(
        searchValue
      )}&sort=${sortValue}&page=${pageValue}&category_slug=${categorySlug}&city=${encodeURIComponent(
        city
      )}&per_page=${limit}`;

      const res = await fetch(url, { cache: "no-store" });

      if (!res.ok) {
        setListings([]);
        setPagination({});
        return;
      }

      const result = await res.json();

      setListings(result.data || []);
      setPagination(result.pagination || {});
    } catch (error) {
      setListings([]);
      setPagination({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setSearch(querySearch);
    setPage(1);
    fetchListings(querySearch, "name_asc", 1);
  }, [city, querySearch]);

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }

    const delaySearch = setTimeout(() => {
      setPage(1);
      fetchListings(search, sort, 1);
    }, 350);

    return () => clearTimeout(delaySearch);
  }, [search]);

  useEffect(() => {
    if (firstLoad.current) return;
    fetchListings(search, sort, page);
  }, [sort, page]);

  useEffect(() => {
    if (skipScrollOnPageChange.current || loading) return;

    const scrollTarget = listingsSectionRef.current;

    if (scrollTarget) {
      const top =
        scrollTarget.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [page, loading]);

  const noResultText = querySearch || search || city || categoryName || "your search";

  return (
    <section className="popular-categories" ref={listingsSectionRef}>
      <div className="container">
        {!isCategoryPage && (
          <div className="section-heading">
            <div className="section-icon">☆</div>
            <div className="section-heading-info">
              <h2>Explore Top Rated Business Listings in Australia</h2>
              <p>
                {loading
                  ? "Loading listings..."
                  : `Showing ${pagination?.total || listings.length} listings`}
              </p>
            </div>
          </div>
        )}

        {!hideFilters && (
          <div className="category-filter-bar">
            <input
              type="text"
              placeholder="Search business..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="right-filter">
              <label htmlFor="sort">Sort By:</label>

              <select
                id="sort"
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setPage(1);
                }}
              >
                <option value="name_asc">Name (A-Z)</option>
                <option value="name_desc">Name (Z-A)</option>
                <option value="date_asc">Date Oldest</option>
                <option value="date_desc">Date Newest</option>
              </select>

              <div className="view-switcher">
                <button
                  type="button"
                  className={view === "grid" ? "active" : ""}
                  onClick={() => setView("grid")}
                >
                  <LayoutGrid size={18} />
                </button>

                <button
                  type="button"
                  className={view === "list" ? "active" : ""}
                  onClick={() => setView("list")}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        <div className={`listing-area-front ${view === "list" ? "listing-list-view" : ""}`}>
          <div className="row">
            {loading ? (
              [...Array(6)].map((_, index) => (
                <div className="col-md-6 col-lg-6 col-xl-4" key={index}>
                  <div className="front-listing-box">
                    <div className="listing-skeleton-img skeleton"></div>
                    <div className="front-listing-content">
                      <div className="listing-skeleton-title skeleton"></div>
                      <div className="listing-skeleton-small skeleton"></div>
                      <div className="listing-skeleton-review skeleton"></div>
                      <div className="listing-skeleton-location skeleton"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : listings.length > 0 ? (
              (listings || []).map((item) => {
                const galleryImages = getGalleryImages(item);
                const hasGallery = galleryImages.length > 0;
                const hasMultipleGallery = galleryImages.length > 1;
                const listingFeatures = getListingFeatures(item);

                return (
                  <div
                    className={
                      view === "grid"
                        ? "col-md-6 col-lg-6 col-xl-4"
                        : "col-md-12"
                    }
                    key={item.id}
                  >
                    <div className="front-listing-box">
                      <div className="front-listing-img">
                        <div className="listing-slider-wrapper">
                          {hasGallery ? (
                            hasMultipleGallery ? (
                              <Swiper
                                modules={[Autoplay]}
                                spaceBetween={0}
                                slidesPerView={1}
                                autoplay={{
                                  delay: 5000,
                                  disableOnInteraction: false,
                                }}
                                loop={true}
                              >
                                {galleryImages.map((image, index) => (
                                  <SwiperSlide key={index}>
                                    <img
                                      src={getImageUrl(image.image_path)}
                                      className="slide-img"
                                      alt={item.business_name}
                                      loading="lazy"
                                    />
                                  </SwiperSlide>
                                ))}
                              </Swiper>
                            ) : (
                              <img
                                src={getImageUrl(galleryImages[0].image_path)}
                                className="slide-img"
                                alt={item.business_name}
                                loading="lazy"
                              />
                            )
                          ) : (
                            <img
                              src={FALLBACK_IMAGE}
                              className="slide-img"
                              alt={item.business_name}
                              loading="lazy"
                            />
                          )}
                        </div>

                        <div className="image-overlay"></div>

                        <div className="action-buttons">
                          <button className="action-btn wishlist-btn" type="button">
                            <Heart size={22} />
                          </button>
                        </div>

                        <div className="status-badge open close">
                          <Clock size={22} />
                          Open Now
                        </div>
                      </div>

                      <div className="front-listing-content">
                        <div className="front-listing-header">
                          <div className="front-listing-title">
                            <h3>
                              {item.slug ? (
                                <Link href={`/business-listings/${item.slug}`}>
                                  {item.business_name}
                                </Link>
                              ) : (
                                <span>{item.business_name}</span>
                              )}
                            </h3>
                          </div>

                          <div className="front-listing-info">
                            <div className="front-listing-meta">
                              <div className="rating">
                                <Star size={18} />
                                <span>{getRating(item)}</span>
                              </div>
                            </div>

                            <div className="category-badge">
                              {getCategoryName(item)}
                            </div>
                          </div>
                        </div>

                        <div className="testimonial">
                          <div className="testimonial-content">
                            <img
                              src={getLogoUrl(item)}
                              alt={item.business_name}
                              className="testimonial-avatar"
                            />

                            <div className="testimonial-text">
                              {item.reviews?.length > 0 ? (
                                <>
                                  <p>"{item.reviews[0].comment}"</p>
                                  <span className="testimonial-author">
                                    {item.reviews[0].name}
                                  </span>
                                </>
                              ) : (
                                <>
                                  <p>
                                    "No reviews yet — be the first to share your
                                    experience with {item.business_name}."
                                  </p>
                                  <span className="testimonial-author">
                                    No reviews yet
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="location">
                          <MapPin size={18} />
                          <span>{getCityName(item)}</span>
                        </div>

                        {/* {listingFeatures.length > 0 && (
                          <div className="listing-card-features">
                            {listingFeatures.map((feat, featIndex) => {
                              const featureImg = getFeatureImageUrl(feat);

                              return (
                                <span
                                  className="listing-feature-chip"
                                  key={feat.id || featIndex}
                                  title={feat.feature_name}
                                >
                                  {featureImg ? (
                                    <img
                                      src={featureImg}
                                      alt={feat.feature_name || "Feature"}
                                      loading="lazy"
                                    />
                                  ) : null}
                                  <span className="listing-feature-name">
                                    {feat.feature_name}
                                  </span>
                                </span>
                              );
                            })}
                          </div>
                        )} */}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-12">
                <div className="listing-empty-alert">
                  No listings found for <strong>{noResultText}</strong>.
                </div>
              </div>
            )}
          </div>
        </div>

        {showViewAll && (
          <div className="text-center mt-4">
            <Link href="/business-listings" className="view-categories-btn">
              View All Listings <span>→</span>
            </Link>
          </div>
        )}

        {!hideFilters && !loading && listings.length > 0 && (
          <div id="paginationWrapper">
            <div className="pagination-wrap">
              <nav aria-label="Category Pagination">
                <ul className="pagination">
                  <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                    <button
                      className="page-link"
                      onClick={() => page > 1 && changePage(page - 1)}
                    >
                      «
                    </button>
                  </li>

                  {Array.from({ length: pagination.last_page || 1 }).map((_, i) => {
                    const pageNumber = i + 1;

                    return (
                      <li
                        key={pageNumber}
                        className={`page-item ${page === pageNumber ? "active" : ""}`}
                      >
                        <button
                          className="page-link"
                          onClick={() => changePage(pageNumber)}
                        >
                          {pageNumber}
                        </button>
                      </li>
                    );
                  })}

                  <li
                    className={`page-item ${page === pagination.last_page || !pagination.last_page
                      ? "disabled"
                      : ""
                      }`}
                  >
                    <button
                      className="page-link"
                      onClick={() =>
                        page < pagination.last_page && changePage(page + 1)
                      }
                    >
                      »
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BusinessListingContent;