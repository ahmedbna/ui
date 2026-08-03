'use client';

import { IPhonePreview } from '@/components/iphone-preview';

const items = [
  {
    light: 'https://ui.ahmedbna.com/0146-gallery-grid.MP4',
    dark: 'https://ui.ahmedbna.com/0146-gallery-grid.MP4',
  },
  {
    light: 'https://ui.ahmedbna.com/0103-carousel-manual.MP4',
    dark: 'https://ui.ahmedbna.com/0103-carousel-manual.MP4',
  },
  {
    light: 'https://ui.ahmedbna.com/0132-date-picker-datetime.MP4',
    dark: 'https://ui.ahmedbna.com/0132-date-picker-datetime.MP4',
  },
  {
    light: 'https://ui.ahmedbna.com/0205-parallax-scrollview-demo.MP4',
    dark: 'https://ui.ahmedbna.com/0205-parallax-scrollview-demo.MP4',
  },
  {
    light: 'https://ui.ahmedbna.com/0030-audio-player-music.MP4',
    dark: 'https://ui.ahmedbna.com/0030-audio-player-music.MP4',
  },
  {
    light: 'https://ui.ahmedbna.com/0069-bottom-sheet-list.MP4',
    dark: 'https://ui.ahmedbna.com/0069-bottom-sheet-list.MP4',
  },
  {
    light: 'https://ui.ahmedbna.com/0225-popover-menu.MP4',
    dark: 'https://ui.ahmedbna.com/0225-popover-menu.MP4',
  },
  {
    light: 'https://ui.ahmedbna.com/0048-avatar-styled.PNG',
    dark: 'https://ui.ahmedbna.com/0048-avatar-styled.PNG',
  },
  {
    light: 'https://ui.ahmedbna.com/0094-card-stats.PNG',
    dark: 'https://ui.ahmedbna.com/0094-card-stats.PNG',
  },
  {
    light: 'https://ui.ahmedbna.com/0083-camera-demo.mov',
    dark: 'https://ui.ahmedbna.com/0083-camera-demo.mov',
  },
  {
    light: 'https://ui.ahmedbna.com/0116-color-picker-sizes.MP4',
    dark: 'https://ui.ahmedbna.com/0116-color-picker-sizes.MP4',
  },
  {
    light: 'https://ui.ahmedbna.com/0123-combobox-demo.MP4',
    dark: 'https://ui.ahmedbna.com/0123-combobox-demo.MP4',
  },
  {
    light: 'https://ui.ahmedbna.com/0167-input-otp-demo.MP4',
    dark: 'https://ui.ahmedbna.com/0167-input-otp-demo.MP4',
  },
  {
    light: 'https://ui.ahmedbna.com/0198-onboarding-demo.MP4',
    dark: 'https://ui.ahmedbna.com/0198-onboarding-demo.MP4',
  },
  {
    light: 'https://ui.ahmedbna.com/0182-input-form.MP4',
    dark: 'https://ui.ahmedbna.com/0182-input-form.MP4',
  },
  {
    light: 'https://ui.ahmedbna.com/0293-table-demo.MP4',
    dark: 'https://ui.ahmedbna.com/0293-table-demo.MP4',
  },
  {
    light: 'https://ui.ahmedbna.com/0307-toast-variants.MP4',
    dark: 'https://ui.ahmedbna.com/0307-toast-variants.MP4',
  },
  {
    light: 'https://ui.ahmedbna.com/0275-skeleton-card.MP4',
    dark: 'https://ui.ahmedbna.com/0275-skeleton-card.MP4',
  },
  {
    light: 'https://ui.ahmedbna.com/0284-spinner-colors.MP4',
    dark: 'https://ui.ahmedbna.com/0284-spinner-colors.MP4',
  },
  {
    light: 'https://ui.ahmedbna.com/0299-tabs-demo.MP4',
    dark: 'https://ui.ahmedbna.com/0299-tabs-demo.MP4',
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
