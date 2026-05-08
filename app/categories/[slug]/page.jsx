
import React from "react";
import PageLayout from "@/components/partials/PageLayout";
import CategoryListingsPage from "@/components/pages/categories/CategoryListingsPage";

const page = async ({ params }) => {
    const { slug } = await params;

    return (

        <PageLayout>
            <CategoryListingsPage slug={slug} />
        </PageLayout>

    );
};

export default page;