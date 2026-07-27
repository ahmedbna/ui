'use client';

import { IPhonePreview } from '@/components/iphone-preview';

const items = [
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 21.MOV',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 21.MOV',
  },
  {
    light: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/treemap-large.MP4',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/treemap-large.MP4',
  },
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-14-2025 17-50-19_1.mov',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-14-2025 17-50-19_1.mov',
  },
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 49.MOV',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 49.MOV',
  },
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 51.MOV',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 51.MOV',
  },
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 15-40-44_1.mov',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 15-40-44_1.mov',
  },
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 15-56-05_1.mov',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 15-56-05_1.mov',
  },
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 26.MOV',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 26.MOV',
  },
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 16.mov',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 16.mov',
  },
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 53.MOV',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 53.MOV',
  },
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 15-22-22_1.mov',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 15-22-22_1.mov',
  },
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 15-42-29_1.MP4',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 15-42-29_1.MP4',
  },

  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 37.MOV',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 37.MOV',
  },
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 33.MOV',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 33.MOV',
  },
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 32.MOV',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 32.MOV',
  },

  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 39.MOV',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 39.MOV',
  },

  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 15-47-37_1 9.19.10 PM.mov',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 15-47-37_1 9.19.10 PM.mov',
  },
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 27.MOV',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 27.MOV',
  },
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 41.MOV',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 41.MOV',
  },
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 46.MOV',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/ScreenRecording_07-12-2025 46.MOV',
  },
];

export const ChartsPreview = () => {
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
