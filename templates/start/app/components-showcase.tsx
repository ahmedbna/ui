import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { AreaChart } from '@/components/charts/area-chart';
import { BarChart } from '@/components/charts/bar-chart';
import { BubbleChart } from '@/components/charts/bubble-chart';
import { CandlestickChart } from '@/components/charts/candlestick-chart';
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
import { StackedAreaChart } from '@/components/charts/stacked-area-chart';
import { StackedBarChart } from '@/components/charts/stacked-bar-chart';
import { TreeMapChart } from '@/components/charts/treemap-chart';
import { useColor } from '@/hooks/useColor';
import { Colors } from '@/constants/Colors';
import { InputOTP } from '@/components/ui/input-otp';
import { Spinner } from '@/components/ui/spinner';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { LazyImage } from '@/components/ui/lazy-image';
import { Image } from '@/components/ui/image';
import { Link } from '@/components/ui/link';
import { AvoidKeyboard } from '@/components/ui/avoid-keyboard';
import { View as UIView } from '@/components/ui/view';
import { Home, Heart, Bell, Star, Settings, Search } from 'lucide-react-native';
import { AudioRecorder } from '@/components/ui/audio-recorder';
import { AudioPlayer } from '@/components/ui/audio-player';
import { Camera } from '@/components/ui/camera';
import { VideoPlayer } from '@/components/ui/video';
import { MediaPicker } from '@/components/ui/media-picker';
import { Accordion, AccordionItem } from '@/components/ui/accordion';
import { Alert } from '@/components/ui/alert';
import { SimpleCarousel } from '@/components/ui/carousel';
import { DatePicker } from '@/components/ui/date-picker';
import { Gallery } from '@/components/ui/gallery';
import { Popover } from '@/components/ui/popover';
import { RadioGroup, RadioItem } from '@/components/ui/radio-group';
import { SearchBar } from '@/components/ui/search-bar';
import { Table } from '@/components/ui/table';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { useToast, ToastProvider } from '@/components/ui/toast';
import { ActionSheetTrigger } from '@/components/ui/action-sheet';
import { HelloWave } from '@/components/ui/hello-wave';

import { Picker } from '@/components/ui/picker';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Toggle } from '@/components/ui/toggle';
import { Italic, XCircle } from 'lucide-react-native';
import { Chip } from '@/components/ui/chip';
import { EmptyState } from '@/components/ui/empty-state';
import { Rating } from '@/components/ui/rating';
import { Slider } from '@/components/ui/slider';
import * as Haptics from 'expo-haptics';
import * as Clipboard from 'expo-clipboard';

