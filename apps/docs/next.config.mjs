import { createMDX } from 'fumadocs-mdx/next';

/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  // Every route on this site is `force-static` with `revalidate = false`, there
  // is no middleware and no server action, and the only runtime fetch is a
  // client-side one. Nothing here needs a server, so say so: `output: 'export'`
  // emits plain files into `out/` and the deployment runs zero functions. That
  // is what keeps the site off Vercel's Fast Origin Transfer and ISR meters —
  // prerendered-but-server-backed routes bill both on every edge cache miss.
  //
  // The cost of saying it: `rewrites`, `redirects` and `headers` are unsupported
  // in this file under export, so they all live in `vercel.json` instead.
  output: 'export',
  // Component source is no longer read off disk at request time — it comes from
  // @bna-ui/registry's generated payloads — so the templates/ tracing hack that
  // used to be required here is gone.
  transpilePackages: ['@bna-ui/registry'],
  images: {
    // The default loader is a server route, which `output: 'export'` cannot
    // emit. Nothing is lost: `next/image` is wired into the MDX components but
    // no page actually uses it, and every real image and video is a raw tag
    // pointed at demo.ahmedbna.com.
    unoptimized: true,
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
