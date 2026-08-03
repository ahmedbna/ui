'use client';

import { IPhonePreview } from '@/components/iphone-preview';

const items = [
  {
    light: 'https://ui.ahmedbna.com/0390-stacked-area-chart-large.MOV',
    dark: 'https://ui.ahmedbna.com/0390-stacked-area-chart-large.MOV',
  },
  {
    light: 'https://ui.ahmedbna.com/0398-treemap-chart-large.MP4',
    dark: 'https://ui.ahmedbna.com/0398-treemap-chart-large.MP4',
  },
  {
    light: 'https://ui.ahmedbna.com/0350-column-chart-large.mov',
    dark: 'https://ui.ahmedbna.com/0350-column-chart-large.mov',
  },
  {
    light: 'https://ui.ahmedbna.com/0358-heatmap-chart-large.MOV',
    dark: 'https://ui.ahmedbna.com/0358-heatmap-chart-large.MOV',
  },
  {
    light: 'https://ui.ahmedbna.com/0356-heatmap-chart-sample.MOV',
    dark: 'https://ui.ahmedbna.com/0356-heatmap-chart-sample.MOV',
  },
  {
    light: 'https://ui.ahmedbna.com/0337-bubble-chart-demo.mov',
    dark: 'https://ui.ahmedbna.com/0337-bubble-chart-demo.mov',
  },
  {
    light: 'https://ui.ahmedbna.com/0394-stacked-bar-chart-large.mov',
    dark: 'https://ui.ahmedbna.com/0394-stacked-bar-chart-large.mov',
  },
  {
    light: 'https://ui.ahmedbna.com/0381-radial-bar-chart-gradient.MOV',
    dark: 'https://ui.ahmedbna.com/0381-radial-bar-chart-gradient.MOV',
  },
  {
    light: 'https://ui.ahmedbna.com/0333-area-chart-large.mov',
    dark: 'https://ui.ahmedbna.com/0333-area-chart-large.mov',
  },
  {
    light: 'https://ui.ahmedbna.com/0354-doughnut-chart-large.MOV',
    dark: 'https://ui.ahmedbna.com/0354-doughnut-chart-large.MOV',
  },
  {
    light: 'https://ui.ahmedbna.com/0334-bar-chart-demo.mov',
    dark: 'https://ui.ahmedbna.com/0334-bar-chart-demo.mov',
  },
  {
    light: 'https://ui.ahmedbna.com/0341-candlestick-chart-demo.MP4',
    dark: 'https://ui.ahmedbna.com/0341-candlestick-chart-demo.MP4',
  },

  {
    light: 'https://ui.ahmedbna.com/0370-polar-area-chart-large.MOV',
    dark: 'https://ui.ahmedbna.com/0370-polar-area-chart-large.MOV',
  },
  {
    light: 'https://ui.ahmedbna.com/0374-progress-ring-chart-large.MOV',
    dark: 'https://ui.ahmedbna.com/0374-progress-ring-chart-large.MOV',
  },
  {
    light: 'https://ui.ahmedbna.com/0375-radar-chart-demo.MOV',
    dark: 'https://ui.ahmedbna.com/0375-radar-chart-demo.MOV',
  },

  {
    light: 'https://ui.ahmedbna.com/0386-scatter-chart-large.MOV',
    dark: 'https://ui.ahmedbna.com/0386-scatter-chart-large.MOV',
  },

  {
    light: 'https://ui.ahmedbna.com/0393-stacked-bar-chart-styled.mov',
    dark: 'https://ui.ahmedbna.com/0393-stacked-bar-chart-styled.mov',
  },
  {
    light: 'https://ui.ahmedbna.com/0380-radial-bar-chart-sample.MOV',
    dark: 'https://ui.ahmedbna.com/0380-radial-bar-chart-sample.MOV',
  },
  {
    light: 'https://ui.ahmedbna.com/0366-pie-chart-large.MOV',
    dark: 'https://ui.ahmedbna.com/0366-pie-chart-large.MOV',
  },
  {
    light: 'https://ui.ahmedbna.com/0361-line-chart-styled.MOV',
    dark: 'https://ui.ahmedbna.com/0361-line-chart-styled.MOV',
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
