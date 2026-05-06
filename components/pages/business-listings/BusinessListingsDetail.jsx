"use client";

import React, { useState } from "react";
import { Star, MapPin, X, Tag, ChevronDown, ChevronUp } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Link from "next/link";

import "swiper/css";
import "swiper/css/pagination";

const BusinessListingsDetail = ({ slug }) => {

  const [openHours, setOpenHours] = useState(false);

  const businessHours = [
    { day: "Monday", time: "10:00 am – 6:00 pm" },
    { day: "Tuesday", time: "10:00 am – 6:00 pm" },
    { day: "Wednesday", time: "10:00 am – 6:00 pm", today: true },
    { day: "Thursday", time: "10:00 am – 6:00 pm" },
    { day: "Friday", time: "10:00 am – 6:00 pm" },
    { day: "Saturday", time: "Closed", closed: true },
    { day: "Sunday", time: "Closed", closed: true },
  ];

  // Example Images
  const images = [
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
  ];

  return (
    <>
      <section className="profile-details">
        <div className="container">
          <div className="profile-wrapper">
            <div className="profile-detail-area">
              <div className="profile-img">
                <img
                  src="https://citiinfo.com.au/storage/business/logo/DUUrTYgDLX9aXhYMKekVPP1XuTZiea5l9wgNTXTG.jpg"
                  alt=""
                />
              </div>

              <div className="profile-content">
                <div className="profile-name">
                  <h1>Bris Towing</h1>
                </div>

                <div className="profile-reviews-area">
                  <ul>
                    <li>
                      <Star size={18} />
                      <span className="profile-review-number">0.0</span>
                      <span className="profile-review-count">
                        (No ratings)
                      </span>
                    </li>

                    <li>
                      <MapPin size={18} />
                      <span className="profile-review-count">
                        Brisbane, Queensland, Australia
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="listing-details-area">
        <div className="container">
          <div className="row g-3">

            <div className="col-lg-12 col-xl-8">
              <div className="detail-slider">

                <Swiper
                  modules={[Autoplay, Pagination]}
                  slidesPerView={1}
                  loop={true}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  className="business-detail-slider"
                >
                  {images.map((img, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={img}
                        alt={`slide-${index}`}
                        className="slider-img"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

              </div>

              <div className="ann-card ann-preview" >
                <div className="ann-card-head" >Latest Announcements</div>
                <div className="ann-card-body" >
                  <div className="ann-preview-icon" id="pvIconWrap" >
                    <Tag size={20} />
                  </div>
                  <div className="ann-preview-texts" >
                    <div id="pvTitle" className="ann-preview-title" >fgdfgfd dfgfdgdffgfdfd fgfdgd</div>
                    <div id="pvDesc" className="ann-preview-desc" >gtgfdgfdgfdg fdgfdgfdg dfgfdgdf fdgfdgfdg</div>
                  </div>
                  <a href="https://www.ronanysyvu.biz" id="pvBtn" className="ann-chip">Announcement</a>
                </div>
              </div>

              <div className="listing-details-about">
                <h2 className="heading-title">About </h2>
                <p>
                  Eirmon Solutions will be your ultimate choice for Digital marketing near victoria, as our team is more dedicated, consistent, innovative and experts in proving services. The focus of eirmon solutions is to give satisfactory work, creative ideas, and phenomenal graphic designs to clients. Businesses need a reliable partner—someone who can guide them through the digital landscape. As a trusted internet marketing agency Melbourne businesses rely on, we offer custom digital solutions that blend strategy with creativity to take your brand to the next level.
                </p>
              </div>






            </div>

            <div className="col-lg-12 col-xl-4">
              <div className="top-sticky">
                <div className="couponBar d-none d-xl-block " >

                  <div className="couponBar__content" >

                    <div className="couponBar__text" >
                      <strong>PROMOTION.</strong>
                      dgdfgfdgdfg
                      Use Coupon
                    </div>

                    <div className="couponBar__right" >
                      <div className="couponCodeText" >
                        48201
                      </div>

                      <button type="button" className="copyCouponBtn">
                        COPY
                      </button>
                    </div>

                    <div className="couponTimer" data-end="1778457599" >4d 17h 30m 18s</div>

                  </div>

                  <button type="button" className="closeCouponBar">
                    <X size={18} />
                  </button>
                </div>

                <div className="listing-details-sidebar">
                  <h3 className="heading-title">Contact Information</h3>
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <div className="contact-info">
                        <ul>
                          <li>
                            <span className="contact-icon"><MapPin size={18} /></span>
                            Eirmon Solutions, Unit 5/792 Plenty Rd, South Morang VIC 3752, Australia
                          </li>
                          <li>
                            <span className="contact-icon"><MapPin size={18} /></span>
                            8091745349
                          </li>
                          <li>
                            <span className="contact-icon"><MapPin size={18} /></span>
                            vishalthakur15896@gmail.com
                          </li>
                          <li>
                            <span className="contact-icon"><MapPin size={18} /></span>
                            https://eirmonsolutions.com.au
                          </li>
                        </ul>
                      </div>
                      <div className="social-links">
                        <Link href="" className="social-link facebook">
                          <MapPin size={20} />
                        </Link>
                        <Link href="" className="social-link instagram">
                          <MapPin size={20} />
                        </Link>
                        <Link href="" className="social-link youtube">
                          <MapPin size={20} />
                        </Link>
                        <Link href="" className="social-link twitter">
                          <MapPin size={20} />
                        </Link>
                        <Link href="" className="social-link linkedin">
                          <MapPin size={20} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="map-sidebar">
                  <iframe
                    src="https://www.google.com/maps?q=Eirmon+Solutions%2C+Unit+5%2F792+Plenty+Rd%2C+South+Morang+VIC+3752%2C+Australia&output=embed"
                    width="100%"
                    height="220"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    style={{ borderRadius: "10px", border: "0" }}
                    allowFullScreen
                  ></iframe>
                </div>

                <div className="listing-business-hour">
                  <h3 className="heading-title">Business Hour</h3>

                  <div className="bh-dropdown">

                    <button
                      type="button"
                      className="bh-trigger"
                      onClick={() => setOpenHours(!openHours)}
                    >

                      <div className="bh-left">

                        <div className="bh-top">
                          <span className="bh-title">Hours:</span>
                          <span className="bh-today">Wednesday</span>
                        </div>

                        <div className="bh-status">
                          Open · Closes 6:00 pm
                        </div>

                      </div>

                      <span className="bh-caret">
                        {openHours ? (
                          <ChevronUp size={22} />
                        ) : (
                          <ChevronDown size={22} />
                        )}
                      </span>

                    </button>

                    {openHours && (
                      <div className="bh-menu">

                        {businessHours.map((item, index) => (
                          <div
                            key={index}
                            className={`bh-row ${item.today ? "is-today" : ""}`}
                          >

                            <span className="bh-day">
                              {item.day}
                            </span>

                            <span
                              className={`bh-time ${item.closed ? "bh-closed" : ""}`}
                            >
                              {item.time}
                            </span>

                          </div>
                        ))}

                      </div>
                    )}

                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      <style jsx>{`
 .detail-slider {
    border-radius: 20px;
    width: 100%;
    overflow: hidden;
    margin-bottom: 30px;
}

  .slider-img {
    width: 100%;
    height: 460px;
    object-fit: cover;
    border-radius: 20px;
  }

  /* ===== Pagination Line Style ===== */

  :global(.swiper-pagination) {
    bottom: 15px !important;
  }

  :global(.swiper-pagination-bullet) {
    width: 50px;
    height: 4px;
    border-radius: 20px;
    background: #ffffff;
    opacity: 0.5;
    transition: 0.3s;
  }

  :global(.swiper-pagination-bullet-active) {
    background: #0d6efd;
    opacity: 1;
    width: 80px;
  }

  @media (max-width: 768px) {
    .slider-img {
      height: 250px;
    }

    :global(.swiper-pagination-bullet) {
      width: 35px;
    }

    :global(.swiper-pagination-bullet-active) {
      width: 55px;
    }
  }
`}</style>
    </>
  );
};

export default BusinessListingsDetail;