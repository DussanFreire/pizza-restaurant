import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sgakadmpaavfqttvbegl.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/meal/**",
      },
    ],
  },
};

export default nextConfig;
