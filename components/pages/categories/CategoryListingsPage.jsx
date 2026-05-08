"use client";

import React from "react";
import Link from "next/link";
import BusinessListing from "../business-listings/BusinessListing";

const CategoryListingsPage = ({ slug }) => {
    const categoryName = slug
        ? slug
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
        : "Category";

    return (
        <>
            <section className="popular-categories-details-area">
                <div className="breadcrumb-area pb-0">
                    <div className="container">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link href="/">Home</Link>
                                </li>

                                <li className="breadcrumb-item">
                                    <Link href="/categories">Category</Link>
                                </li>

                                <li className="breadcrumb-item active" aria-current="page">
                                    {categoryName}
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <div className="listing-search-area">
                    <div className="container">
                        <h1>Popular {categoryName}</h1>
                    </div>
                </div>
            </section>

            <BusinessListing categorySlug={slug} categoryName={categoryName} />

            <style jsx global>{`
  section.popular-categories-details-area {
    padding: 10px 0 0 !important;
  }

  section.popular-categories {
    padding: 0 0 60px !important;
  }

`}</style>
        </>
    );
};


export default CategoryListingsPage;