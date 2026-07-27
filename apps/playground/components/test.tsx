import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { BottomSheet, useBottomSheet } from '@/components/ui/bottom-sheet';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { DatePicker } from '@/components/ui/date-picker';
import { Icon } from '@/components/ui/icon';
import { GroupedInput, GroupedInputItem, Input } from '@/components/ui/input';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { ScrollView } from '@/components/ui/scroll-view';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useColor } from '@/hooks/useColor';
import { CORNERS } from '@/theme/globals';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Camera, Eye, EyeOff, Lock, Pen, Search } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable } from 'react-native';
import ActionSheetExample from './action-sheet-examples';
import { AlertExamples } from './alert-example';
import { AudioExample } from './audio-example';
import { CarouselTestComponent } from './carousel-examples';
import { ColorPickerDemo } from './color-picker-demo';
import { ComboboxExamples } from './combobox-example';
import { FilePickerDemo } from './file-picker-demo';
import { FilePickerHook } from './file-picker-hook-demo';
import { InputOTPExamples } from './otp-examples';
import { PickerExamples } from './picker-examples';
import { PopoverExamples } from './popover-example';
import { ShareExamples } from './share-examples';
import { SheetExample } from './sheet-example';
import ToggleExamples from './toggle-examples';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { CameraPreview } from './ui/camera-preview';
import { Link } from './ui/link';
import { Picker, PickerOption } from './ui/picker';
import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';
import { Progress } from './ui/progress';
import { RadioButton, RadioGroup } from './ui/radio';
import { SearchBar, SearchBarWithSuggestions } from './ui/searchbar';
import { useToast } from './ui/toast';
import { Toggle } from './ui/toggle';
import { TableDemo } from './user-table';

