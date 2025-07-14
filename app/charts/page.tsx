import Link from 'next/link';
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { ChartsPreview } from '@/components/charts-preview';

export const dynamic = 'force-static';
export const revalidate = false;

export default function Charts() {
  return (
    <div className='flex flex-1 flex-col'>
      <PageHeader>
        <h1 className='pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-6xl font-black  text-transparent dark:from-white dark:to-slate-900/10'>
          BNA UI
        </h1>
        <PageHeaderHeading>
          Charts For Your Expo React Native App
        </PageHeaderHeading>
        <PageHeaderDescription>
          Beautiful, accessible Expo React Native charts that work seamlessly
          across iOS and Android
        </PageHeaderDescription>
        <PageActions>
          <Button asChild size='sm'>
            <Link href='/docs/charts'>Get Started</Link>
          </Button>
        </PageActions>
      </PageHeader>

      <ChartsPreview />
    </div>
  );
}
