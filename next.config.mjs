/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // manje verzije fotki (WebP) se spremaju 31 dan, da se ne rade iznova
  images: { minimumCacheTTL: 2678400, formats: ["image/webp"] },
  // fotke se dugo spremaju u preglednik (brže otvaranje stranice drugi put)
  async headers() {
    return [
      { source: "/fotke/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }] }
    ];
  }
};
export default nextConfig;
