import { Metadata } from 'next';
import { Announcement } from '@/components/announcement';
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Previews } from '@/components/previews';

export const revalidate = false;
export const dynamicParams = false;
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'BNA UI - Expo React Native UI Components Library',
  description:
    'Beautiful, accessible Expo React Native UI components that work seamlessly across iOS and Android. Build stunning mobile apps faster with our comprehensive component library.',

  // Additional meta tags for better SEO and social sharing
  keywords:
    'React Native, Expo, UI Components, Mobile Development, iOS, Android, Component Library, Design System',
  authors: [{ name: 'Ahmed BNA' }],
  creator: 'Ahmed BNA',
  publisher: 'BNA UI',

  // Canonical URL
  metadataBase: new URL('https://ui.ahmedbna.com'),
  alternates: {
    canonical: 'https://ui.ahmedbna.com',
  },

  // Open Graph (Facebook, LinkedIn, WhatsApp, etc.)
  openGraph: {
    title: 'BNA UI - Expo React Native UI Components Library',
    description:
      'Beautiful, accessible Expo React Native UI components that work seamlessly across iOS and Android. Build stunning mobile apps faster with our comprehensive component library.',
    url: 'https://ui.ahmedbna.com',
    siteName: 'BNA UI',
    images: [
      {
        url: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/bna-ui-header.png',
        width: 1200,
        height: 630,
        alt: 'BNA UI - Expo React Native UI Components Library',
        type: 'image/png',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  // Twitter/X
  twitter: {
    card: 'summary_large_image',
    title: 'BNA UI - Expo React Native UI Components Library',
    description:
      'Beautiful, accessible Expo React Native UI components that work seamlessly across iOS and Android. Build stunning mobile apps faster.',
    images: [
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/bna-ui-header.png',
    ],
    creator: '@ahmedbna', // Add your Twitter handle if you have one
    site: '@ahmedbna', // Add your Twitter handle if you have one
  },

  // Additional meta tags for other platforms
  other: {
    // LinkedIn specific (though it uses Open Graph)
    'linkedin:owner': 'Ahmed BNA',

    // Apple specific
    'apple-mobile-web-app-title': 'BNA UI',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',

    // Microsoft specific
    'msapplication-TileImage':
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/bna-ui-header.png',
    'msapplication-TileColor': '#000000',

    // Theme colors
    'theme-color': '#000000',
    'color-scheme': 'light dark',

    // Additional social meta tags
    'og:see_also': 'https://ui.ahmedbna.com',
    'article:author': 'Ahmed BNA',
    'article:publisher': 'https://ui.ahmedbna.com',

    // Schema.org structured data
    'application-name': 'BNA UI',
    'mobile-web-app-capable': 'yes',
    'format-detection': 'telephone=no',
  },

  // Robots and indexing
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Additional verification (add if you have these)
  verification: {
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },

  // Categories for better organization
  category: 'Technology',

  // App-specific metadata
  applicationName: 'BNA UI',
  referrer: 'origin-when-cross-origin',
};

export default function Home() {
  const title = 'Expo React Native UI Components Library';
  const description =
    'Beautiful, accessible Expo React Native components that work seamlessly across iOS and Android';

  return (
    <div className='flex flex-1 flex-col'>
      <PageHeader>
        <Announcement />
        <h1 className='pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-6xl font-black  text-transparent dark:from-white dark:to-slate-900/10'>
          BNA UI
        </h1>
        <PageHeaderHeading>{title}</PageHeaderHeading>
        <PageHeaderDescription>{description}</PageHeaderDescription>
        <PageActions>
          <Button asChild size='sm'>
            <Link href='/docs/installation'>Get Started</Link>
          </Button>
        </PageActions>
      </PageHeader>

      <Previews />
    </div>
  );
}
