"use client";

import Link from "next/link";

export default function BusinessListingError({ error, reset }) {
  return (
    <section className="listing-details-area">
      <div className="container py-5 text-center">
        <h1>Something went wrong</h1>
        <p className="mt-3 text-muted">
          {error?.message ||
            "We could not load this business listing. Please try again."}
        </p>
        <div className="d-flex gap-3 justify-content-center mt-4 flex-wrap">
          <button type="button" className="btn-add" onClick={() => reset()}>
            Try again
          </button>
          <Link href="/business-listings" className="btn-login">
            Back to listings
          </Link>
        </div>
      </div>
    </section>
  );
}
