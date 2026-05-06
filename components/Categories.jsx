import React from "react";
import Link from "next/link";

const Categories = async () => {
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

    const res = await fetch("http://127.0.0.1:8000/api/home-categories", {
        cache: "no-store",
    });

    const result = await res.json();
    const categories = result.data || [];

    return (
        <section className="popular-categories">
            <div className="container">
                <div className="section-heading">
                    <div className="section-icon">☆</div>
                    <div>
                        <h2>Browse Popular Categories</h2>
                        <p>Explore top categories and find the best businesses near you.</p>
                    </div>
                </div>

                <div className="popular-cat-grid">
                    {categories.map((cat) => (
                        <div className="popular-cat-card" key={cat.id}>
                            <div className="popular-cat-icon" style={{ background: getRandomColor() }}>
                                {cat.categoryimage && (
                                    <img
                                        src={`http://127.0.0.1:8000/storage/${cat.categoryimage}`}
                                        alt={cat.name}
                                        width={40}
                                        height={40}
                                        style={{ objectFit: "contain" }}
                                    />
                                )}
                            </div>

                            <Link href={`/categories/${cat.slug}`}>
                                <h3>{cat.name}</h3>
                            </Link>

                            <p>{cat.listings_count} Listings</p>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <Link href="/categories" className="view-categories-btn">
                        View All Categories <span>→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Categories;