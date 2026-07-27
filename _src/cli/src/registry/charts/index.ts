import { areaChartRegistry } from './area-chart.js';
import { barChartRegistry } from './bar-chart.js';
import { bubbleChartRegistry } from './bubble-chart.js';
import { candlestickChartRegistry } from './candlestick-chart.js';
import { chartContainerRegistry } from './chart-container.js';
import { columnChartRegistry } from './column-chart.js';
import { doughnutChartRegistry } from './doughnut-chart.js';
import { heatmapChartRegistry } from './heatmap-chart.js';
import { lineChartRegistry } from './line-chart.js';
import { pieChartRegistry } from './pie-chart.js';
import { polarAreaChartRegistry } from './polar-area-chart.js';
import { progressRingChartRegistry } from './progress-ring-chart.js';
import { radarChartRegistry } from './radar-chart.js';
import { radialBarChartRegistry } from './radial-bar-chart.js';
import { scatterChartRegistry } from './scatter-chart.js';
import { stackedAreaChartRegistry } from './stacked-area-chart.js';
import { stackedBarChartRegistry } from './stacked-bar-chart.js';
import { treemapChartRegistry } from './treemap-chart.js';

export const chartsRegistry = {
  ...areaChartRegistry,
  ...barChartRegistry,
  ...bubbleChartRegistry,
  ...candlestickChartRegistry,
  ...chartContainerRegistry,
  ...columnChartRegistry,
  ...doughnutChartRegistry,
  ...heatmapChartRegistry,
  ...lineChartRegistry,
  ...pieChartRegistry,
  ...polarAreaChartRegistry,
  ...progressRingChartRegistry,
  ...radarChartRegistry,
  ...radialBarChartRegistry,
  ...scatterChartRegistry,
  ...stackedAreaChartRegistry,
  ...stackedBarChartRegistry,
  ...treemapChartRegistry,
};
