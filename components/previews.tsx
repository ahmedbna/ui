'use client';

import { IPhonePreview } from '@/components/iphone-preview';

const items = [
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-01-2025 02-51-01_1.MP4',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-01-2025 02-51-01_1.MP4',
  },
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-30-2025 23-14-20_1.MP4',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-30-2025 23-14-20_1.MP4',
  },
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-01-2025 01-09-54_1.MP4',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-01-2025 01-09-54_1.MP4',
  },
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-01-2025 08-33-25_1.MP4',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-01-2025 08-33-25_1.MP4',
  },
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 20-13-01_1.MP4',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 20-13-01_1.MP4',
  },
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 23-00-33_1.MP4',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-29-2025 23-00-33_1.MP4',
  },
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-01-2025 09-23-30_1.MP4',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-01-2025 09-23-30_1.MP4',
  },
  {
    light: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/IMG_5449.PNG',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/IMG_5449.PNG',
  },
  {
    light: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/IMG_5494.PNG',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/IMG_5494.PNG',
  },
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-30-2025 01-48-08_1.mov',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-30-2025 01-48-08_1.mov',
  },
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-30-2025 23-22-23_1.MP4',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-30-2025 23-22-23_1.MP4',
  },
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-30-2025 23-30-31_1.MP4',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_06-30-2025 23-30-31_1.MP4',
  },
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-01-2025 06-34-14_1.MP4',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-01-2025 06-34-14_1.MP4',
  },
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-01-2025 07-20-37_1.MP4',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-01-2025 07-20-37_1.MP4',
  },
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-01-2025 06-33-17_1.MP4',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-01-2025 06-33-17_1.MP4',
  },
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-01-2025 11-10-10_1.MP4',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-01-2025 11-10-10_1.MP4',
  },
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-02-2025 06-25-51_1.MP4',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-02-2025 06-25-51_1.MP4',
  },
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-01-2025 10-43-03_1.MP4',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-01-2025 10-43-03_1.MP4',
  },
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-01-2025 10-49-03_1.MP4',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-01-2025 10-49-03_1.MP4',
  },
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-02-2025 06-18-46_1.MP4',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-02-2025 06-18-46_1.MP4',
  },
];

export const Previews = () => {
  return (
    <div className='container justify-center flex flex-wrap items-center gap-2 text-center lg:gap-3'>
      {items.map((item) => (
        <div key={item.dark}>
          <IPhonePreview preview={item} showCode={false} />
        </div>
      ))}
    </div>
  );
};
