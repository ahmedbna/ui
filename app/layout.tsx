import type { Metadata } from 'next';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import { ThemeProvider } from '@/components/theme-provider';
import { LayoutProvider } from '@/hooks/use-layout';
import { ActiveThemeProvider } from '@/components/active-theme';
import { Toaster } from '@/components/ui/sonner';
import { Analytics } from '@/components/analytics';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { fontVariables } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'BNA UI - Expo React Native UI Components Library',
    template: '%s | BNA UI',
  },
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
    title: {
      default: 'BNA UI - Expo React Native UI Components Library',
      template: '%s | BNA UI',
    },
    description:
      'Beautiful, accessible Expo React Native UI components that work seamlessly across iOS and Android. Build stunning mobile apps faster with our comprehensive component library.',
    url: 'https://ui.ahmedbna.com',
    siteName: 'BNA UI',
    images: [
      {
        url: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/bna-ui-header.png',
        width: 1200,
        height: 630,
        alt: 'BNA UI - Expo, React Native UI Components Library',
        type: 'image/png',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  // Twitter/X
  twitter: {
    card: 'summary_large_image',
    title: {
      default: 'BNA UI - Expo React Native UI Components Library',
      template: '%s | BNA UI',
    },
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          'text-foreground group/body overscroll-none font-sans antialiased [--footer-height:calc(var(--spacing)*14)] [--header-height:calc(var(--spacing)*14)] xl:[--footer-height:calc(var(--spacing)*24)]',
          fontVariables
        )}
      >
        <ThemeProvider>
          <LayoutProvider>
            <ActiveThemeProvider>
              <div className='bg-background relative z-10 flex min-h-svh flex-col'>
                <SiteHeader />
                <main className='flex flex-1 flex-col'>{children}</main>
                <SiteFooter />
              </div>
              <TailwindIndicator />
              <Toaster position='top-center' />
              <Analytics />
            </ActiveThemeProvider>
          </LayoutProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
