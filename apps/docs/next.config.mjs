import path from 'node:path';
import { createMDX } from 'fumadocs-mdx/next';

/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  // Component source is no longer read off disk at request time — it comes from
  // @bna-ui/registry's generated payloads — so the templates/ tracing hack that
  // used to be required here is gone.
  transpilePackages: ['@bna-ui/registry'],
  outputFileTracingRoot: path.join(import.meta.dirname, '../..'),
  outputFileTracingIncludes: {
    '/**': ['../../packages/registry/generated/**/*'],
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
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
