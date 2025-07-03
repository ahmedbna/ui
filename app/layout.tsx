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
  title: 'BNA UI',
  description:
    'BNA UI is a set of beautifully-designed, accessible React Native components. Built for Expo and React Native. Open Source. Open Code.',
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
