"use client";

import Link from "next/link";
import { Clock, Star, MapPin } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import WishlistButton from "@/components/listings/WishlistButton";
import {
  FALLBACK_IMAGE,
  getCategoryName,
  getCityName,
  getGalleryImages,
  getImageUrl,
  getLogoUrl,
  getRating,
} from "@/lib/listingHelpers";

export default function ListingCard({ item, onWishlistChange }) {
  const galleryImages = getGalleryImages(item);
  const hasGallery = galleryImages.length > 0;
  const hasMultipleGallery = galleryImages.length > 1;

  return (
    <div className="col-md-6 col-lg-6 col-xl-4">
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
            <WishlistButton
              businessId={item.id}
              onChange={(wishlisted) => {
                if (!wishlisted && onWishlistChange) {
                  onWishlistChange(item.id);
                }
              }}
            />
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

              <div className="category-badge">{getCategoryName(item)}</div>
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
                    <p>"{item.reviews[0].comment || item.reviews[0].review}"</p>
                    <span className="testimonial-author">
                      {item.reviews[0].name}
                    </span>
                  </>
                ) : (
                  <>
                    <p>
                      "No reviews yet — be the first to share your experience
                      with {item.business_name}."
                    </p>
                    <span className="testimonial-author">No reviews yet</span>
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
}
