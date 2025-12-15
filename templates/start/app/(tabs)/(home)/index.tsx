import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Link } from '@/components/ui/link';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useColor } from '@/hooks/useColor';
import { Terminal } from 'lucide-react-native';

export default function HomeScreen() {
  const green = useColor('green');
  const muted = useColor('muted');

  return (
    <View
      style={{
        flex: 1,
        gap: 16,
        padding: 24,
        justifyContent: 'center',
      }}
    >
      <Text
        type='title'
        style={{
          textAlign: 'center',
        }}
      >
        Built with ❤️ by BNA
      </Text>

      <View
        style={{
          marginBottom: 20,
        }}
      >
        <Card>
          <View
            style={{
              gap: 8,
              marginBottom: 16,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Icon name={Terminal} />

            <Text
              type='body'
              style={{
                fontWeight: '600',
              }}
            >
              Add Components
            </Text>
          </View>
          <View
            style={{
              backgroundColor: muted,
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderRadius: 8,
              marginBottom: 16,
              minWidth: '100%',
            }}
          >
            <Text
              type='caption'
              style={{
                color: green,
                fontFamily: 'monospace',
                fontSize: 16,
                textAlign: 'center',
              }}
            >
              npx bna-ui add avatar
            </Text>
          </View>
          <Text
            type='caption'
            style={{
              textAlign: 'center',
              opacity: 0.7,
            }}
          >
            Add components with a single command
          </Text>
        </Card>
      </View>

      <Link asChild href='/sheet'>
        <Button>Open Components Sheet</Button>
      </Link>

      <Link asChild href='/components-showcase'>
        <Button variant="outline">Open UI Showcase</Button>
      </Link>
    </View>
  );
}
