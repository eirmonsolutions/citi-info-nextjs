export default function BlogListSkeleton({ count = 4 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div className="blog-skeleton-card" key={index}>
          <div className="skeleton blog-skeleton-img" />
          <div className="blog-skeleton-body">
            <div className="skeleton" style={{ height: 14, width: "40%", marginBottom: 12 }} />
            <div className="skeleton" style={{ height: 22, width: "90%", marginBottom: 10 }} />
            <div className="skeleton" style={{ height: 14, width: "100%", marginBottom: 8 }} />
            <div className="skeleton" style={{ height: 14, width: "80%" }} />
          </div>
        </div>
      ))}
    </>
  );
}
