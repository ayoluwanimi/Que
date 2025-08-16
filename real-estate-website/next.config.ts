import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for Netlify deployment
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  
  // Image optimization settings for static export
  images: {
    unoptimized: true,
  },
  
  // Base path and asset prefix (can be customized for deployment)
  // basePath: '',
  // assetPrefix: '',
  
  // Disable server-side features for static export
  experimental: {
    // appDir: true, // Already enabled by default in Next.js 13+
  },
  
  // Enable TypeScript and ESLint checks during build
  typescript: {
    // Don't fail build on TypeScript errors (optional)
    ignoreBuildErrors: false,
  },
  eslint: {
    // Don't fail build on ESLint errors (optional)
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
