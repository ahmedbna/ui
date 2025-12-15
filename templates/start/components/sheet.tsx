import { ScrollView } from './ui/scroll-view';
import { Text } from './ui/text';

export default function SheetScreen() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior='automatic'
      contentContainerStyle={{
        padding: 16,
        paddingTop: 40,
        paddingBottom: 100,
      }}
    >
      <Text type='title' style={{ marginBottom: 16 }}>
        BNA UI
      </Text>
      {bnaComponents.map((item, index) => (
        <Text key={index} type='subtitle' style={{ marginVertical: 8 }}>
          {item}
        </Text>
      ))}
    </ScrollView>
  );
}

const bnaComponents = [
  '🪗 Accordion',
  '📜 Action Sheet',
  '🚨 Alert',
  '💬 Alert Dialog',
  '🎧 Audio Player',
  '🎙️ Audio Recorder',
  '🌊 Audio Waveform',
  '👤 Avatar',
  '🎯 AvoidKeyboard',
  '🏷️ Badge',
  '📥 BottomSheet',
  '🔘 Button',
  '📸 Camera',
  '🎥 Camera Preview',
  '🃏 Card',
  '🎠 Carousel',
  '☑️ Checkbox',
  '📂 Collapsible',
  '🎨 Color Picker',
  '🔽 Combobox',
  '📅 Date Picker',
  '📁 File Picker',
  '🖼️ Gallery',
  '👋 Hello Wave',
  '⭐ Icon',
  '🖼️ Image',
  '⌨️ Input',
  '🔢 Input OTP',
  '🔗 Link',
  '🎞️ MediaPicker',
  '🌙 Mode Toggle',
  '🚀 Onboarding',
  '🪟 ParallaxScrollView',
  '🎚️ Picker',
  '💭 Popover',
  '📊 Progress',
  '🔘 Radio',
  '📜 ScrollView',
  '🔍 SearchBar',
  '➖ Separator',
  '📤 Share',
  '📄 Sheet',
  '👻 Skeleton',
  '🌀 Spinner',
  '💡 Switch',
  '📋 Table',
  '📑 Tabs',
  '🔤 Text',
  '🔥 Toast',
  '🎚️ Toggle',
  '🎬 Video',
  '🧩 View',
];
