// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/apk',
        destination: '/download',
        permanent: true, // 308 permanent redirect (use false for 307 temporary)
      },
    ];
  },
  async headers() {
    const allowedOrigin = "https://app.simamia.co.tz";

    return [
      {
        // Match all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          // 🛡️ Explicit origin restriction instead of the dangerous wildcard "*"
          { key: "Access-Control-Allow-Origin", value: allowedOrigin },
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization" },
        ]
      }
    ]
  }
};

module.exports = nextConfig;