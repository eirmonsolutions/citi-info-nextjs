"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const CategoriesPage = () => {

    const getRandomColor = () => {
        const colors = [
            "#4f46e5",
            "#16a34a",
            "#db2777",
            "#f59e0b",
            "#7c3aed",
            "#0284c7",
            "#ca8a04",
            "#059669",
            "#be123c",
            "#9333ea",
            "#0369a1",
            "#475569",
        ];

        return colors[Math.floor(Math.random() * colors.length)];
    };

    const [categories, setCategories] = useState([]);
    const [pagination, setPagination] = useState({});
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("name_asc");
    const [page, setPage] = useState(1);

    // ✅ Loading State
    const [loading, setLoading] = useState(true);

    const firstLoad = useRef(true);

    const fetchCategories = async (
        searchValue = search,
        sortValue = sort,
        pageValue = page
    ) => {

        try {

            setLoading(true);

            const res = await fetch(
                `${API_URL}/categories?q=${encodeURIComponent(searchValue)}&sort=${sortValue}&page=${pageValue}`
            );

            if (!res.ok) {
                setCategories([]);
                setPagination({});
                setLoading(false);
                return;
            }

            const result = await res.json();

            setCategories(result.data || []);
            setPagination(result.pagination || {});

        } catch (error) {

            setCategories([]);
            setPagination({});

        } finally {

            setLoading(false);

        }
    };

    // First load
    useEffect(() => {
        fetchCategories("", "name_asc", 1);
    }, []);

    // Search
    useEffect(() => {

        if (firstLoad.current) {
            firstLoad.current = false;
            return;
        }

        const delaySearch = setTimeout(() => {
            setPage(1);
            fetchCategories(search, sort, 1);
        }, 350);

        return () => clearTimeout(delaySearch);

    }, [search]);

    // Sort + Pagination
    useEffect(() => {

        if (firstLoad.current) return;

        fetchCategories(search, sort, page);

    }, [sort, page]);

    return (
        <section className="popular-categories">

            <div className="container">

                <div className="section-heading">
                    <div className="section-icon">☆</div>

                    <div>
                        <h2>Browse Business Categories Across Australia</h2>
                        <p>
                            {loading
                                ? "Loading categories..."
                                : `Showing ${pagination.total || 0} categories`
                            }
                        </p>
                    </div>
                </div>

                <div className="category-filter-bar">

                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <div className="right-filter">

                        <label htmlFor="sort">Sort By:</label>

                        <select
                            id="sort"
                            value={sort}
                            onChange={(e) => {
                                setSort(e.target.value);
                                setPage(1);
                            }}
                        >
                            <option value="name_asc">Name (A-Z)</option>
                            <option value="name_desc">Name (Z-A)</option>
                            <option value="date_asc">Date Oldest</option>
                            <option value="date_desc">Date Newest</option>
                        </select>

                    </div>

                </div>

                <div className="popular-cat-grid">

                    {/* ✅ Skeleton Loading */}
                    {loading ? (

                        [...Array(12)].map((_, index) => (

                            <div className="popular-cat-card" key={index}>

                                <div className="skeleton skeleton-icon"></div>

                                <div className="skeleton skeleton-title"></div>

                                <div className="skeleton skeleton-count"></div>

                            </div>

                        ))

                    ) : categories.length > 0 ? (

                        categories.map((cat) => (

                            <Link
                                href={`/categories/${cat.slug}`}
                                className="popular-cat-card"
                                key={cat.id}
                            >

                                <div
                                    className="popular-cat-icon"
                                    style={{ background: getRandomColor() }}
                                >

                                    {cat.categoryimage_url && (
                                        <img
                                            src={cat.categoryimage_url}
                                            alt={cat.name}
                                            width={40}
                                            height={40}
                                            style={{ objectFit: "contain" }}
                                        />
                                    )}

                                </div>

                                <h3>{cat.name}</h3>

                                <p>{cat.listings_count} Listings</p>

                            </Link>

                        ))

                    ) : (

                        <p>No categories found.</p>

                    )}

                </div>

                {!loading && (
                    <div id="paginationWrapper">

                        <div className="pagination-wrap">

                            <nav aria-label="Category Pagination">

                                <ul className="pagination">

                                    {/* Previous */}
                                    <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                                        <button
                                            className="page-link"
                                            onClick={() => page > 1 && setPage(page - 1)}
                                        >
                                            «
                                        </button>
                                    </li>

                                    {/* Pages */}
                                    {Array.from({
                                        length: pagination.last_page || 1,
                                    }).map((_, i) => {

                                        const pageNumber = i + 1;

                                        return (
                                            <li
                                                key={pageNumber}
                                                className={`page-item ${page === pageNumber ? "active" : ""
                                                    }`}
                                            >
                                                <button
                                                    className="page-link"
                                                    onClick={() => setPage(pageNumber)}
                                                >
                                                    {pageNumber}
                                                </button>
                                            </li>
                                        );
                                    })}

                                    {/* Next */}
                                    <li
                                        className={`page-item ${page === pagination.last_page
                                            ? "disabled"
                                            : ""
                                            }`}
                                    >
                                        <button
                                            className="page-link"
                                            onClick={() =>
                                                page < pagination.last_page &&
                                                setPage(page + 1)
                                            }
                                        >
                                            »
                                        </button>
                                    </li>

                                </ul>

                            </nav>

                        </div>

                    </div>
                )}

            </div>

        </section>
    );
};

export default CategoriesPage;