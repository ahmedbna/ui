import { areaChartRegistry } from '@/templates/registry/charts/area-chart';
import { barChartRegistry } from '@/templates/registry/charts/bar-chart';
import { bubbleChartRegistry } from '@/templates/registry/charts/bubble-chart';
import { candlestickChartRegistry } from '@/templates/registry/charts/candlestick-chart';
import { chartContainerRegistry } from '@/templates/registry/charts/chart-container';
import { columnChartRegistry } from '@/templates/registry/charts/column-chart';
import { doughnutChartRegistry } from '@/templates/registry/charts/doughnut-chart';
import { heatmapChartRegistry } from '@/templates/registry/charts/heatmap-chart';
import { lineChartRegistry } from '@/templates/registry/charts/line-chart';
import { pieChartRegistry } from '@/templates/registry/charts/pie-chart';
import { polarAreaChartRegistry } from '@/templates/registry/charts/polar-area-chart';
import { progressRingChartRegistry } from '@/templates/registry/charts/progress-ring-chart';
import { radarChartRegistry } from '@/templates/registry/charts/radar-chart';
import { radialBarChartRegistry } from '@/templates/registry/charts/radial-bar-chart';
import { scatterChartRegistry } from '@/templates/registry/charts/scatter-chart';
import { stackedAreaChartRegistry } from '@/templates/registry/charts/stacked-area-chart';
import { stackedBarChartRegistry } from '@/templates/registry/charts/stacked-bar-chart';
import { treemapChartRegistry } from '@/templates/registry/charts/treemap-chart';

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
