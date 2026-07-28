// components/charts-demo.tsx

import { AreaChart } from '@/components/charts/area-chart';
import { BarChart } from '@/components/charts/bar-chart';
import { BubbleChart } from '@/components/charts/bubble-chart';
import { CandlestickChart } from '@/components/charts/candlestick-chart';
import { ChartContainer } from '@/components/charts/chart-container';
import { ColumnChart } from '@/components/charts/column-chart';
import { DoughnutChart } from '@/components/charts/doughnut-chart';
import { HeatmapChart } from '@/components/charts/heatmap-chart';
import { LineChart } from '@/components/charts/line-chart';
import { PieChart } from '@/components/charts/pie-chart';
import { PolarAreaChart } from '@/components/charts/polar-area-chart';
import { ProgressRingChart } from '@/components/charts/progress-ring-chart';
import { RadarChart } from '@/components/charts/radar-chart';
import { RadialBarChart } from '@/components/charts/radial-bar-chart';
import { ScatterPlot } from '@/components/charts/scatter-chart';
import {
  StackedAreaChart,
  StackedAreaDataPoint,
} from '@/components/charts/stacked-area-chart';
import {
  StackedBarChart,
  StackedBarDataPoint,
} from '@/components/charts/stacked-bar-chart';
import {
  TreeMapChart,
  TreeMapDataPoint,
} from '@/components/charts/treemap-chart';

import { Text } from '@/components/ui/text';
import React from 'react';
import { View } from 'react-native';

// Generated once at module scope. `Math.random()` in the render body is impure
// — it would redraw this series differently on every re-render, and React now
// flags it.
const highFrequencyData = Array.from({ length: 50 }, (_, i) => ({
  x: i,
  y: Math.sin(i * 0.2) * 30 + 50 + Math.random() * 10,
  label: `Point ${i + 1}`,
}));

