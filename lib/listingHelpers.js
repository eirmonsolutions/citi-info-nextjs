const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export const FALLBACK_IMAGE = `${SITE_URL}/assets/images/no-image.png`;
export const FALLBACK_LOGO = `${SITE_URL}/assets/images/favicon.jpg`;

export function getImageUrl(path, fallback = FALLBACK_IMAGE) {
  if (!path) return fallback;
  const cleanPath = String(path).replace(/^\/+/, "");
  if (cleanPath.startsWith("http")) return cleanPath;
  if (cleanPath.startsWith("storage/")) return `${SITE_URL}/${cleanPath}`;
  if (cleanPath.startsWith("business/gallery/")) return `${STORAGE_URL}/${cleanPath}`;
  if (cleanPath.startsWith("business/logo/")) return `${STORAGE_URL}/${cleanPath}`;
  return `${STORAGE_URL}/business/gallery/${cleanPath}`;
}

export function getLogoUrl(item) {
  if (!item?.logo) return FALLBACK_LOGO;
  const cleanLogo = String(item.logo).replace(/^\/+/, "");
  if (cleanLogo.startsWith("http")) return cleanLogo;
  if (cleanLogo.startsWith("storage/")) return `${SITE_URL}/${cleanLogo}`;
  if (cleanLogo.startsWith("business/")) return `${STORAGE_URL}/${cleanLogo}`;
  return `${STORAGE_URL}/${cleanLogo}`;
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
