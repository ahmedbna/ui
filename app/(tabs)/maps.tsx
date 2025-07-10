import { View } from '@/components/ui/view';
import { AreaChartDemo } from '@/templates/demo/charts/area-chart/area-chart-demo';
import { ChartContainerDemo } from '@/templates/demo/charts/chart-container/chart-container-demo';
import { ChartContainerStyled } from '@/templates/demo/charts/chart-container/chart-container-styled';

export default function MapsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <AreaChartDemo />
      {/* <ChartContainerStyled /> */}
      {/* <ChartContainerDemo /> */}
    </View>
  );
}
