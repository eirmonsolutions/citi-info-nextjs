const DEFAULT_TIMEZONE = "Australia/Sydney";

const STATE_TIMEZONES = {
  "australian capital territory": "Australia/Sydney",
  act: "Australia/Sydney",
  "new south wales": "Australia/Sydney",
  nsw: "Australia/Sydney",
  victoria: "Australia/Melbourne",
  vic: "Australia/Melbourne",
  queensland: "Australia/Brisbane",
  qld: "Australia/Brisbane",
  "south australia": "Australia/Adelaide",
  sa: "Australia/Adelaide",
  "western australia": "Australia/Perth",
  wa: "Australia/Perth",
  "northern territory": "Australia/Darwin",
  nt: "Australia/Darwin",
  tasmania: "Australia/Hobart",
  tas: "Australia/Hobart",
};

function normalizeTime(time) {
  if (!time) return null;

  const value = String(time).trim();

  if (/^\d{2}:\d{2}$/.test(value)) return `${value}:00`;
  if (/^\d{2}:\d{2}:\d{2}$/.test(value)) return value;

  return null;
}

function inRange(now, start, end) {
  if (!now || !start || !end) return false;

  if (start <= end) {
    return now >= start && now <= end;
  }

  return now >= start || now <= end;
}

function getNowInTimezone(timezone) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = Object.fromEntries(
    formatter
      .formatToParts(new Date())
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value])
  );

  return {
    day: parts.weekday.toLowerCase(),
    time: `${parts.hour.padStart(2, "0")}:${parts.minute.padStart(2, "0")}:${parts.second.padStart(2, "0")}`,
  };
}

function formatCloseLabel(time) {
  const normalized = normalizeTime(time);
  if (!normalized) return "";

  const [hour, minute] = normalized.split(":").map(Number);
  const period = hour >= 12 ? "pm" : "am";
  const displayHour = hour % 12 || 12;

  return `${displayHour}:${String(minute).padStart(2, "0")} ${period}`;
}

export function resolveListingTimezone(listing) {
  const cityTimezone =
    listing?.city_rel?.timezone || listing?.cityRel?.timezone;

  if (cityTimezone) return cityTimezone;

  const stateName = String(
    listing?.state_rel?.name || listing?.stateRel?.name || ""
  )
    .trim()
    .toLowerCase();

  if (stateName && STATE_TIMEZONES[stateName]) {
    return STATE_TIMEZONES[stateName];
  }

  return DEFAULT_TIMEZONE;
}

export function getListingOpenStatus(listing) {
  if (listing?.open_status) {
    return listing.open_status;
  }

  const hours = listing?.hours || [];

  const defaultStatus = {
    is_open: false,
    is_lunch: false,
    text: "Closed Now",
    class: "closed",
    detail_label: "Closed",
  };

  if (!hours.length) {
    return null;
  }

  const timezone = resolveListingTimezone(listing);
  const { day: todayKey, time: nowTime } = getNowInTimezone(timezone);

  const today = hours.find(
    (hour) => String(hour?.day_of_week || "").toLowerCase() === todayKey
  );

  if (!today || Number(today.is_closed) === 1) {
    return { ...defaultStatus, timezone, day: todayKey };
  }

  const open = normalizeTime(today.open_time);
  const close = normalizeTime(today.close_time);
  const breakStart = normalizeTime(today.break_start);
  const breakEnd = normalizeTime(today.break_end);

  if (!open || !close || !inRange(nowTime, open, close)) {
    return { ...defaultStatus, timezone, day: todayKey };
  }

  if (breakStart && breakEnd && inRange(nowTime, breakStart, breakEnd)) {
    return {
      is_open: false,
      is_lunch: true,
      text: "Lunch Time",
      class: "lunch",
      detail_label: "Lunch Time",
      timezone,
      day: todayKey,
    };
  }

  const closeLabel = formatCloseLabel(close);

  return {
    is_open: true,
    is_lunch: false,
    text: "Open Now",
    class: "open",
    detail_label: closeLabel ? `Open · Closes ${closeLabel}` : "Open",
    timezone,
    day: todayKey,
  };
}

export function getListingTodayKey(listing) {
  const timezone = resolveListingTimezone(listing);
  return getNowInTimezone(timezone).day;
}
