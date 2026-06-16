import { apiFetch } from "../api";

export async function fetchWishlist() {
  return apiFetch("/wishlist");
}
