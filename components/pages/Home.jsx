import React, { Suspense } from "react";
import Banner from "../Banner";
import Categories from "../Categories";
import BusinessListing from "./business-listings/BusinessListing";
import Cities from "../Cities";

const Home = () => {
    return (
        <>
            <Banner />
            <Categories />
            <Cities />

            <Suspense fallback={<div>Loading listings...</div>}>
                <BusinessListing
                    limit={6}
                    hideFilters={true}
                    hidePagination={true}
                    showViewAll={true}
                    homepageOnly={true}
                    showCount={false}
                />
            </Suspense>
        </>
    );
};

export default Home;