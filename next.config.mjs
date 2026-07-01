/** @type {import('next').NextConfig} */
const apiProxyTarget =
  process.env.API_PROXY_TARGET || process.env.NEXT_PUBLIC_API_URL;

const isDev = process.env.NODE_ENV !== "production";

const connectSrc = [
  "'self'",
  "https://api.citiinfo.com.au",
  "https://www.google-analytics.com",
  "https://analytics.google.com",
];

const imgSrc = [
  "'self'",
  "data:",
  "blob:",
  "https://api.citiinfo.com.au",
  "https://www.google-analytics.com",
];

const formAction = ["'self'", "https://api.citiinfo.com.au"];

if (isDev) {
  for (const host of ["localhost", "127.0.0.1"]) {
    connectSrc.push(
      `http://${host}:3000`,
      `http://${host}:8000`,
      `ws://${host}:3000`,
    );
    imgSrc.push(`http://${host}:8000`, `http://${host}:3000`);
    formAction.push(`http://${host}:8000`, `http://${host}:3000`);
  }
}

const cspDirectives = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline'",
  `img-src ${imgSrc.join(" ")}`,
  "font-src 'self' data:",
  `connect-src ${connectSrc.join(" ")}`,
  "frame-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  `form-action ${formAction.join(" ")}`,
  "frame-ancestors 'self'",
];

if (!isDev) {
  cspDirectives.push("upgrade-insecure-requests");
}

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy",
    value: cspDirectives.join("; "),
  },
];

const nextConfig = {
  allowedDevOrigins: [
    "http://192.168.1.14:3000",
    "http://localhost:3000",
    "http://127.0.0.1:8000",
  ],

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  async rewrites() {
    const rewrites = [];

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