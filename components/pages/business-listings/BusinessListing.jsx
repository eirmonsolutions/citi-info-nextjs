"use client";

import React, { useEffect, useRef, useState } from "react";
import { LayoutGrid, List, Heart, Clock, Star, MapPin } from "lucide-react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const API_URL = "http://127.0.0.1:8000/api";
const STORAGE_URL = "http://127.0.0.1:8000/storage";
const FALLBACK_IMAGE = "https://citiinfo.com.au/assets/images/no-image.png";
const FALLBACK_LOGO = "https://citiinfo.com.au/assets/images/favicon.jpg";

const BusinessListing = () => {
  const [listings, setListings] = useState([]);
  const [pagination, setPagination] = useState({});
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name_asc");
  const [page, setPage] = useState(1);
  const [view, setView] = useState("grid");

  const firstLoad = useRef(true);

  const getImageUrl = (path, fallback = FALLBACK_IMAGE) => {
    if (!path) return fallback;

    const cleanPath = String(path).replace(/^\/+/, "");

    if (cleanPath.startsWith("http")) return cleanPath;

    if (cleanPath.startsWith("storage/")) {
      return `http://127.0.0.1:8000/${cleanPath}`;
    }

    if (cleanPath.startsWith("business/gallery/")) {
      return `${STORAGE_URL}/${cleanPath}`;
    }

    if (cleanPath.startsWith("business/logo/")) {
      return `${STORAGE_URL}/${cleanPath}`;
    }

    return `${STORAGE_URL}/business/gallery/${cleanPath}`;
  };

  const getLogoUrl = (item) => {
    if (!item.logo) return FALLBACK_LOGO;

    const cleanLogo = String(item.logo).replace(/^\/+/, "");

    if (cleanLogo.startsWith("http")) return cleanLogo;
    if (cleanLogo.startsWith("storage/")) return `http://127.0.0.1:8000/${cleanLogo}`;
    if (cleanLogo.startsWith("business/")) return `${STORAGE_URL}/${cleanLogo}`;

    return `${STORAGE_URL}/${cleanLogo}`;
  };

  const getGalleryImages = (item) => {
    // console.log("Getting", item.gallery);
    if (!item.gallery || !Array.isArray(item.gallery)) return [];



    return item.gallery;
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
      const res = await fetch(
        `${API_URL}/listings?q=${encodeURIComponent(searchValue)}&sort=${sortValue}&page=${pageValue}`,
        { cache: "no-store" }
      );

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
    }
  };

  useEffect(() => {
    fetchListings("", "name_asc", 1);
  }, []);

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

  return (
    <section className="popular-categories">
      <div className="container">
        <div className="section-heading">
          <div className="section-icon">☆</div>
          <div>
            <h2>Explore Top Rated Business Listings in Australia</h2>
            <p>Showing {pagination.total || 0} listings</p>
          </div>
        </div>

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
                title="Grid View"
              >
                <LayoutGrid size={18} />
              </button>

              <button
                type="button"
                className={view === "list" ? "active" : ""}
                onClick={() => setView("list")}
                title="List View"
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className={`listing-area-front ${view === "list" ? "listing-list-view" : ""}`}>
          <div className="row">
            {listings.length > 0 ? (
              listings.map((item) => {
                const galleryImages = getGalleryImages(item);



                const hasGallery = galleryImages.length > 0;
                const hasMultipleGallery = galleryImages.length > 1;

                console.log("Gallery Images for", hasGallery, hasMultipleGallery);

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
                          {console.log("Gallery Images for", item.business_name, hasGallery)}
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
                                    {console.log("Rendering image for", item.business_name, image)}
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
                              alt={item.business_name || "No image"}
                              loading="lazy"
                            />
                          )}
                        </div>

                        <div className="image-overlay"></div>

                        <div className="action-buttons">
                          <button
                            className="action-btn wishlist-btn"
                            type="button"
                            title="Save"
                            data-business-id={item.id}
                          >
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
                              <Link href={`/business-listings/${item.slug}`}>
                                {item.business_name}
                              </Link>
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
                              loading="lazy"
                            />

                            <div className="testimonial-text">
                              {item.reviews?.length > 0 ? (
                                <>
                                  <p>
                                    "{item.reviews[0].comment || "Great business listing."}"
                                  </p>
                                  <span className="testimonial-author">
                                    {item.reviews[0].name || "Customer Review"}
                                  </span>
                                </>
                              ) : (
                                <>
                                  <p>
                                    "No reviews yet — be the first to share your experience with {item.business_name}. Your feedback helps others choose with confidence."
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
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-12">
                <p>No listings found.</p>
              </div>
            )}
          </div>
        </div>

        <div id="paginationWrapper">
          <div className="pagination-wrap">
            <nav aria-label="Category Pagination">
              <ul className="pagination">
                <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => page > 1 && setPage(page - 1)}
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
                        onClick={() => setPage(pageNumber)}
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
                      page < pagination.last_page && setPage(page + 1)
                    }
                  >
                    »
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessListing;