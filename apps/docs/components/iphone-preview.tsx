'use client';

import * as React from 'react';
import { useHydrated } from '@/hooks/use-hydrated';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { Code, Code2 } from 'lucide-react';
import { Button } from './ui/button';

// iPhone Video/Image Component
export const IPhonePreview = ({
  preview,
  width = 280,
  showCode = true,
  className,
}: {
  preview: { dark: string; light: string };
  width?: number;
  showCode?: boolean;
  className?: string;
}) => {
  const { theme, systemTheme } = useTheme();

  // Determine which preview to show based on theme
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const mediaUrl = currentTheme === 'dark' ? preview.dark : preview.light;

  // Placeholder renders during SSR; the real preview takes over after hydration.
  const mounted = useHydrated();

  // Check if the URL ends with .png (case insensitive)
  const isImage = mediaUrl.toLowerCase().endsWith('.png');

  const border = width * 0.15;
  const notchwidth = width * 0.45;

  if (!mounted) {
    return (
      <div className='flex items-center justify-center w-full h-full'>
        <div
          className='animate-pulse bg-background w-[280px] h-[560px]'
          style={{ borderRadius: border }}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center w-full h-full group',
        className
      )}
    >
      <div className='relative'>
        {/* iPhone Frame */}
        <div
          className={cn(
            'relative bg-secondary p-1 shadow-2xl transition-colors duration-100',
            showCode && 'group-hover:bg-muted-foreground'
          )}
          style={{ borderRadius: border }}
        >
          <div
            className='bg-white dark:bg-gray-900 overflow-hidden relative'
            style={{ borderRadius: border }}
          >
            {/* iPhone Notch */}
            <div
              className='absolute top-1 transform -translate-x-1/2 aspect-[4.2] bg-black rounded-full z-10'
              style={{
                width: `${notchwidth}px`,
                left: 'calc(50% - 3px)',
              }}
            />

            <div
              className='relative aspect-[0.46] overflow-hidden rounded-[2rem]'
              style={{
                width: `${width}px`,
              }}
            >
              {isImage ? (
                <img
                  key={mediaUrl}
                  src={mediaUrl}
                  alt='iPhone preview'
                  className='w-full h-full object-cover'
                />
              ) : (
                <video
                  key={mediaUrl} // Force re-render when video changes
                  className='w-full h-full object-cover'
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster='' // You can add a poster image if needed
                >
                  <source src={mediaUrl} type='video/mp4' />
                  Your browser does not support the video tag.
                </video>
              )}

              {/* Hover Overlay */}
              {showCode && (
                <div
                  className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center'
                  style={{ borderRadius: border }}
                >
                  <div className='h-10 px-6 has-[>svg]:px-4 inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border shadow-xs hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 z-10 bg-background/80 backdrop-blur-sm hover:bg-background/90'>
                    <Code className='w-4 h-4 mr-2' />
                    Show Code
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* iPhone Home Indicator */}
        {/* <div className='absolute bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-400 dark:bg-gray-600 rounded-full' /> */}
      </div>
    </div>
  );
};