export default function ComponentsShowcase() {
  const bg = useColor('background');
  const insets = useSafeAreaInsets();
  const [switchVal, setSwitchVal] = useState(false);
  const [checked, setChecked] = useState(false);
  const [progress, setProgress] = useState(30);
  const [otpValue, setOtpValue] = useState('');
  const [inputVal1, setInputVal1] = useState('');
  const [inputVal2, setInputVal2] = useState('');
  const [inputVal3, setInputVal3] = useState('');

  // Fake Data for Charts
  // Fake Data for Charts
  const lineData = [
    { x: 'Jan', y: 50 },
    { x: 'Feb', y: 80 },
    { x: 'Mar', y: 90 },
    { x: 'Apr', y: 70 }
  ];
  const barData = [
    { label: 'Jan', value: 50 },
    { label: 'Feb', value: 80 },
    { label: 'Mar', value: 90 },
    { label: 'Apr', value: 70 }
  ];
  const pieData = [
    { label: 'Mobile', value: 40 },
    { label: 'Desktop', value: 30 },
    { label: 'Tablet', value: 30 }
  ];
  /* Chart Data Sets */
  const areaData = [
    { x: 'Jan', y: 40 }, { x: 'Feb', y: 60 }, { x: 'Mar', y: 80 }, { x: 'Apr', y: 60 }, { x: 'May', y: 90 }
  ];
  const bubbleData = [
    { x: 10, y: 20, size: 10, label: 'A' }, { x: 30, y: 40, size: 20, label: 'B' }, { x: 50, y: 30, size: 15, label: 'C' }
  ];
  const columnData = [
    { label: 'Q1', value: 100 }, { label: 'Q2', value: 150 }, { label: 'Q3', value: 120 }, { label: 'Q4', value: 180 }
  ];
  const doughnutData = [
    { label: 'Prod A', value: 40 }, { label: 'Prod B', value: 30 }, { label: 'Prod C', value: 30 }
  ];
  const heatmapData = [
    { row: 'Mon', col: 'Morning', value: 80 }, { row: 'Mon', col: 'Evening', value: 40 },
    { row: 'Tue', col: 'Morning', value: 60 }, { row: 'Tue', col: 'Evening', value: 70 }
  ];
  const polarData = [
    { label: 'Speed', value: 80 }, { label: 'Power', value: 60 }, { label: 'Range', value: 90 }
  ];
  const radarData = [
    { label: 'STR', value: 80 }, { label: 'DEX', value: 90 }, { label: 'INT', value: 70 },
    { label: 'VIT', value: 85 }, { label: 'AGI', value: 75 }
  ];
  const radialData = [
    { label: 'Walk', value: 50 }, { label: 'Run', value: 30 }, { label: 'Swim', value: 20 }
  ];
  const scatterData = [
    { x: 10, y: 20 }, { x: 30, y: 50 }, { x: 45, y: 40 }, { x: 70, y: 80 }
  ];
  const stackedAreaData = [
    { x: 1, y: [10, 20, 30] }, { x: 2, y: [15, 25, 35] }, { x: 3, y: [20, 30, 25] }, { x: 4, y: [25, 20, 40] }
  ];
  const stackedBarData = [
    { label: 'Jan', values: [20, 30, 10] }, { label: 'Feb', values: [25, 20, 15] }, { label: 'Mar', values: [30, 25, 20] }
  ];
  const treeMapData = [
    { label: 'USA', value: 100 }, { label: 'China', value: 80 }, { label: 'India', value: 60 },
    { label: 'UK', value: 40 }, { label: 'Germany', value: 30 }
  ];
  const candleData = [
    { date: 'Mon', open: 50, high: 60, low: 40, close: 55 },
    { date: 'Tue', open: 55, high: 65, low: 50, close: 50 },
    { date: 'Wed', open: 50, high: 70, low: 45, close: 65 },
    { date: 'Thu', open: 65, high: 80, low: 60, close: 70 },
    { date: 'Fri', open: 70, high: 75, low: 65, close: 60 },
  ];



  const carouselData = [
    { title: 'Mountain', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800' },
    { title: 'City', image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=800' },
    { title: 'Ocean', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800' },
  ];



  const ToastDemo = () => {
      const { showToast } = useToast();
      return (
           <View style={{ flexDirection: 'row', gap: 10 }}>
               <Button size="sm" onPress={() => showToast('Operation success', 'success')}>Success Toast</Button>
               <Button size="sm" variant="destructive" onPress={() => showToast('Something went wrong', 'error')}>Error Toast</Button>
           </View>
      );
  };

  const [radioVal, setRadioVal] = useState('option1');
  const galleryImages = [
      'https://picsum.photos/seed/img1/400/300',
      'https://picsum.photos/seed/img2/400/300',
      'https://picsum.photos/seed/img3/400/300',
  ];
  const tableHeaders = ['Name', 'Role', 'Status'];
  const tableData = [
      ['John Doe', 'Admin', 'Active'],
      ['Jane Smith', 'User', 'Inactive'],
      ['Bob Johnson', 'Guest', 'Active'],
  ];


  const [pickerVal, setPickerVal] = useState('option1');
  const [sliderVal, setSliderVal] = useState(50);
  const [ratingVal, setRatingVal] = useState(3);
  const [chipSelected, setChipSelected] = useState(false);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync('Hello from kynjalUI!');
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  return (
    <ActionSheetProvider>
    <ToastProvider>
      <Stack.Screen options={{ title: 'Components Showcase', headerBackTitle: 'Home' }} />
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: bg, paddingTop: insets.top }]}>

        <Section title="Typography">
          <Text type="title">Title Text</Text>
          <Text type="subtitle">Subtitle Text</Text>
          <Text type="body">Default Body Text</Text>
          <Text type="caption">Caption Text</Text>
        </Section>

        <Section title="Buttons">
          <View style={styles.row}>
            <Button>Solid</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Soft</Button>
          </View>
          <View style={styles.row}>
             <Button size="sm">Small</Button>
             <Button size="lg">Large</Button>
             <Button loading />
          </View>
          <View style={styles.row}>
             <Button icon={Star}>Icon Left</Button>
             <Button variant="ghost" size="icon" icon={Settings} />
          </View>
        </Section>

        <Section title="Inputs">
           <Input
             placeholder="Default Input"
             value={inputVal1}
             onChangeText={setInputVal1}
           />
           <Input
             placeholder="With Icon"
             icon={Search}
             containerStyle={{ marginBottom: 10 }}
             value={inputVal2}
             onChangeText={setInputVal2}
           />
           <Input
             placeholder="Error State"
             error="Something went wrong"
             value={inputVal3}
             onChangeText={setInputVal3}
           />
        </Section>

        <Section title="Avatars">
           <View style={styles.row}>
             <Avatar>
               <AvatarFallback>AB</AvatarFallback>
             </Avatar>
             <Avatar size={48} style={{ backgroundColor: Colors.orange[200] }}>
               <AvatarFallback>CD</AvatarFallback>
             </Avatar>
             <Avatar size={32}>
               <AvatarImage source={{ uri: "https://github.com/shadcn.png" }} />
               <AvatarFallback>CN</AvatarFallback>
             </Avatar>
           </View>
        </Section>

        <Section title="Badges">
           <View style={styles.row}>
             <Badge>Default</Badge>
             <Badge variant="secondary">Secondary</Badge>
             <Badge variant="destructive">Destructive</Badge>
             <Badge variant="outline">Outline</Badge>
           </View>
        </Section>

        <Section title="Toggles">
           <View style={styles.row}>
             <View style={{ alignItems: 'center', gap: 5 }}>
               <Text>Switch: {switchVal ? 'On' : 'Off'}</Text>
               <Switch value={switchVal} onValueChange={setSwitchVal} />
             </View>

             <View style={{ alignItems: 'center', gap: 5 }}>
                <Text>Checkbox</Text>
                <Checkbox checked={checked} onCheckedChange={setChecked} />
             </View>
           </View>
        </Section>

        <Section title="Progress">
           <Progress value={progress} />
           <Button
             size="sm"
             variant="outline"
             style={{ marginTop: 10, alignSelf: 'flex-start' }}
             onPress={() => setProgress(p => (p + 10) % 110)}
           >
             Add Progress
           </Button>
        </Section>

        <Section title="Charts">
           <Text type="subtitle">Line Chart</Text>
           <LineChart data={lineData} config={{ height: 200, showYLabels: true }} />

           <View style={{ height: 20 }} />

           <Text type="subtitle">Bar Chart</Text>
           <BarChart data={barData} config={{ height: 200 }} />

           <View style={{ height: 20 }} />

           <Text type="subtitle">Pie Chart</Text>
           <PieChart data={pieData} config={{ height: 200 }} />

           <View style={{ height: 20 }} />

           <Text type="subtitle">Candlestick Chart</Text>
           <CandlestickChart data={candleData} config={{ height: 200 }} />

           <View style={{ height: 20 }} />

           <Text type="subtitle">Area Chart</Text>
           <AreaChart data={areaData} config={{ height: 200 }} />

           <View style={{ height: 20 }} />

           <Text type="subtitle">Bubble Chart</Text>
           <BubbleChart data={bubbleData} config={{ height: 200 }} />

           <View style={{ height: 20 }} />

           <Text type="subtitle">Column Chart</Text>
           <ColumnChart data={columnData} config={{ height: 200 }} />

           <View style={{ height: 20 }} />

           <Text type="subtitle">Doughnut Chart</Text>
           <DoughnutChart data={doughnutData} config={{ height: 200 }} />

           <View style={{ height: 20 }} />

           <Text type="subtitle">Heatmap Chart</Text>
           <HeatmapChart data={heatmapData} config={{ height: 200 }} />

           <View style={{ height: 20 }} />

           <Text type="subtitle">Polar Area Chart</Text>
           <PolarAreaChart data={polarData} config={{ height: 200 }} />

           <View style={{ height: 20 }} />

           <Text type="subtitle">Progress Ring</Text>
           <ProgressRingChart progress={75} size={150} />

           <View style={{ height: 20 }} />

           <Text type="subtitle">Radar Chart</Text>
           <RadarChart data={radarData} config={{ height: 200 }} />

           <View style={{ height: 20 }} />

           <Text type="subtitle">Radial Bar Chart</Text>
           <RadialBarChart data={radialData} />

           <View style={{ height: 20 }} />

           <Text type="subtitle">Scatter Plot</Text>
           <ScatterPlot data={scatterData} config={{ height: 200 }} />

           <View style={{ height: 20 }} />

           <Text type="subtitle">Stacked Area Chart</Text>
           <StackedAreaChart data={stackedAreaData} config={{ height: 200 }} />

           <View style={{ height: 20 }} />

           <Text type="subtitle">Stacked Bar Chart</Text>
           <StackedBarChart data={stackedBarData} config={{ height: 200 }} />

           <View style={{ height: 20 }} />

           <Text type="subtitle">Tree Map Chart</Text>
           <TreeMapChart data={treeMapData} config={{ height: 200 }} />
        </Section>

        <Section title="Icons">
           <View style={styles.row}>
              <Icon name={Home} size={24} color={Colors.blue[500]} />
              <Icon name={Heart} size={24} color={Colors.red[500]} />
              <Icon name={Bell} size={24} color={Colors.orange[500]} />
           </View>
        </Section>

        <Section title="Misc Components">
           <View style={styles.row}>
             <ModeToggle />
             <Text>Toggle Theme</Text>
           </View>

           <View style={{ height: 10 }} />

           <Text type="subtitle">Input OTP</Text>
           <InputOTP
             length={6}
             value={otpValue}
             onChangeText={setOtpValue}
             onComplete={(val) => console.log('OTP:', val)}
           />

           <View style={{ height: 10 }} />

           <Text type="subtitle">Spinners</Text>
           <View style={styles.row}>
             <Spinner />
             <Spinner variant="circle" />
             <Spinner variant="dots" />
             <Spinner variant="bars" />
           </View>

           <View style={{ height: 10 }} />

           <Text type="subtitle">Lazy Image</Text>
           <LazyImage
              source={{ uri: 'https://picsum.photos/300/200' }}
              style={{ width: '100%', height: 150, borderRadius: 8 }}
           />

           <View style={{ height: 10 }} />

           <Text type="subtitle">Standard Image (Rounded)</Text>
           <Image
              source={{ uri: 'https://picsum.photos/300/200' }}
              height={150}
              variant="rounded"
           />
        </Section>

        <Section title="Links">
           <View style={{ gap: 10 }}>
              <Link href="/(tabs)/(home)">Internal Link (Home)</Link>
              <Link href="https://expo.dev" browser="external">External Link (Browser)</Link>
              <Link href="https://google.com">In-App Browser Link</Link>
           </View>
        </Section>

        <Section title="Media Components">
            <Text type="subtitle">Audio</Text>
            <AudioRecorder onRecordingComplete={(uri) => console.log('Recorded:', uri)} />
            <AudioPlayer uri={null} />

            <View style={{ height: 20 }} />

            <Text type="subtitle">Media Picker</Text>
            <MediaPicker />

            <View style={{ height: 20 }} />

            <Text type="subtitle">Video</Text>
            <VideoPlayer />

            <View style={{ height: 20 }} />

            <Text type="subtitle">Camera</Text>
            <Camera />
            <Text type="subtitle">Camera</Text>
            <Camera />
        </Section>

        <Section title="Feedback & Data">
             <Text type="subtitle">Alerts</Text>
             <View style={{ gap: 10 }}>
                <Alert title="Default Alert" description="This is a standard alert message." />
                <Alert variant="destructive" title="Error" description="Something went wrong." />
                <Alert variant="success" title="Success" description="Action completed successfully." />
                <Alert variant="warning" title="Warning" description="Proceed with caution." />
             </View>

             <View style={{ height: 20 }} />

             <Text type="subtitle">Accordion</Text>
             <Accordion>
                <AccordionItem title="Is this accessible?">
                    <Text>Yes. It adheres to the WAI-ARIA design pattern.</Text>
                </AccordionItem>
                <AccordionItem title="Is it styled?">
                    <Text>Yes. It comes with default styles that matches the other components' aesthetic.</Text>
                </AccordionItem>
             </Accordion>

             <View style={{ height: 20 }} />

             <Text type="subtitle">Carousel</Text>
             <SimpleCarousel
                data={carouselData}
                renderItem={({ item }) => (
                    <View style={{
                        flex: 1,
                        borderRadius: 12,
                        overflow: 'hidden',
                        backgroundColor: '#f3f4f6'
                    }}>
                        <LazyImage
                            source={{ uri: item.image }}
                            style={{ width: '100%', height: '100%' }}
                            contentFit="cover"
                        />
                        <View style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            padding: 20,
                            backgroundColor: 'rgba(0,0,0,0.4)'
                        }}>
                            <Text variant="title" style={{ color: 'white' }}>{item.title}</Text>
                        </View>
                    </View>
                )}
             />

             <View style={{ height: 20 }} />

             <Text type="subtitle">Date Picker</Text>
             <DatePicker />
        </Section>

        <Section title="Combined Forms">
             <Text type="subtitle">Search Bar</Text>
             <SearchBar />

             <View style={{ height: 20 }} />

             <Text type="subtitle">Radio Group</Text>
             <RadioGroup value={radioVal} onValueChange={setRadioVal}>
                <RadioItem value="option1" label="Option 1" />
                <RadioItem value="option2" label="Option 2" />
                <RadioItem value="option3" label="Option 3" />
             </RadioGroup>
        </Section>

        <Section title="Data Display">
             <Text type="subtitle">Table</Text>
             <Table headers={tableHeaders} data={tableData} />

             <View style={{ height: 20 }} />

             <Text type="subtitle">Gallery</Text>
             <Gallery images={galleryImages} />
        </Section>

        <Section title="Overlays">
             <Text type="subtitle">Popover</Text>
             <Popover
                trigger={<View pointerEvents="none"><Button variant="outline">Open Popover</Button></View>}
                content={<Text>This is a popover content!</Text>}
             />

             <View style={{ height: 20 }} />

             <Text type="subtitle">Toasts</Text>
             <ToastDemo />
        </Section>



        <Section title="Primitives & Animations">
             <Text type="subtitle">Action Sheet</Text>
             <ActionSheetTrigger
                options={['Option 1', 'Option 2', 'Cancel']}
                cancelButtonIndex={2}
                onSelect={(idx) => console.log(idx)}
             />

             <View style={{ height: 20 }} />
             <Separator />
             <View style={{ height: 20 }} />

             <Text type="subtitle">Picker</Text>
             <Picker
                selectedValue={pickerVal}
                onValueChange={setPickerVal}
                items={[
                    { label: 'Option 1', value: 'option1' },
                    { label: 'Option 2', value: 'option2' },
                    { label: 'Option 3', value: 'option3' },
                ]}
             />

             <View style={{ height: 20 }} />

             <Text type="subtitle">Skeleton (Moti)</Text>
             <Skeleton width={200} height={40} />
             <View style={{ height: 10 }} />
             <Skeleton width={150} height={20} />

             <View style={{ height: 20 }} />

             <Text type="subtitle">Toggle</Text>
             <Toggle>
                <Italic size={24} color="black" />
             </Toggle>

             <View style={{ height: 20 }} />

             <Text type="subtitle">Animations</Text>
             <HelloWave />

        </Section>

        <Section title="Future Proofing">
             <Text type="subtitle">Slider</Text>
             <Slider
                value={sliderVal}
                onValueChange={setSliderVal}
                minimumValue={0}
                maximumValue={100}
                step={1}
                label="Volume"
             />

             <View style={{ height: 20 }} />

             <Text type="subtitle">Chips</Text>
             <View style={{ flexDirection: 'row', gap: 10 }}>
                 <Chip label="Static Chip" />
                 <Chip
                    label="Toggle Chip"
                    variant="outline"
                    selected={chipSelected}
                    onPress={() => setChipSelected(!chipSelected)}
                 />
                 <Chip label="Closable" onClose={() => alert('Closed!')} />
             </View>

             <View style={{ height: 20 }} />

             <Text type="subtitle">Rating</Text>
             <Rating rating={ratingVal} onRatingChange={setRatingVal} />

             <View style={{ height: 20 }} />

             <Text type="subtitle">Empty State</Text>
             <Card>
                <EmptyState
                    icon={XCircle}
                    title="No Data Found"
                    description="Try adjusting your filters or search query."
                    action={<Button size="sm" variant="outline">Clear Filters</Button>}
                />
             </Card>
        </Section>

        <Section title="Utilities (Expo Packages)">
            <Text>Helper functions installed for Haptics, Clipboard, etc.</Text>
            <Button onPress={copyToClipboard} variant="outline">
                Copy to Clipboard & Haptic Feedback
            </Button>
        </Section>

        <Section title="Layout Helpers">
           <Text>
             The library also includes layout components like <Text style={{fontWeight:'bold'}}>View</Text>, <Text style={{fontWeight:'bold'}}>ScrollView</Text>, and <Text style={{fontWeight:'bold'}}>AvoidKeyboard</Text> used throughout the app.
           </Text>
           <UIView style={{ marginTop: 10, padding: 10, backgroundColor: useColor('secondary'), borderRadius: 8 }}>
              <Text style={{ fontSize: 12 }}>Example of View wrapper</Text>
           </UIView>
        </Section>

        <Section title="Tabs">
           <Tabs defaultValue="account">
             <TabsList>
               <TabsTrigger value="account">Account</TabsTrigger>
               <TabsTrigger value="password">Password</TabsTrigger>
             </TabsList>
             <TabsContent value="account">
               <Text>Make changes to your account here.</Text>
             </TabsContent>
             <TabsContent value="password">
               <Text>Change your password here.</Text>
             </TabsContent>
           </Tabs>
        </Section>

      </ScrollView>
    </ToastProvider>
    </ActionSheetProvider>
  );
}

function Section({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text type="subtitle" style={styles.sectionTitle}>{title}</Text>
      <Card>
        {children}
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
    paddingBottom: 50,
  },
  section: {
    gap: 10,
  },
  sectionTitle: {
    marginBottom: 5,
    opacity: 0.6,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    alignItems: 'center',
  },
});
