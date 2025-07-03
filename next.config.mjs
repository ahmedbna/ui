import { createMDX } from 'fumadocs-mdx/next';

/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  outputFileTracingIncludes: {
    '/*': ['./registry/**/*'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  redirects() {
    return [
      {
        source: '/components',
        destination: '/docs/components',
        permanent: true,
      },
      {
        source: '/docs/primitives/:path*',
        destination: '/docs/components/:path*',
        permanent: true,
      },
      {
        source: '/charts',
        destination: '/docs/charts',
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
