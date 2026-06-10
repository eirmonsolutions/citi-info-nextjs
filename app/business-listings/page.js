import React, { Suspense } from "react";
import PageLayout from "@/components/partials/PageLayout";
import BusinessListing from "@/components/pages/business-listings/BusinessListing";
export const metadata = {
  title: "Business Listings Australia – Find Local Services & Companies",
  description:
    "Business listings across Australia on Citiinfo. Discover restaurants, car rentals, towing services, salons, plumbers and other local businesses in Melbourne, Sydney, Brisbane and more",
  keywords: [
    "business listings australia",
    "local businesses australia",
    "business directory australia",
    "find services australia",
    "melbourne business directory",
    "sydney local services",
    "brisbane business listings",
  ],
};

const page = () => {
  return (
    <PageLayout>
      <Suspense fallback={<div>Loading listings...</div>}>
        <BusinessListing
          homepageOnly={false}
          showViewAll={false}
          limit={12}
        />
      </Suspense>
    </PageLayout>
  );
};

export default page;