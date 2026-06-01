"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const STORAGE_URL = "http://localhost:8000/storage";

const ImgSliderSection = ({ listing }) => {
  const galleryImages =
    listing?.gallery?.map((item) => {
      const img = item.image || item.image_path || item.file || item.path;

      if (!img) return null;

      return img.startsWith("http") ? img : `${STORAGE_URL}/${img}`;
    }).filter(Boolean) || [];

  const images =
    galleryImages.length > 0
      ? galleryImages
      : ["/assets/img/default-business-banner.jpg"];

  return (
    <>
      <div className="detail-slider">
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          loop={images.length > 1}
          speed={800}
          observer={true}
          observeParents={true}
          updateOnWindowResize={true}
          autoplay={
            images.length > 1
              ? {
                delay: 5000,
                disableOnInteraction: false,
              }
              : false
          }
          pagination={
            images.length > 1
              ? {
                clickable: true,
              }
              : false
          }
          className="business-detail-slider"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="slide-inner">
                <img
                  src={img}
                  alt={`${listing?.business_name || "Business"} gallery ${index + 1
                    }`}
                  className="slider-img"
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx>{`
        .detail-slider {
          width: 100%;
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          margin-bottom: 30px;
          background: #f3f4f6;
        }

        :global(.business-detail-slider) {
          width: 100%;
          height: 100%;
          display: block;
        }

        :global(.business-detail-slider .swiper-wrapper) {
          align-items: stretch;
        }

        :global(.business-detail-slider .swiper-slide) {
          width: 100%;
          height: auto;
          overflow: hidden;
          border-radius: 20px;
        }

        .slide-inner {
          position: relative;
          width: 100%;
          height: 460px;
          overflow: hidden;
          border-radius: 20px;
        }

        .slider-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          border-radius: 20px;
        }

        :global(.swiper-pagination) {
          bottom: 18px !important;
        }

        :global(.swiper-pagination-bullet) {
          width: 45px;
          height: 4px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.6);
          opacity: 1;
          transition: all 0.3s ease;
        }

        :global(.swiper-pagination-bullet-active) {
          width: 70px;
          background: #0d6efd;
        }

        @media (max-width: 768px) {
          .slide-inner {
            height: 250px;
          }

          :global(.swiper-pagination-bullet) {
            width: 30px;
          }

          :global(.swiper-pagination-bullet-active) {
            width: 50px;
          }
        }
      `}</style>
    </>
  );
};

export default ImgSliderSection;