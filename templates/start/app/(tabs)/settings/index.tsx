import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { ScrollView } from '@/components/ui/scroll-view';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useColor } from '@/hooks/useColor';
import { Code, Eye, Palette, Settings } from 'lucide-react-native';

export default function SettingsScreen() {
  const card = useColor('card');
  const border = useColor('border');
  const primary = useColor('primary');

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        flex: 1,
        gap: 18,
        paddingTop: 96,
        alignItems: 'center',
      }}
    >
      <ModeToggle />

      <View
        style={{
          width: '90%',
          marginBottom: 40,
        }}
      >
        <Text
          variant='title'
          style={{
            textAlign: 'center',
            marginBottom: 24,
            fontWeight: '700',
          }}
        >
          BNA UI Features
        </Text>

        <View
          style={{
            gap: 12,
          }}
        >
          {features.map((feature, index) => (
            <Card
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: 12,
              }}
            >
              <Icon name={feature.icon} size={24} color={primary} />

              <View
                style={{
                  flex: 1,
                }}
              >
                <Text
                  variant='body'
                  style={{
                    fontWeight: '600',
                    marginBottom: 4,
                  }}
                >
                  {feature.title}
                </Text>
                <Text variant='caption'>{feature.description}</Text>
              </View>
            </Card>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const features = [
  {
    title: 'Live Preview',
    description: 'See components in action with real-time demos',
    icon: Eye,
  },
  {
    title: 'Code Examples',
    description: 'Copy-paste ready code snippets',
    icon: Code,
  },
  {
    title: 'Customizable',
    description: 'Easy to customize with your brand colors',
    icon: Palette,
  },
  {
    title: 'Accessible',
    description: 'Built with accessibility in mind',
    icon: Settings,
  },
];
