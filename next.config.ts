import type { NextConfig } from "next";

/** Host serving the WordPress media library — keep in sync with `src/lib/wp.ts`. */
const CMS_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN ?? "hb-pools.demo-link.tech";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: CMS_DOMAIN,
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
