import { apiFetch } from "../api";

export async function submitBusinessEnquiry({ listingId, phone, message }) {
  return apiFetch("/business-enquiry", {
    method: "POST",
    body: JSON.stringify({
      listing_id: listingId,
      phone,
      message,
    }),
  });
}
