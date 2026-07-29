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
  // `/docs/components/button.md` serves the Markdown build of that page.
  //
  // The handler lives at `/llms/**` because a Route Handler cannot share a path
  // with a Page, and `/docs/[[...slug]]` is the docs page. Rewrites run in the
  // `afterFiles` phase — after `public/` and `_next`, before dynamic routes — so
  // the `.md` request is claimed here and never reaches the page.
  rewrites() {
    return [
      { source: '/docs.md', destination: '/llms' },
      { source: '/docs/:path(.*).md', destination: '/llms/:path' },
    ];
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
      // The Convex setup guide moved into the installation section, where it
      // sits beside the Expo and Convex-without-auth paths.
      {
        source: '/docs/convex/installation',
        destination: '/docs/installation/convex-auth',
        permanent: true,
      },
      // The hook was renamed to `useColor` in the registry; its page kept the
      // old filename, so the slug never matched the entry it documents.
      {
        source: '/docs/hooks/useThemeColor',
        destination: '/docs/hooks/useColor',
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
