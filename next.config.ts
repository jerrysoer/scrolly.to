import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/how-tariffs-actually-work',
        destination: '/learn/how-tariffs-actually-work',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
