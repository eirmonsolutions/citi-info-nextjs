"use client";

import { Clock } from "lucide-react";
import { getListingOpenStatus } from "@/lib/businessHours";

export default function OpenStatusBadge({ listing }) {
  const status = getListingOpenStatus(listing);

  if (!status) return null;

  return (
    <div className={`status-badge ${status.class}`}>
      <Clock size={22} />
      {status.text}
    </div>
  );
}
