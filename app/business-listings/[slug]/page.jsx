import React from "react";
import PageLayout from "@/components/partials/PageLayout";
import BusinessListingsDetail from "@/components/pages/business-listings/BusinessListingsDetail";

const Page = async ({ params }) => {
    const { slug } = await params;

    return (
        <PageLayout>
            <BusinessListingsDetail slug={slug} />
        </PageLayout>
    );
};

export default Page;