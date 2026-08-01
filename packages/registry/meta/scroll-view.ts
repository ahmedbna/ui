// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const scrollViewMeta: ComponentMeta = {
  name: 'scroll-view',
  usage: {
    import: "import { ScrollView } from '@/components/ui/scroll-view';",
    snippet:
      '<ScrollView>\n  <Text>Your scrollable content here</Text>\n</ScrollView>',
  },
  types: [
    {
      name: 'ScrollView',
      description:
        "A wrapper around React Native's ScrollView with enhanced styling capabilities. All other props from React Native's ScrollView are also supported.",
      props: [
        {
          name: 'style',
          type: 'ViewStyle',
          description: 'Additional styles to apply to the scroll view.',
        },
        {
          name: 'contentContainerStyle',
          type: 'ViewStyle',
          description: 'Styles applied to the scroll view content container.',
        },
        {
          name: 'horizontal',
          type: 'boolean',
          default: '`false`',
          description:
            "When true, the scroll view's children are arranged horizontally.",
        },
        {
          name: 'showsVerticalScrollIndicator',
          type: 'boolean',
          default: '`true`',
          description: 'When true, shows a vertical scroll indicator.',
        },
        {
          name: 'showsHorizontalScrollIndicator',
          type: 'boolean',
          default: '`true`',
          description: 'When true, shows a horizontal scroll indicator.',
        },
        {
          name: 'scrollEnabled',
          type: 'boolean',
          default: '`true`',
          description: 'When false, the content does not scroll.',
        },
        {
          name: 'bounces',
          type: 'boolean',
          default: '`true`',
          description:
            'When true, the scroll view bounces when it reaches the end.',
        },
        {
          name: 'bouncesZoom',
          type: 'boolean',
          default: '`true`',
          description: 'When true, gestures can drive zoom past min/max.',
        },
        {
          name: 'alwaysBounceVertical',
          type: 'boolean',
          default: '`false`',
          description:
            'When true, the scroll view bounces vertically even when content is smaller.',
        },
        {
          name: 'alwaysBounceHorizontal',
          type: 'boolean',
          default: '`false`',
          description:
            'When true, the scroll view bounces horizontally even when content is smaller.',
        },
        {
          name: 'pagingEnabled',
          type: 'boolean',
          default: '`false`',
          description:
            "When true, the scroll view stops on multiples of the scroll view's size.",
        },
        {
          name: 'scrollEventThrottle',
          type: 'number',
          description:
            'Controls how often the scroll event will be fired while scrolling.',
        },
        {
          name: 'onScroll',
          type: 'function',
          description: 'Fires at most once per frame during scrolling.',
        },
        {
          name: 'onScrollBeginDrag',
          type: 'function',
          description: 'Called when the user begins to drag the scroll view.',
        },
        {
          name: 'onScrollEndDrag',
          type: 'function',
          description: 'Called when the user stops dragging the scroll view.',
        },
        {
          name: 'onMomentumScrollBegin',
          type: 'function',
          description: 'Called when the momentum scroll starts.',
        },
        {
          name: 'onMomentumScrollEnd',
          type: 'function',
          description: 'Called when the momentum scroll ends.',
        },
        {
          name: 'refreshControl',
          type: 'RefreshControl',
          description:
            'A RefreshControl component for pull-to-refresh functionality.',
        },
        {
          name: 'keyboardDismissMode',
          type: "'none' | 'on-drag' | 'interactive'",
          default: "`'none'`",
          description: 'Determines when the keyboard is dismissed.',
        },
        {
          name: 'keyboardShouldPersistTaps',
          type: "'always' | 'never' | 'handled'",
          default: "`'never'`",
          description:
            'Determines when the keyboard should stay visible after a tap.',
        },
      ],
    },
  ],
  accessibility: {
    summary:
      "The ScrollView component maintains React Native's built-in accessibility features:",
    items: [
      'Automatically announces scrollable content to screen readers',
      'Supports gesture-based navigation for users with accessibility needs',
      'Maintains proper focus management during scrolling',
      'Compatible with VoiceOver and TalkBack',
      'Supports dynamic text sizing and high contrast modes',
    ],
  },
};
