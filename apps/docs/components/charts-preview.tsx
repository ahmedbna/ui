'use client';

import { IPhonePreview } from '@/components/iphone-preview';

const items = [
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0390-stacked-area-chart-large.MOV',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0390-stacked-area-chart-large.MOV',
  },
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0398-treemap-chart-large.MP4',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0398-treemap-chart-large.MP4',
  },
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0350-column-chart-large.mov',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0350-column-chart-large.mov',
  },
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0358-heatmap-chart-large.MOV',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0358-heatmap-chart-large.MOV',
  },
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0356-heatmap-chart-sample.MOV',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0356-heatmap-chart-sample.MOV',
  },
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0337-bubble-chart-demo.mov',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0337-bubble-chart-demo.mov',
  },
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0394-stacked-bar-chart-large.mov',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0394-stacked-bar-chart-large.mov',
  },
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0381-radial-bar-chart-gradient.MOV',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0381-radial-bar-chart-gradient.MOV',
  },
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0333-area-chart-large.mov',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0333-area-chart-large.mov',
  },
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0354-doughnut-chart-large.MOV',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0354-doughnut-chart-large.MOV',
  },
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0334-bar-chart-demo.mov',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0334-bar-chart-demo.mov',
  },
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0341-candlestick-chart-demo.MP4',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0341-candlestick-chart-demo.MP4',
  },

  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0370-polar-area-chart-large.MOV',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0370-polar-area-chart-large.MOV',
  },
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0374-progress-ring-chart-large.MOV',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0374-progress-ring-chart-large.MOV',
  },
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0375-radar-chart-demo.MOV',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0375-radar-chart-demo.MOV',
  },

  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0386-scatter-chart-large.MOV',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0386-scatter-chart-large.MOV',
  },

  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0393-stacked-bar-chart-styled.mov',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0393-stacked-bar-chart-styled.mov',
  },
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0380-radial-bar-chart-sample.MOV',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0380-radial-bar-chart-sample.MOV',
  },
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0366-pie-chart-large.MOV',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0366-pie-chart-large.MOV',
  },
  {
    light:
      'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0361-line-chart-styled.MOV',
    dark: 'https://cdn.jsdelivr.net/gh/ahmedbna/bna-ui-demo/0361-line-chart-styled.MOV',
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
