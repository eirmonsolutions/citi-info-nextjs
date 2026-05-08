"use client";

import React, { useEffect, useState } from "react";
import { X, Copy, Clock } from "lucide-react";

const CouponSideBarSection = ({ listing }) => {
  const [show, setShow] = useState(true);
  const [copied, setCopied] = useState(false);
  const [timer, setTimer] = useState("--");

  // Active Coupon
  const coupon = listing?.coupons?.find(
    (item) =>
      item?.code?.trim() &&
      Number(item?.is_active) === 1
  );

  // Countdown Timer
  useEffect(() => {
    if (!coupon?.end_date) return;

    const end = new Date(coupon.end_date);
    end.setHours(23, 59, 59, 999);

    const updateTimer = () => {
      const now = new Date();
      const distance = end - now;

      if (distance <= 0) {
        setTimer("Expired");
        return;
      }

      const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
      );

      const hours = Math.floor(
        (distance / (1000 * 60 * 60)) % 24
      );

      const minutes = Math.floor(
        (distance / (1000 * 60)) % 60
      );

      const seconds = Math.floor(
        (distance / 1000) % 60
      );

      setTimer(
        `${days}d ${hours}h ${minutes}m ${seconds}s`
      );
    };

    updateTimer();

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [coupon?.end_date]);

  // Hide if no coupon
  if (!show || !coupon) return null;

  // Copy Coupon
  const copyCoupon = async () => {
    await navigator.clipboard.writeText(coupon.code);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div className="couponBar d-none d-xl-flex">
      <div className="couponBar__content">
        <div className="couponBar__text">
          <h6>Promotion.</h6>

          <p className="mb-0">
            {coupon.details
              ? `${coupon.details} Use Coupon`
              : "Save more today — use this coupon at checkout"}
          </p>
        </div>

        <div className="couponBar__right">
          <div className="couponCodeText">
            {coupon.code}
          </div>

          <button
            type="button"
            className="copyCouponBtn"
            onClick={copyCoupon}
          >
            <Copy size={15} />
            {copied ? "COPIED" : "COPY"}
          </button>
        </div>

        <div className="couponTimer">
          <Clock size={15} />
          {timer}
        </div>
      </div>

      <button
        type="button"
        className="closeCouponBar"
        onClick={() => setShow(false)}
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default CouponSideBarSection;