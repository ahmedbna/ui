// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const bottomSheetMeta: ComponentMeta = {
  name: 'bottom-sheet',
  usage: {
    import:
      "import { BottomSheet, useBottomSheet } from '@/components/ui/bottom-sheet';",
    snippet:
      "function MyComponent() {\n  const { isVisible, open, close } = useBottomSheet();\n\n  return (\n    <>\n      <Button onPress={open}>Open Bottom Sheet</Button>\n\n      <BottomSheet\n        isVisible={isVisible}\n        onClose={close}\n        title='Settings'\n        snapPoints={[0.3, 0.6, 0.9]}\n      >\n        <Text>Your content here</Text>\n      </BottomSheet>\n    </>\n  );\n}",
  },
  types: [
    {
      name: 'BottomSheet',
      description:
        'A draggable bottom sheet modal with configurable snap points.',
      props: [
        {
          name: 'isVisible',
          type: 'boolean',
          required: true,
          description: 'Whether the sheet is visible.',
        },
        {
          name: 'onClose',
          type: '() => void',
          required: true,
          description: 'Called when the sheet is dismissed.',
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'The content rendered inside the sheet.',
        },
        {
          name: 'snapPoints',
          type: 'number[]',
          default: '`[0.3, 0.6, 0.9]`',
          description:
            'Fractions of screen height the sheet can snap to. Tapping the drag handle cycles through them.',
        },
        {
          name: 'enableBackdropDismiss',
          type: 'boolean',
          default: '`true`',
          description: 'Whether tapping the backdrop closes the sheet.',
        },
        {
          name: 'title',
          type: 'string',
          description: 'Optional title rendered above the content.',
        },
        {
          name: 'style',
          type: 'ViewStyle',
          description: 'Additional styles for the sheet container.',
        },
        {
          name: 'disablePanGesture',
          type: 'boolean',
          default: '`false`',
          description:
            'Disables the drag-to-resize/dismiss gesture, leaving the drag handle tap and backdrop dismiss as the only ways to interact.',
        },
      ],
    },
  ],
  accessibility: {
    summary: 'The BottomSheet component includes accessibility features:',
    items: [
      '**Modal Semantics**: Proper modal behavior for screen readers',
      '**Focus Management**: Traps focus within the sheet when open',
      '**Gesture Alternatives**: Provides non-gesture ways to interact',
      '**Backdrop Dismiss**: Can be disabled for better accessibility control',
    ],
  },
};
