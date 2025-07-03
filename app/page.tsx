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

const title = 'Build your Component Library';
const description =
  'Beautifully-designed, accessible React Native components. Built for Expo and React Native. Open Source. Open Code.';
export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title,
  description,
};

export default function Home() {
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
    </div>
  );
}
