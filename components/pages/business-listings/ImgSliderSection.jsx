"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const STORAGE_URL =
  process.env.NEXT_PUBLIC_STORAGE_URL || "http://localhost:8000/storage";

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
    </>
  );
};

export default ImgSliderSection;