// registry/examples/link-example.tsx
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { LinkBrowser } from '@/docs/demo/link/link-browser';
import { LinkButtons } from '@/docs/demo/link/link-buttons';
import { LinkCustom } from '@/docs/demo/link/link-custom';
import { LinkDemo } from '@/docs/demo/link/link-demo';
import { LinkExternal } from '@/docs/demo/link/link-external';
import { LinkStyled } from '@/docs/demo/link/link-styled';
import { LinkTypes } from '@/docs/demo/link/link-types';

// Main demo screen combining all examples
export function LinkExample() {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        justifyContent: 'center',
      }}
    >
      <Text variant='heading' style={{ marginBottom: 16 }}>
        Link
      </Text>

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Default Internal Navigation
        </Text>
        <LinkDemo />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          External Links
        </Text>
        <LinkExternal />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Browser Options
        </Text>
        <LinkBrowser />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Different Link Types
        </Text>
        <LinkTypes />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Custom Children Components
        </Text>
        <LinkCustom />
      </View> */}

      {/* <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Styled Links
        </Text>
        <LinkStyled />
      </View> */}

      <View>
        <Text variant='title' style={{ marginBottom: 12 }}>
          Button-Style Links
        </Text>
        <LinkButtons />
      </View>
    </View>
  );
}
