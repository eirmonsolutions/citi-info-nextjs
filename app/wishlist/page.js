import PageLayout from "@/components/partials/PageLayout";
import WishlistPage from "@/components/pages/wishlist/WishlistPage";

export const metadata = {
  title: "My Wishlist | Citiinfo",
  description: "View your saved business listings on Citiinfo Australia.",
};

export default function Page() {
  return (
    <PageLayout>
      <WishlistPage />
    </PageLayout>
  );
}