export const ChartsDemo: React.FC = () => {
  // Sample data for different chart types
  const lineChartData = [
    { x: 1, y: 10, label: 'Jan' },
    { x: 2, y: 25, label: 'Feb' },
    { x: 3, y: 15, label: 'Mar' },
    { x: 4, y: 40, label: 'Apr' },
    { x: 5, y: 30, label: 'May' },
    { x: 6, y: 55, label: 'Jun' },
    { x: 7, y: 45, label: 'Jul' },
  ];

  const barChartData = [
    { label: 'Q1', value: 4500 },
    { label: 'Q2', value: 6200 },
    { label: 'Q3', value: 5800 },
    { label: 'Q4', value: 7200 },
  ];

  const pieChartData = [
    { label: 'Mobile', value: 45 },
    { label: 'Desktop', value: 35 },
    { label: 'Tablet', value: 20 },
  ];

  const areaChartData = [
    { x: 1, y: 20 },
    { x: 2, y: 35 },
    { x: 3, y: 25 },
    { x: 4, y: 50 },
    { x: 5, y: 40 },
    { x: 6, y: 65 },
    { x: 7, y: 55 },
  ];

  const columnChartData = [
    { label: 'Marketing', value: 85, color: '#FF6B6B' },
    { label: 'Development', value: 72, color: '#4ECDC4' },
    { label: 'Design', value: 68, color: '#45B7D1' },
    { label: 'Sales', value: 91, color: '#96CEB4' },
    { label: 'Support', value: 79, color: '#FFEAA7' },
  ];

  const doughnutChartData = [
    { label: 'React', value: 40, color: '#61DAFB' },
    { label: 'Vue', value: 25, color: '#4FC08D' },
    { label: 'Angular', value: 20, color: '#DD0031' },
    { label: 'Svelte', value: 10, color: '#FF3E00' },
    { label: 'Other', value: 5, color: '#8B5CF6' },
  ];

  const scatterPlotData = [
    { x: 10, y: 20 },
    { x: 15, y: 35 },
    { x: 20, y: 25 },
    { x: 25, y: 45 },
    { x: 30, y: 40 },
    { x: 35, y: 60 },
    { x: 40, y: 55 },
    { x: 45, y: 70 },
    { x: 50, y: 65 },
    { x: 55, y: 80 },
  ];

  const bubbleChartData = [
    { x: 10, y: 20, size: 15, label: 'A', color: '#FF6B6B' },
    { x: 25, y: 35, size: 25, label: 'B', color: '#4ECDC4' },
    { x: 40, y: 25, size: 20, label: 'C', color: '#45B7D1' },
    { x: 55, y: 45, size: 30, label: 'D', color: '#96CEB4' },
    { x: 70, y: 40, size: 18, label: 'E', color: '#FFEAA7' },
    { x: 85, y: 60, size: 35, label: 'F', color: '#FDA7DF' },
  ];

  const radarChartData = [
    { label: 'Speed', value: 80 },
    { label: 'Reliability', value: 90 },
    { label: 'Comfort', value: 70 },
    { label: 'Safety', value: 95 },
    { label: 'Efficiency', value: 85 },
    { label: 'Design', value: 75 },
  ];

  const polarAreaData = [
    { label: 'JavaScript', value: 35, color: '#F7DF1E' },
    { label: 'Python', value: 25, color: '#3776AB' },
    { label: 'Java', value: 20, color: '#ED8B00' },
    { label: 'C++', value: 15, color: '#00599C' },
    { label: 'Go', value: 10, color: '#00ADD8' },
    { label: 'Rust', value: 8, color: '#000000' },
  ];

  // Candlestick data for stock price visualization
  const candlestickData = [
    { date: 'Jan 1', open: 100, high: 110, low: 95, close: 105 },
    { date: 'Jan 2', open: 105, high: 115, low: 102, close: 112 },
    { date: 'Jan 3', open: 112, high: 118, low: 108, close: 110 },
    { date: 'Jan 4', open: 110, high: 114, low: 106, close: 108 },
    { date: 'Jan 5', open: 108, high: 120, low: 107, close: 118 },
    { date: 'Jan 6', open: 118, high: 125, low: 115, close: 122 },
    { date: 'Jan 7', open: 122, high: 128, low: 119, close: 125 },
    { date: 'Jan 8', open: 125, high: 130, low: 123, close: 127 },
    { date: 'Jan 9', open: 127, high: 135, low: 124, close: 132 },
    { date: 'Jan 10', open: 132, high: 138, low: 129, close: 135 },
  ];

  // Heatmap data for activity visualization
  const heatmapData = [
    // Week 1
    { row: 'Mon', col: 'Week 1', value: 12, label: 'Monday W1' },
    { row: 'Tue', col: 'Week 1', value: 18, label: 'Tuesday W1' },
    { row: 'Wed', col: 'Week 1', value: 25, label: 'Wednesday W1' },
    { row: 'Thu', col: 'Week 1', value: 22, label: 'Thursday W1' },
    { row: 'Fri', col: 'Week 1', value: 35, label: 'Friday W1' },
    { row: 'Sat', col: 'Week 1', value: 8, label: 'Saturday W1' },
    { row: 'Sun', col: 'Week 1', value: 5, label: 'Sunday W1' },
    // Week 2
    { row: 'Mon', col: 'Week 2', value: 15, label: 'Monday W2' },
    { row: 'Tue', col: 'Week 2', value: 28, label: 'Tuesday W2' },
    { row: 'Wed', col: 'Week 2', value: 32, label: 'Wednesday W2' },
    { row: 'Thu', col: 'Week 2', value: 29, label: 'Thursday W2' },
    { row: 'Fri', col: 'Week 2', value: 40, label: 'Friday W2' },
    { row: 'Sat', col: 'Week 2', value: 12, label: 'Saturday W2' },
    { row: 'Sun', col: 'Week 2', value: 7, label: 'Sunday W2' },
    // Week 3
    { row: 'Mon', col: 'Week 3', value: 20, label: 'Monday W3' },
    { row: 'Tue', col: 'Week 3', value: 31, label: 'Tuesday W3' },
    { row: 'Wed', col: 'Week 3', value: 28, label: 'Wednesday W3' },
    { row: 'Thu', col: 'Week 3', value: 26, label: 'Thursday W3' },
    { row: 'Fri', col: 'Week 3', value: 38, label: 'Friday W3' },
    { row: 'Sat', col: 'Week 3', value: 10, label: 'Saturday W3' },
    { row: 'Sun', col: 'Week 3', value: 6, label: 'Sunday W3' },
    // Week 4
    { row: 'Mon', col: 'Week 4', value: 17, label: 'Monday W4' },
    { row: 'Tue', col: 'Week 4', value: 24, label: 'Tuesday W4' },
    { row: 'Wed', col: 'Week 4', value: 30, label: 'Wednesday W4' },
    { row: 'Thu', col: 'Week 4', value: 33, label: 'Thursday W4' },
    { row: 'Fri', col: 'Week 4', value: 42, label: 'Friday W4' },
    { row: 'Sat', col: 'Week 4', value: 14, label: 'Saturday W4' },
    { row: 'Sun', col: 'Week 4', value: 9, label: 'Sunday W4' },
  ];

  const radialBarData = [
    { label: 'Sales', value: 85, color: '#3b82f6' },
    { label: 'Marketing', value: 70, color: '#ef4444' },
    { label: 'Development', value: 90, color: '#10b981' },
    { label: 'Support', value: 65, color: '#f59e0b' },
    { label: 'Design', value: 75, color: '#8b5cf6' },
  ];

  const treeMapData: TreeMapDataPoint[] = [
    { label: 'Frontend', value: 45, color: '#3b82f6' },
    { label: 'Backend', value: 35, color: '#ef4444' },
    { label: 'Database', value: 25, color: '#10b981' },
    { label: 'DevOps', value: 20, color: '#f59e0b' },
    { label: 'Testing', value: 15, color: '#8b5cf6' },
    { label: 'Documentation', value: 10, color: '#06b6d4' },
    { label: 'Security', value: 12, color: '#f97316' },
    { label: 'Analytics', value: 8, color: '#84cc16' },
  ];

  const teamProductivityData = [
    { label: 'Q1 Goals', value: 78, color: '#22c55e' },
    { label: 'Q2 Goals', value: 92, color: '#3b82f6' },
    { label: 'Q3 Goals', value: 65, color: '#f59e0b' },
    { label: 'Q4 Goals', value: 88, color: '#ef4444' },
  ];

  const projectAllocationData: TreeMapDataPoint[] = [
    { label: 'Mobile App', value: 40 },
    { label: 'Web Platform', value: 30 },
    { label: 'API Development', value: 25 },
    { label: 'Infrastructure', value: 20 },
    { label: 'Data Analytics', value: 15 },
    { label: 'Machine Learning', value: 12 },
    { label: 'QA & Testing', value: 10 },
    { label: 'Documentation', value: 8 },
    { label: 'DevOps', value: 18 },
    { label: 'Security', value: 14 },
  ];

  const stackedAreaData: StackedAreaDataPoint[] = [
    { x: 1, y: [20, 15, 10], label: 'Jan' },
    { x: 2, y: [25, 18, 12], label: 'Feb' },
    { x: 3, y: [22, 20, 15], label: 'Mar' },
    { x: 4, y: [30, 22, 18], label: 'Apr' },
    { x: 5, y: [28, 25, 20], label: 'May' },
    { x: 6, y: [35, 28, 22], label: 'Jun' },
    { x: 7, y: [32, 30, 25], label: 'Jul' },
    { x: 8, y: [38, 32, 28], label: 'Aug' },
  ];

  const trafficStackedData: StackedAreaDataPoint[] = [
    { x: 1, y: [1200, 800, 400, 200], label: 'Week 1' },
    { x: 2, y: [1400, 900, 450, 250], label: 'Week 2' },
    { x: 3, y: [1100, 850, 500, 300], label: 'Week 3' },
    { x: 4, y: [1600, 950, 550, 350], label: 'Week 4' },
    { x: 5, y: [1800, 1000, 600, 400], label: 'Week 5' },
    { x: 6, y: [1500, 1100, 650, 450], label: 'Week 6' },
    { x: 7, y: [1900, 1200, 700, 500], label: 'Week 7' },
    { x: 8, y: [2000, 1300, 750, 550], label: 'Week 8' },
  ];

  const revenueStackedData: StackedAreaDataPoint[] = [
    { x: 1, y: [50000, 30000, 20000], label: 'Q1' },
    { x: 2, y: [55000, 35000, 25000], label: 'Q2' },
    { x: 3, y: [48000, 32000, 22000], label: 'Q3' },
    { x: 4, y: [62000, 40000, 28000], label: 'Q4' },
  ];

  const stackedBarData: StackedBarDataPoint[] = [
    { label: 'Q1', values: [20, 15, 10] },
    { label: 'Q2', values: [25, 20, 15] },
    { label: 'Q3', values: [30, 18, 12] },
    { label: 'Q4', values: [35, 22, 18] },
  ];

  const stackedBarDataDetailed: StackedBarDataPoint[] = [
    { label: 'Marketing', values: [45, 30, 25, 15] },
    { label: 'Sales', values: [60, 35, 20, 10] },
    { label: 'Development', values: [40, 45, 35, 25] },
    { label: 'Support', values: [35, 25, 30, 20] },
    { label: 'Design', values: [30, 40, 20, 15] },
  ];

  const stackedBarCategories = ['Product A', 'Product B', 'Product C'];
  const stackedBarCategoriesDetailed = [
    'Revenue',
    'Costs',
    'Profit',
    'Investment',
  ];

  return (
    <View style={{ width: '100%' }}>
      <Text
        variant='heading'
        style={{ marginBottom: 30, textAlign: 'center', fontSize: 24 }}
      >
        Complete Charts Library Demo
      </Text>

      {/* Line Chart */}
      <ChartContainer
        title='Revenue Trend'
        description='Monthly revenue growth over time'
      >
        <LineChart
          data={lineChartData}
          config={{
            height: 220,
            showGrid: true,
            showLabels: true,
            animated: true,
            duration: 1500,
            interactive: true,
          }}
        />
      </ChartContainer>

      {/* Area Chart */}
      <ChartContainer
        title='Website Traffic'
        description='Daily visitors with gradient fill'
      >
        <AreaChart
          data={areaChartData}
          config={{
            height: 200,
            showGrid: true,
            showLabels: false,
            animated: true,
            duration: 1800,
            gradient: true,
          }}
        />
      </ChartContainer>

      {/* Bar Chart (Vertical) */}
      <ChartContainer
        title='Quarterly Sales'
        description='Sales performance by quarter'
      >
        <BarChart
          data={barChartData}
          config={{
            height: 200,
            showLabels: true,
            animated: true,
            duration: 1000,
          }}
        />
      </ChartContainer>

      {/* Column Chart (Horizontal) */}
      <ChartContainer
        title='Department Performance'
        description='Performance metrics by department'
      >
        <ColumnChart
          data={columnChartData}
          config={{
            height: 250,
            showLabels: true,
            animated: true,
            duration: 1200,
          }}
        />
      </ChartContainer>

      {/* Pie Chart */}
      <ChartContainer
        title='Device Usage'
        description='User device preferences'
      >
        <PieChart
          data={pieChartData}
          config={{
            height: 250,
            showLabels: true,
            animated: true,
            duration: 1200,
          }}
        />
      </ChartContainer>

      {/* Doughnut Chart */}
      <ChartContainer
        title='Frontend Framework Usage'
        description='Popular frontend frameworks in 2024'
      >
        <DoughnutChart
          data={doughnutChartData}
          config={{
            height: 300,
            showLabels: true,
            animated: true,
            duration: 1500,
            innerRadius: 0.6,
          }}
        />
      </ChartContainer>

      {/* Scatter Plot */}
      <ChartContainer
        title='Performance vs Experience'
        description='Correlation between experience and performance scores'
      >
        <ScatterPlot
          data={scatterPlotData}
          config={{
            height: 220,
            showGrid: true,
            showLabels: true,
            animated: true,
            duration: 1000,
          }}
        />
      </ChartContainer>

      {/* Bubble Chart */}
      <ChartContainer
        title='Product Portfolio Analysis'
        description='Revenue vs Market Share (bubble size = profit margin)'
      >
        <BubbleChart
          data={bubbleChartData}
          config={{
            height: 250,
            showGrid: true,
            showLabels: true,
            animated: true,
            duration: 1300,
          }}
        />
      </ChartContainer>

      {/* Radar Chart */}
      <ChartContainer
        title='Product Evaluation'
        description='Multi-dimensional product assessment'
      >
        <RadarChart
          data={radarChartData}
          config={{
            height: 280,
            showLabels: true,
            animated: true,
            duration: 1600,
            maxValue: 100,
          }}
        />
      </ChartContainer>

      {/* Polar Area Chart */}
      <ChartContainer
        title='Programming Language Popularity'
        description='Usage distribution across programming languages'
      >
        <PolarAreaChart
          data={polarAreaData}
          config={{
            height: 300,
            showLabels: true,
            animated: true,
            duration: 1400,
          }}
        />
      </ChartContainer>

      {/* Interactive demo */}
      <ChartContainer
        title='Interactive Line Chart'
        description='Touch and drag to explore data points'
      >
        <LineChart
          data={lineChartData}
          config={{
            height: 200,
            showGrid: true,
            showLabels: true,
            animated: true,
            interactive: true,
            gradient: false,
          }}
        />
      </ChartContainer>

      {/* Custom Styled Charts */}
      <ChartContainer
        title='Custom Color Schemes'
        description='Charts with brand-specific colors'
      >
        <BarChart
          data={[
            { label: 'iOS', value: 65, color: '#007AFF' },
            { label: 'Android', value: 85, color: '#34C759' },
            { label: 'Web', value: 45, color: '#FF9500' },
            { label: 'Desktop', value: 35, color: '#AF52DE' },
          ]}
          config={{
            height: 180,
            showLabels: true,
            animated: true,
            duration: 800,
          }}
        />
      </ChartContainer>

      {/* High-frequency Data Example */}
      <ChartContainer
        title='High-Frequency Data'
        description='Large dataset visualization'
      >
        <LineChart
          data={highFrequencyData}
          config={{
            height: 200,
            showGrid: true,
            showLabels: false,
            animated: true,
            duration: 2000,
            interactive: true,
          }}
        />
      </ChartContainer>

      {/* Comparison Charts */}
      <ChartContainer
        title='Multi-Series Comparison'
        description='Comparing different data series'
      >
        <AreaChart
          data={[
            { x: 1, y: 20 },
            { x: 2, y: 45 },
            { x: 3, y: 35 },
            { x: 4, y: 60 },
            { x: 5, y: 50 },
            { x: 6, y: 75 },
            { x: 7, y: 65 },
            { x: 8, y: 80 },
          ]}
          config={{
            height: 220,
            showGrid: true,
            showLabels: true,
            animated: true,
            duration: 1500,
            gradient: true,
          }}
        />
      </ChartContainer>

      {/* Candlestick Chart */}
      <ChartContainer
        title='Stock Price Movement'
        description='Daily OHLC (Open, High, Low, Close) stock prices'
      >
        <CandlestickChart
          data={candlestickData}
          config={{
            height: 280,
            showLabels: true,
            animated: true,
            duration: 1500,
            showGrid: true,
          }}
        />
      </ChartContainer>

      {/* Heatmap Chart */}
      <ChartContainer
        title='Weekly Activity Heatmap'
        description='Daily activity levels across weeks'
      >
        <HeatmapChart
          data={heatmapData}
          config={{
            height: 300,
            showLabels: true,
            animated: true,
            duration: 1200,
            colorScale: ['#f0f9ff', '#0369a1', '#1e3a8a'], // Light to dark blue
          }}
        />
      </ChartContainer>

      {/* Progress Ring Charts */}
      <ChartContainer
        title='Progress Indicators'
        description='Various progress ring demo'
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            gap: 20,
          }}
        >
          <ProgressRingChart
            progress={75}
            size={100}
            strokeWidth={8}
            label='Downloads'
            config={{
              animated: true,
              duration: 1500,
              gradient: false,
            }}
          />

          <ProgressRingChart
            progress={92}
            size={100}
            strokeWidth={10}
            label='Storage'
            config={{
              animated: true,
              duration: 1800,
              gradient: true,
            }}
          />

          <ProgressRingChart
            progress={68}
            size={100}
            strokeWidth={6}
            label='CPU Usage'
            centerText='68%'
            config={{
              animated: true,
              duration: 1200,
              gradient: false,
            }}
          />
        </View>
      </ChartContainer>

      {/* Large Progress Ring */}
      <ChartContainer
        title='Project Completion'
        description='Overall project progress with custom styling'
      >
        <View style={{ alignItems: 'center' }}>
          <ProgressRingChart
            progress={84}
            size={180}
            strokeWidth={12}
            label='Project Alpha'
            centerText='84%'
            showLabel={true}
            config={{
              animated: true,
              duration: 2200,
              gradient: true,
            }}
          />
        </View>
      </ChartContainer>

      {/* Custom Color Heatmap */}
      <ChartContainer
        title='Sales Performance Heatmap'
        description='Regional sales data with custom color scheme'
      >
        <HeatmapChart
          data={[
            { row: 'North', col: 'Q1', value: 85 },
            { row: 'North', col: 'Q2', value: 92 },
            { row: 'North', col: 'Q3', value: 78 },
            { row: 'North', col: 'Q4', value: 95 },
            { row: 'South', col: 'Q1', value: 72 },
            { row: 'South', col: 'Q2', value: 88 },
            { row: 'South', col: 'Q3', value: 91 },
            { row: 'South', col: 'Q4', value: 86 },
            { row: 'East', col: 'Q1', value: 94 },
            { row: 'East', col: 'Q2', value: 89 },
            { row: 'East', col: 'Q3', value: 96 },
            { row: 'East', col: 'Q4', value: 93 },
            { row: 'West', col: 'Q1', value: 67 },
            { row: 'West', col: 'Q2', value: 74 },
            { row: 'West', col: 'Q3', value: 81 },
            { row: 'West', col: 'Q4', value: 79 },
          ]}
          config={{
            height: 250,
            showLabels: true,
            animated: true,
            duration: 1500,
            colorScale: ['#fef3c7', '#f59e0b', '#d97706', '#92400e'], // Yellow to brown gradient
          }}
        />
      </ChartContainer>

      {/* Radial Bar Chart */}
      <ChartContainer
        title='Department Performance'
        description='Performance metrics across different departments'
      >
        <RadialBarChart
          data={radialBarData}
          config={{
            animated: true,
            duration: 1500,
            gradient: true,
          }}
        />
      </ChartContainer>

      {/* TreeMap Chart */}
      <ChartContainer
        title='Development Resource Allocation'
        description='Time allocation across different development areas'
      >
        <TreeMapChart
          data={treeMapData}
          config={{
            height: 300,
            showLabels: true,
            animated: true,
            duration: 1200,
          }}
        />
      </ChartContainer>

      {/* Simple Radial Bar Chart */}
      <ChartContainer
        title='Quarterly Goal Achievement'
        description='Progress towards quarterly objectives'
      >
        <RadialBarChart
          data={teamProductivityData}
          config={{
            animated: true,
            duration: 1800,
            gradient: false,
          }}
        />
      </ChartContainer>

      {/* Large TreeMap Chart */}
      <ChartContainer
        title='Project Resource Distribution'
        description='Resource allocation across multiple projects'
      >
        <TreeMapChart
          data={projectAllocationData}
          config={{
            height: 350,
            showLabels: true,
            animated: true,
            duration: 1600,
          }}
        />
      </ChartContainer>

      {/* Interactive Radial Chart */}
      <ChartContainer
        title='Team Capacity Utilization'
        description='Real-time capacity tracking with animations'
      >
        <RadialBarChart
          data={[
            { label: 'Available', value: 25, color: '#22c55e' },
            { label: 'Assigned', value: 65, color: '#3b82f6' },
            { label: 'Overloaded', value: 10, color: '#ef4444' },
          ]}
          config={{
            animated: true,
            duration: 2000,
            gradient: true,
          }}
        />
      </ChartContainer>

      {/* Stacked Area Chart */}
      <ChartContainer
        title='Monthly Revenue Breakdown'
        description='Revenue distribution across product lines'
      >
        <StackedAreaChart
          data={stackedAreaData}
          categories={['Product A', 'Product B', 'Product C']}
          colors={['#3b82f6', '#ef4444', '#10b981']}
          config={{
            height: 250,
            showGrid: true,
            showLabels: true,
            animated: true,
            duration: 1500,
          }}
        />
      </ChartContainer>

      {/* Website Traffic Stacked Area */}
      <ChartContainer
        title='Website Traffic Sources'
        description='Weekly traffic breakdown by source'
      >
        <StackedAreaChart
          data={trafficStackedData}
          categories={['Direct', 'Social', 'Search', 'Referral']}
          colors={['#8b5cf6', '#f59e0b', '#06b6d4', '#84cc16']}
          config={{
            height: 280,
            showGrid: true,
            showLabels: true,
            animated: true,
            duration: 1800,
          }}
        />
      </ChartContainer>

      {/* Quarterly Revenue Stacked */}
      <ChartContainer
        title='Quarterly Revenue by Region'
        description='Revenue performance across different regions'
      >
        <StackedAreaChart
          data={revenueStackedData}
          categories={['North America', 'Europe', 'Asia Pacific']}
          colors={['#f97316', '#22c55e', '#a855f7']}
          config={{
            height: 220,
            showGrid: true,
            showLabels: true,
            animated: true,
            duration: 1200,
          }}
        />
      </ChartContainer>

      {/* Vertical Stacked Bar Chart */}
      <ChartContainer
        title='Quarterly Product Sales'
        description='Stacked sales data by product line'
      >
        <StackedBarChart
          data={stackedBarData}
          categories={stackedBarCategories}
          colors={['#4ECDC4', '#45B7D1', '#96CEB4']}
          config={{
            height: 250,
            showLabels: true,
            showGrid: true,
            animated: true,
            duration: 1400,
          }}
        />
      </ChartContainer>

      {/* Horizontal Stacked Bar Chart */}
      <ChartContainer
        title='Department Budget Breakdown'
        description='Budget allocation across departments (horizontal view)'
      >
        <StackedBarChart
          data={stackedBarDataDetailed}
          categories={stackedBarCategoriesDetailed}
          colors={['#FF6B6B', '#FFEAA7', '#81C784', '#64B5F6']}
          horizontal={true}
          config={{
            height: 300,
            showLabels: true,
            showGrid: true,
            animated: true,
            duration: 1600,
          }}
        />
      </ChartContainer>

      {/* Large Dataset Stacked Bar */}
      <ChartContainer
        title='Monthly Performance Metrics'
        description='Multi-category performance tracking'
      >
        <StackedBarChart
          data={[
            { label: 'Jan', values: [120, 80, 60, 40] },
            { label: 'Feb', values: [140, 90, 70, 50] },
            { label: 'Mar', values: [110, 85, 65, 45] },
            { label: 'Apr', values: [160, 95, 75, 55] },
            { label: 'May', values: [180, 100, 80, 60] },
            { label: 'Jun', values: [200, 110, 85, 65] },
            { label: 'Jul', values: [190, 105, 82, 62] },
            { label: 'Aug', values: [210, 115, 88, 68] },
          ]}
          categories={['Target', 'Achieved', 'Bonus', 'Extra']}
          colors={['#E8F5E8', '#A5D6A7', '#66BB6A', '#388E3C']}
          config={{
            height: 280,
            showLabels: true,
            showGrid: true,
            animated: true,
            duration: 1800,
          }}
        />
      </ChartContainer>

      {/* Compact Horizontal Stacked Bar */}
      <ChartContainer
        title='Team Skill Distribution'
        description='Skills breakdown per team member'
      >
        <StackedBarChart
          data={[
            { label: 'Alice', values: [85, 70, 60] },
            { label: 'Bob', values: [75, 80, 65] },
            { label: 'Carol', values: [90, 65, 70] },
            { label: 'Dave', values: [70, 85, 75] },
            { label: 'Eve', values: [80, 75, 80] },
          ]}
          categories={['Frontend', 'Backend', 'DevOps']}
          colors={['#FFB74D', '#7986CB', '#A1C181']}
          horizontal={true}
          config={{
            height: 220,
            showLabels: true,
            showGrid: true,
            animated: true,
            duration: 1200,
          }}
        />
      </ChartContainer>

      <View style={{ height: 50 }} />
    </View>
  );
};
