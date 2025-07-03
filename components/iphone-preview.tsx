'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

// iPhone Video/Image Component
export const IPhoneVideoPreview = ({
  preview,
  className,
}: {
  preview: { dark: string; light: string };
  className?: string;
}) => {
  const { theme, systemTheme } = useTheme();

  // Determine which preview to show based on theme
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const mediaUrl = currentTheme === 'dark' ? preview.dark : preview.light;

  const [mounted, setMounted] = React.useState(false);

  // Check if the URL ends with .png (case insensitive)
  const isImage = mediaUrl.toLowerCase().endsWith('.png');

  // Ensure component is mounted to avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className='flex items-center justify-center w-full h-full'>
        <div className='animate-pulse bg-background rounded-[2.5rem] w-[280px] h-[560px]' />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center w-full h-full',
        className
      )}
    >
      <div className='relative'>
        {/* iPhone Frame */}
        <div className='relative bg-secondary rounded-[2.5rem] p-1 shadow-2xl'>
          <div className='bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden relative'>
            {/* iPhone Notch */}
            <div className='absolute top-1 left-1/2 transform -translate-x-1/2 w-28 h-6.5 bg-black rounded-full z-10' />

            {/* Media Container - Fixed proportions for iPhone 14 Pro (393x852) */}
            <div className='relative w-[260px] h-[560px] overflow-hidden rounded-[2rem]'>
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
            </div>
          </div>
        </div>

        {/* iPhone Home Indicator */}
        {/* <div className='absolute bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-400 dark:bg-gray-600 rounded-full' /> */}
      </div>
    </div>
  );
};
