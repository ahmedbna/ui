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

const title = 'Expo React Native UI Components Library';
const description =
  'Beautiful, accessible Expo, React Native components that work seamlessly across iOS and Android';
export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: 'BNA UI',
  description: title,
  openGraph: {
    title: 'BNA UI',
    description:
      'Beautiful, accessible Expo, React Native components that work seamlessly across iOS and Android',
    url: 'https://ui.ahmedbna.com',
    siteName: 'BNA UI',
    images: [
      {
        url: 'https://bna-ui.s3.eu-north-1.amazonaws.com/bna-ui-header.png', // Must be absolute URL
        alt: 'BNA UI',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BNA UI',
    description:
      'Beautiful, accessible Expo, React Native components that work seamlessly across iOS and Android',
    images: ['https://bna-ui.s3.eu-north-1.amazonaws.com/bna-ui-header.png'],
  },
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

      <Previews />
    </div>
  );
}
