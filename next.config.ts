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
};

module.exports = nextConfig;