// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const viewMeta: ComponentMeta = {
  name: 'view',
  usage: {
    import: "import { View } from '@/components/ui/view';",
    snippet:
      '<View style={{ padding: 16 }}>\n  <Text>Content inside view</Text>\n</View>',
  },
  types: [
    {
      name: 'View',
      description:
        "A thin wrapper around React Native's `View` that defaults `backgroundColor` to `'transparent'`. Accepts every native `ViewProps` prop and forwards a ref to the underlying `View`.",
      props: [
        {
          name: 'style',
          type: 'ViewStyle',
          description:
            "Additional styles, merged over the `{ backgroundColor: 'transparent' }` default.",
        },
      ],
    },
  ],
};
