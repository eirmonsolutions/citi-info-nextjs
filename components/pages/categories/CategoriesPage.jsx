"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

const API_URL = "http://127.0.0.1:8000/api";

const CategoriesPage = () => {
    const getRandomColor = () => {
        const colors = [
            "#4f46e5", // indigo
            "#16a34a", // green
            "#db2777", // pink
            "#f59e0b", // orange
            "#7c3aed", // purple
            "#0284c7", // sky
            "#ca8a04", // yellow dark
            "#059669", // teal
            "#be123c", // rose
            "#9333ea", // violet
            "#0369a1", // cyan
            "#475569", // gray
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const [categories, setCategories] = useState([]);
    const [pagination, setPagination] = useState({});
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("name_asc");
    const [page, setPage] = useState(1);

    const firstLoad = useRef(true);

    const fetchCategories = async (
        searchValue = search,
        sortValue = sort,
        pageValue = page
    ) => {
        try {
            const res = await fetch(
                `${API_URL}/categories?q=${encodeURIComponent(
                    searchValue
                )}&sort=${sortValue}&page=${pageValue}`
            );

            if (!res.ok) {
                setCategories([]);
                setPagination({});
                return;
            }

            const result = await res.json();

            setCategories(result.data || []);
            setPagination(result.pagination || {});
        } catch (error) {
            setCategories([]);
            setPagination({});
        }
    };

    // First load categories immediately
    useEffect(() => {
        fetchCategories("", "name_asc", 1);
    }, []);

    // Live search with delay
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

    // Sort + pagination
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
                        <p>Showing {pagination.total || 0} categories</p>
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
                    {categories.length > 0 ? (
                        categories.map((cat) => (
                            <Link
                                href={`/categories/${cat.slug}`}
                                className="popular-cat-card"
                                key={cat.id}
                            >
                                <div className="popular-cat-icon" style={{ background: getRandomColor() }}>
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

                                {/* Page Numbers */}
                                {Array.from({ length: pagination.last_page || 1 }).map((_, i) => {
                                    const pageNumber = i + 1;

                                    return (
                                        <li
                                            key={pageNumber}
                                            className={`page-item ${page === pageNumber ? "active" : ""}`}
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
                                    className={`page-item ${page === pagination.last_page ? "disabled" : ""
                                        }`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() =>
                                            page < pagination.last_page && setPage(page + 1)
                                        }
                                    >
                                        »
                                    </button>
                                </li>

                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CategoriesPage;