// Simple options array
const countryOptions: PickerOption[] = [
  { label: 'United States', value: 'us' },
  { label: 'Canada', value: 'ca' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
  { label: 'Japan', value: 'jp' },
  { label: 'Australia', value: 'au' },
];

export const Demos = () => {
  const bottomSheet = useBottomSheet();
  const settingsSheet = useBottomSheet();
  const bottom = useBottomTabBarHeight();
  const cardColor = useColor('card');

  const { toast, success, error, warning, info } = useToast();

  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [checked, setChecked] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);
  const [progress, setProgress] = useState(50);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<Date | undefined>();
  const [selectedDateTime, setSelectedDateTime] = useState<Date | undefined>();
  const [selectedCountry, setSelectedCountry] = useState('');

  const [selectedValue, setSelectedValue] = useState('option1');

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 100,
          paddingBottom: bottom + 20, // Add bottom padding for better spacing
        }}
      >
        <View
          style={{
            gap: 16,
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100%', // Use minHeight instead of flex: 1
          }}
        >
          <SheetExample />

          <Link href='https://www.ahmedbna.com'>BNA</Link>
          <Link browser='external' href='https://www.ahmedbna.com'>
            BNA
          </Link>
          <Link href='/welcome'>Welcome</Link>
          <Link href='/welcome'>
            <Button>Welcome</Button>
          </Link>

          <Picker
            options={countryOptions}
            value={selectedCountry}
            onValueChange={setSelectedCountry}
            placeholder='Select a country'
            label='Country'
          />

          <ColorPickerDemo />

          <FilePickerHook />

          <FilePickerDemo />

          {/* <MediaPickerDemo /> */}

          {/* // Basic usage */}
          <SearchBar
            placeholder='Search products...'
            onSearch={(query) => console.log('Searching:', query)}
          />

          <AudioExample />

          {/* <View style={{ width: '100%' }}> */}
          <SearchBarWithSuggestions
            placeholder='Search products...'
            value={searchQuery}
            onChangeText={setSearchQuery}
            suggestions={['Apple', 'Banana', 'Cherry']}
            onSuggestionPress={(suggestion) => setSearchQuery(suggestion)}
            maxSuggestions={3}
          />

          <CameraPreview />

          <InputOTPExamples />

          <Popover>
            <PopoverTrigger asChild>
              <Button>Hello Popover</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverBody>
                <Text>This is a basic popover content.</Text>
              </PopoverBody>
            </PopoverContent>
          </Popover>

          <PopoverExamples />

          <ToggleExamples />

          <ShareExamples />

          <ComboboxExamples />

          <ActionSheetExample />

          <ModeToggle />

          <Button
            onPress={() =>
              success('Success!', 'Your action was completed successfully.')
            }
          >
            Show Success Toast
          </Button>

          <Button
            variant='destructive'
            onPress={() =>
              error('Error!', 'Something went wrong. Please try again.')
            }
          >
            Show Error Toast
          </Button>

          <Button
            variant='outline'
            onPress={() =>
              warning('Warning!', 'Please check your input before proceeding.')
            }
          >
            Show Warning Toast
          </Button>

          <Button
            variant='secondary'
            onPress={() =>
              info('Info', 'Here is some useful information for you.')
            }
          >
            Show Info Toast
          </Button>

          <Button
            variant='ghost'
            onPress={() =>
              toast({
                title: 'Custom Toast',
                description: 'This is a custom toast with an action.',
                variant: 'default',
                duration: 10000, // 10 seconds
                action: {
                  label: 'Undo',
                  onPress: () => {
                    console.log('Undo pressed!');
                  },
                },
              })
            }
          >
            Show Custom Toast with Action
          </Button>

          <PickerExamples />

          <View style={{ width: '100%', gap: 16 }}>
            <Checkbox
              label='checkbox'
              checked={checked}
              onCheckedChange={setChecked}
            />

            <GroupedInput title='Address'>
              <GroupedInputItem
                label='Street'
                placeholder='CA, USA'
                // error='Street invaild'
                icon={Search}
                rightComponent={() => (
                  <Pressable onPress={() => console.log('click')}>
                    <Icon name={EyeOff} size={20} />
                  </Pressable>
                )}
              />

              <DatePicker
                label='Brithday'
                mode='date'
                value={selectedDate}
                onChange={setSelectedDate}
                placeholder='Select a date'
                variant='group'
              />

              <GroupedInputItem label='City' error='Something went wrong' />
              <GroupedInputItem label='Postal Code' />

              <View>
                <Checkbox
                  label='Checkbox'
                  checked={checked}
                  onCheckedChange={setChecked}
                />
                <Checkbox
                  label='Checkbox'
                  checked={true}
                  onCheckedChange={setChecked}
                />
                <Checkbox
                  label='Checkbox'
                  checked={false}
                  onCheckedChange={setChecked}
                />
              </View>

              <Switch
                label='Switch'
                value={switchValue}
                onValueChange={setSwitchValue}
              />

              <DatePicker
                label='Brithday'
                mode='date'
                value={selectedDate}
                onChange={setSelectedDate}
                placeholder='Select a date'
                variant='group'
              />

              <GroupedInputItem
                label='Street'
                placeholder='CA, USA'
                // error='Street invaild'
                icon={Search}
                rightComponent={() => (
                  <Pressable onPress={() => console.log('click')}>
                    <Icon name={EyeOff} size={20} />
                  </Pressable>
                )}
              />
            </GroupedInput>

            <GroupedInput title='Radio'>
              <RadioGroup
                options={[
                  { label: 'Option 1', value: 'option1' },
                  { label: 'Option 2', value: 'option2' },
                  { label: 'Option 3', value: 'option3' },
                ]}
                value={selectedValue}
                onValueChange={setSelectedValue}
              />
            </GroupedInput>

            <Text variant='title'>Wi-Fi Network Setup</Text>

            <Input variant='outline' label='Name' placeholder='Network Name' />
            <Input label='Name' placeholder='Network Name' />

            <Input
              icon={Pen}
              label='Name'
              placeholder='Network Name'
              error='Name is Required'
            />

            <Input
              icon={Search}
              label='Security'
              placeholder='WPA2/WPA3'
              value='WPA2/WPA3'
              disabled={true}
            />

            <Input
              label='Password must be '
              placeholder='Enter password'
              secureTextEntry
              rightComponent={() => (
                <Pressable onPress={() => console.log('click')}>
                  <Icon name={EyeOff} size={20} />
                </Pressable>
              )}
            />

            <Input
              icon={Lock}
              placeholder='Enter password'
              secureTextEntry
              error='Password must be 8 characters long'
              rightComponent={() => (
                <Pressable onPress={() => console.log('click')}>
                  <Icon name={Eye} size={20} />
                </Pressable>
              )}
            />

            {/* Date only picker */}
            <DatePicker
              // label='Select Date'
              mode='date'
              value={selectedDate}
              onChange={setSelectedDate}
              placeholder='Select a date'
              variant='outline'
            />
            {selectedDate && (
              <Text variant='caption'>
                Selected: {selectedDate.toLocaleDateString()}
              </Text>
            )}

            {/* Time only picker */}
            <DatePicker
              label='Time Picker'
              mode='time'
              value={selectedTime}
              onChange={setSelectedTime}
              timeFormat='24'
              placeholder='Select a time'
            />
            {selectedTime && (
              <Text variant='caption'>
                Selected:{' '}
                {selectedTime.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            )}

            {/* Date and time picker */}
            <DatePicker
              label='Date & Time Picker'
              mode='datetime'
              timeFormat='12'
              value={selectedDateTime}
              onChange={setSelectedDateTime}
              placeholder='Select date and time'
            />
            {selectedDateTime && (
              <Text variant='caption'>
                Selected: {selectedDateTime.toLocaleDateString()} at{' '}
                {selectedDateTime.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            )}

            {/* Disabled picker */}
            <DatePicker
              mode='date'
              label='Disabled Picker'
              disabled
              placeholder='This picker is disabled'
            />

            {/* With minimum and maximum dates */}
            <DatePicker
              mode='date'
              label='With Date Constraints'
              value={selectedDate}
              onChange={setSelectedDate}
              placeholder='Only future dates allowed'
              minimumDate={new Date()}
              maximumDate={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)} // 1 year from now
            />
          </View>

          <AlertExamples />

          <Button size='sm'>Hello</Button>
          <Button>Hello</Button>
          <Button size='lg'>Hello</Button>
          <Button size='icon'>Hello</Button>
          <Button variant='secondary'>Hello</Button>
          <Button variant='outline'>Hello</Button>
          <Button variant='ghost'>Hello</Button>
          <Button variant='link'>Hello</Button>
          <Button variant='destructive'>Hello</Button>

          {/* <LoadingSpinnerExample /> */}

          <TableDemo />

          <RadioGroup
            options={[
              { label: 'Option 1', value: 'option1' },
              { label: 'Option 2', value: 'option2' },
              { label: 'Option 3', value: 'option3' },
            ]}
            value={selectedValue}
            onValueChange={setSelectedValue}
          />

          {/* Horizontal layout */}
          <RadioGroup
            orientation='horizontal'
            options={[
              { label: 'Option 1', value: 'option1' },
              { label: 'Option 2', value: 'option2' },
              { label: 'Option 3', value: 'option3' },
            ]}
            value={selectedValue}
            onValueChange={setSelectedValue}
          />

          {/* With disabled options */}
          <RadioGroup
            options={[
              { label: 'Available', value: 'available' },
              { label: 'Unavailable', value: 'unavailable', disabled: true },
            ]}
            value={selectedValue}
            onValueChange={setSelectedValue}
          />

          {/* Individual radio button */}
          <RadioButton
            option={{ label: 'Custom Option', value: 'custom' }}
            selected={selectedValue === 'custom'}
            onPress={() => setSelectedValue('custom')}
          />

          <CarouselTestComponent />

          <Skeleton width={60} height={60} style={{ borderRadius: CORNERS }} />

          <View>
            <Text variant='heading'>Hello</Text>
          </View>

          <View style={{ gap: 16 }}>
            <Button onPress={bottomSheet.open}>Open Simple Bottom Sheet</Button>

            <Button onPress={settingsSheet.open} variant='outline'>
              Open Settings Sheet
            </Button>
          </View>

          {/* Simple Bottom Sheet */}
          <BottomSheet
            isVisible={bottomSheet.isVisible}
            onClose={bottomSheet.close}
            title='Simple Bottom Sheet'
            snapPoints={[0.3, 0.6]}
          >
            <View style={{ gap: 16 }}>
              <Text variant='subtitle'>Welcome to the bottom sheet!</Text>
              <Text>
                This is a simple bottom sheet with some content. You can drag it
                up and down to resize it, or swipe down to dismiss it.
              </Text>
              <Button onPress={bottomSheet.close}>Close Sheet</Button>
            </View>
          </BottomSheet>

          {/* Settings Bottom Sheet */}
          <BottomSheet
            isVisible={settingsSheet.isVisible}
            onClose={settingsSheet.close}
            title='Settings'
            snapPoints={[0.4, 0.7, 0.9]}
            enableBackdropDismiss={false}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ gap: 16 }}>
                <Text variant='subtitle'>Appearance</Text>
                <View style={{ gap: 12 }}>
                  <Button variant='outline'>Light Mode</Button>
                  <Button variant='outline'>Dark Mode</Button>
                  <Button variant='outline'>System</Button>
                </View>

                <Text variant='subtitle' style={{ marginTop: 24 }}>
                  Notifications
                </Text>
                <View style={{ gap: 12 }}>
                  <Button variant='outline'>Push Notifications</Button>
                  <Button variant='outline'>Email Notifications</Button>
                  <Button variant='outline'>SMS Notifications</Button>
                </View>

                <Text variant='subtitle' style={{ marginTop: 24 }}>
                  Account
                </Text>
                <View style={{ gap: 12 }}>
                  <Button variant='outline'>Profile Settings</Button>
                  <Button variant='outline'>Privacy Settings</Button>
                  <Button variant='destructive'>Sign Out</Button>
                </View>

                <Button onPress={settingsSheet.close} style={{ marginTop: 24 }}>
                  Done
                </Button>
              </View>
            </ScrollView>
          </BottomSheet>

          <Button>Hello</Button>

          <View style={{ width: '100%' }}>
            <Tabs defaultValue='overview' style={{ flex: 1 }}>
              <TabsList>
                <TabsTrigger value='overview'>Overview</TabsTrigger>
                <TabsTrigger value='analytics'>Analytics</TabsTrigger>
                <TabsTrigger value='reports'>Reports</TabsTrigger>
              </TabsList>

              <TabsContent value='overview'>
                <ScrollView style={{ flex: 1 }}>
                  <View style={{ padding: 16 }}>
                    <Text variant='title' style={{ marginBottom: 12 }}>
                      Dashboard Overview
                    </Text>
                    <Text variant='body' style={{ marginBottom: 16 }}>
                      Welcome to your dashboard! Here's a quick overview of your
                      recent activity.
                    </Text>

                    <View
                      style={{
                        padding: 16,
                        borderRadius: 8,
                        marginBottom: 16,
                      }}
                    >
                      <Text variant='subtitle' style={{ marginBottom: 8 }}>
                        Quick Stats
                      </Text>
                      <Text variant='body'>• 24 new messages</Text>
                      <Text variant='body'>• 3 pending tasks</Text>
                      <Text variant='body'>• 12 completed projects</Text>
                    </View>

                    <Button>View Details</Button>
                  </View>
                </ScrollView>
              </TabsContent>

              <TabsContent value='analytics'>
                <ScrollView style={{ flex: 1 }}>
                  <View style={{ padding: 16 }}>
                    <Text variant='title' style={{ marginBottom: 12 }}>
                      Analytics Dashboard
                    </Text>
                    <Text variant='body' style={{ marginBottom: 16 }}>
                      Track your performance metrics and insights.
                    </Text>

                    <View
                      style={{
                        padding: 16,
                        borderRadius: 8,
                        marginBottom: 16,
                      }}
                    >
                      <Text variant='subtitle' style={{ marginBottom: 8 }}>
                        This Month
                      </Text>
                      <Text variant='body'>• 1,234 page views</Text>
                      <Text variant='body'>• 456 unique visitors</Text>
                      <Text variant='body'>• 78% engagement rate</Text>
                    </View>

                    <Button variant='outline'>Export Data</Button>
                  </View>
                </ScrollView>
              </TabsContent>

              <TabsContent value='reports'>
                <ScrollView style={{ flex: 1 }}>
                  <View style={{ padding: 16 }}>
                    <Text variant='title' style={{ marginBottom: 12 }}>
                      Reports Center
                    </Text>
                    <Text variant='body' style={{ marginBottom: 16 }}>
                      Generate and download your reports here.
                    </Text>

                    <View
                      style={{
                        backgroundColor: '#fef3c7',
                        padding: 16,
                        borderRadius: 8,
                        marginBottom: 16,
                      }}
                    >
                      <Text variant='subtitle' style={{ marginBottom: 8 }}>
                        Available Reports
                      </Text>
                      <Text variant='body'>• Weekly Summary</Text>
                      <Text variant='body'>• Monthly Analytics</Text>
                      <Text variant='body'>• Quarterly Review</Text>
                    </View>

                    <Button variant='secondary'>Generate Report</Button>
                  </View>
                </ScrollView>
              </TabsContent>
            </Tabs>
          </View>

          <Alert>
            <AlertTitle>Alert Title</AlertTitle>
            <AlertDescription>
              Our flagship product combines cutting-edge technology with sleek
              design. Built with premium materials, it offers unparalleled
              performance and reliability.
            </AlertDescription>
          </Alert>

          <Accordion type='single' collapsible defaultValue='item-1'>
            <AccordionItem value='item-1'>
              <AccordionTrigger>Product Information</AccordionTrigger>
              <AccordionContent>
                <Text variant='body'>
                  Our flagship product combines cutting-edge technology with
                  sleek design. Built with premium materials, it offers
                  unparalleled performance and reliability.
                </Text>
                <Text variant='body' style={{ marginTop: 12 }}>
                  Key features include advanced processing capabilities, and an
                  intuitive user interface designed for both beginners and
                  experts.
                </Text>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value='item-2'>
              <AccordionTrigger>Shipping Details</AccordionTrigger>
              <AccordionContent>
                <Text variant='body'>
                  We offer worldwide shipping through trusted courier partners.
                  Standard delivery takes 3-5 business days, while express
                  shipping ensures delivery within 1-2 business days.
                </Text>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value='item-3'>
              <AccordionTrigger>Return Policy</AccordionTrigger>
              <AccordionContent>
                <Text variant='body'>
                  We stand behind our products with a comprehensive 30-day
                  return policy. If you're not completely satisfied, simply
                  return the item in its original condition.
                </Text>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Icon name={Camera} size={48} />

          <Toggle variant='outline'>B</Toggle>

          <Avatar>
            <AvatarImage
              source={{
                uri: 'https://images.unsplash.com/photo-1728577740843-5f29c7586afe?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              }}
            />

            <AvatarFallback>
              <Text>AB</Text>
            </AvatarFallback>
          </Avatar>

          <Progress
            value={progress}
            interactive={true}
            onValueChange={setProgress}
            style={{ width: 200 }}
          />

          <Badge>Badge</Badge>

          <Card>
            <CardHeader>
              <Text variant='title'>Card Title</Text>
            </CardHeader>
            <CardContent>
              <Text>This is a card content area.</Text>
              <Text variant='caption'>This is a card description area.</Text>
            </CardContent>
            <CardFooter>
              <Button variant='destructive'>Click Me</Button>
            </CardFooter>
          </Card>

          <Checkbox
            checked={checked}
            onCheckedChange={setChecked}
            disabled={false}
            label='Checkbox'
          />

          <Separator />

          <Switch value={switchValue} onValueChange={setSwitchValue} />
        </View>
      </ScrollView>
    </View>
  );
};
