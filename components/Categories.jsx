import React from "react";
import Link from "next/link";
import { getServerApiBase } from "@/lib/serverApi";
import { getStorageUrl } from "@/lib/storageUrl";

const CategoriesSkeleton = () => {
  return (
    <section className="popular-categories">
      <div className="container">
        <div className="section-heading">
          <div className="section-icon">☆</div>
          <div>
            <div className="skeleton skeleton-heading"></div>
            <div className="skeleton skeleton-text"></div>
          </div>
        </div>

        <div className="popular-cat-grid">
          {[...Array(12)].map((_, index) => (
            <div className="popular-cat-card" key={index}>
              <div className="skeleton skeleton-icon"></div>
              <div className="skeleton skeleton-title"></div>
              <div className="skeleton skeleton-count"></div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="skeleton skeleton-btn"></div>
        </div>
      </div>
    </section>
  );
};

const Categories = async () => {
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

  let categories = [];

  try {
    const res = await fetch(`${getServerApiBase()}/home-categories`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return <CategoriesSkeleton />;
    }

    const result = await res.json();
    categories = result?.data || [];
  } catch (error) {
    return <CategoriesSkeleton />;
  }

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
          {categories.map((cat) => {
            const imageUrl = cat.categoryimage
              ? getStorageUrl(cat.categoryimage)
              : "";

            return (
              <div className="popular-cat-card" key={cat.id}>
                <div
                  className="popular-cat-icon"
                  style={{ background: getRandomColor() }}
                >
                  {cat.categoryimage && (
                    <img
                      src={imageUrl}
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
            );
          })}
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