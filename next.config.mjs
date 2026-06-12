/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    "http://192.168.1.14:3000",
    "http://localhost:3000",
    "https://api.citiinfo.com.au/",
  ],

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
