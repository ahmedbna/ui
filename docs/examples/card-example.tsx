// docs/demo/card-example.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { CardDemo } from '@/docs/demo/card/card-demo';
import { CardNotification } from '@/docs/demo/card/card-notification';
import { CardPricing } from '@/docs/demo/card/card-pricing';
import { CardSimple } from '@/docs/demo/card/card-simple';
import { CardStats } from '@/docs/demo/card/card-stats';
import { CardWithForm } from '@/docs/demo/card/card-with-form';
import { CardWithImage } from '@/docs/demo/card/card-with-image';

// Main demo screen combining all card demo
export function CardExample() {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        justifyContent: 'center',
      }}
    >
      <Text variant='heading' style={{ marginBottom: 16 }}>
        Card
      </Text>

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Default
        </Text>
        <CardDemo />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Simple Card
        </Text>
        <CardSimple />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Card with Image
        </Text>
        <CardWithImage />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Card with Form
        </Text>
        <CardWithForm />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Statistics Cards
        </Text>
        <CardStats />
      </View> */}
      {/* 
      <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Notification Card
        </Text>
        <CardNotification />
      </View> */}

      <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Pricing Cards
        </Text>
        <CardPricing />
      </View>
    </View>
  );
}
