/** @type {import('next').NextConfig} */
const apiProxyTarget =
  process.env.API_PROXY_TARGET || process.env.NEXT_PUBLIC_API_URL;

const nextConfig = {
  allowedDevOrigins: [
    "http://192.168.1.14:3000",
    "http://localhost:3000",
    "http://127.0.0.1:8000/",
  ],

  async rewrites() {
    const rewrites = [];

    // Optional: proxy /api/* through same origin in production (set API_PROXY_TARGET)
    if (apiProxyTarget && apiProxyTarget.startsWith("http")) {
      const base = apiProxyTarget.replace(/\/api\/?$/, "");
      rewrites.push({
        source: "/api/:path*",
        destination: `${base}/api/:path*`,
      });
      rewrites.push({
        source: "/sanctum/:path*",
        destination: `${base}/sanctum/:path*`,
      });
    }

    return rewrites;
  },

  async redirects() {
    return [
      {
        source: "/listing/:slug",
        destination: "/business-listings/:slug",
        permanent: true,
      },
      {
        source: "/listing/:slug*",
        destination: "/business-listings/:slug*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
