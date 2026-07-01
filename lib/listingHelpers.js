import { getStorageUrl } from "./storageUrl";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export const FALLBACK_IMAGE = `${SITE_URL}/assets/images/no-image.png`;
export const FALLBACK_LOGO = `${SITE_URL}/assets/images/favicon.jpg`;

export function getImageUrl(path, fallback = FALLBACK_IMAGE) {
  if (!path) return fallback;
  const cleanPath = String(path).replace(/^\/+/, "");
  if (cleanPath.startsWith("http")) return getStorageUrl(cleanPath);
  if (cleanPath.startsWith("storage/")) return getStorageUrl(cleanPath);
  if (cleanPath.startsWith("business/gallery/")) return getStorageUrl(cleanPath);
  if (cleanPath.startsWith("business/logo/")) return getStorageUrl(cleanPath);
  return getStorageUrl(`business/gallery/${cleanPath}`);
}

export function getLogoUrl(item) {
  if (!item?.logo) return FALLBACK_LOGO;
  const cleanLogo = String(item.logo).replace(/^\/+/, "");
  if (cleanLogo.startsWith("http")) return getStorageUrl(cleanLogo);
  if (cleanLogo.startsWith("storage/")) return getStorageUrl(cleanLogo);
  if (cleanLogo.startsWith("business/")) return getStorageUrl(cleanLogo);
  return getStorageUrl(cleanLogo);
}

export function getGalleryImages(item) {
  if (!item?.gallery || !Array.isArray(item.gallery)) return [];
  return item.gallery;
}

export function getCategoryName(item) {
  return (
    item?.category_rel?.name ||
    item?.categoryRel?.name ||
    item?.category_rel?.title ||
    item?.category ||
    "Business"
  );
}

export function getCityName(item) {
  return item?.city_rel?.name || item?.cityRel?.name || item?.city || "Australia";
}

export function getRating(item) {
  if (item?.average_rating) {
    return Number(item.average_rating).toFixed(1);
  }

  if (item?.reviews_avg_rating) {
    return Number(item.reviews_avg_rating).toFixed(1);
  }

  if (item?.reviews?.length > 0) {
    const total = item.reviews.reduce(
      (sum, review) => sum + Number(review.rating || 0),
      0
    );
    return (total / item.reviews.length).toFixed(1);
  }

  return "0.0";
}

export function getReviewCount(item) {
  if (item?.reviews?.length > 0) {
    return item.reviews.length;
  }

  if (item?.reviews_count !== undefined && item?.reviews_count !== null) {
    return Number(item.reviews_count);
  }

  return 0;
}
