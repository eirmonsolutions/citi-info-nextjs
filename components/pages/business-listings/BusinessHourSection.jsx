"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  getListingOpenStatus,
  getListingTodayKey,
} from "@/lib/businessHours";

const BusinessHourSection = ({ listing }) => {
  const [openHours, setOpenHours] = useState(false);

  const daysOrder = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const hours = listing?.hours || [];

  if (!hours.length) return null;

  const formatTime = (time) => {
    if (!time) return "";

    const [hour, minute] = time.split(":");
    const date = new Date();
    date.setHours(Number(hour), Number(minute));

    return date
      .toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      .toLowerCase();
  };

  const hoursByDay = {};
  hours.forEach((item) => {
    if (item?.day_of_week) {
      hoursByDay[item.day_of_week.toLowerCase()] = item;
    }
  });

  const todayKey = getListingTodayKey(listing);
  const openStatus = getListingOpenStatus(listing);

  const topLabel = openStatus?.detail_label || "Closed";
  const statusClass = openStatus?.is_open
    ? "is-open"
    : openStatus?.is_lunch
    ? "is-lunch"
    : "is-closed";

  return (
    <div className="listing-business-hour">
      <h3 className="heading-title">Business Hour</h3>

      <div className="bh-dropdown">
        <button
          type="button"
          className="bh-trigger"
          onClick={() => setOpenHours(!openHours)}
          aria-expanded={openHours}
        >
          <div className="bh-left">
            <span className="bh-today">
              {todayKey.charAt(0).toUpperCase() + todayKey.slice(1)}
            </span>

            <span className={`bh-status ${statusClass}`}>{topLabel}</span>
          </div>

          <span className="bh-caret" aria-hidden="true">
            {openHours ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </span>
        </button>

        {openHours && (
          <div className="bh-menu" role="menu">
            {daysOrder.map((day) => {
              const item = hoursByDay[day];

              const closed =
                !item || Number(item?.is_closed) === 1;

              const dayOpen = closed
                ? ""
                : formatTime(item?.open_time);

              const dayClose = closed
                ? ""
                : formatTime(item?.close_time);

              const line = closed
                ? "Closed"
                : dayOpen && dayClose
                ? `${dayOpen} – ${dayClose}`
                : "Open";

              const isToday = day === todayKey;

              return (
                <div
                  className={`bh-row ${isToday ? "is-today" : ""}`}
                  key={day}
                >
                  <span className="bh-day">
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </span>

                  <span className={`bh-time ${closed ? "bh-closed" : ""}`}>
                    {line}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessHourSection;
