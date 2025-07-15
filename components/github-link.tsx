'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { siteConfig } from '@/lib/config';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export function GitHubLink() {
  return (
    <Button asChild size='sm' variant='ghost' className='h-8 shadow-none'>
      <Link href={siteConfig.links.github} target='_blank' rel='noreferrer'>
        <Icons.gitHub />
        <React.Suspense fallback={<Skeleton className='h-4 w-8' />}>
          <StarsCount />
        </React.Suspense>
      </Link>
    </Button>
  );
}

export function StarsCount() {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    fetch('https://api.github.com/repos/ahmedbna/ui')
      .then((res) => res.json())
      .then((data) => setStars(data.stargazers_count));
  }, []);

  return (
    <span className='text-muted-foreground text-xs tabular-nums'>
      {stars === null
        ? '...'
        : stars >= 1000
        ? `${(stars / 1000).toFixed(1)}k`
        : stars.toLocaleString()}
    </span>
  );
}
