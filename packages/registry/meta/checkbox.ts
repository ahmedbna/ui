// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const checkboxMeta: ComponentMeta = {
  name: 'checkbox',
  usage: {
    import: "import { Checkbox } from '@/components/ui/checkbox';",
    snippet:
      "const [checked, setChecked] = useState(false);\n\n<Checkbox\n  checked={checked}\n  onCheckedChange={setChecked}\n  label='Accept terms and conditions'\n/>;",
  },
  types: [
    {
      name: 'Checkbox',
      description:
        "A checkbox component that allows users to select or deselect an option. Uses `checked`/`onCheckedChange` (ARIA checkbox semantics) rather than `radio`'s `value`/`onValueChange` or `toggle`'s `pressed`/`onPressedChange` — each naming convention matches its own control's interaction model and is intentional, not an inconsistency.",
      props: [
        {
          name: 'checked',
          type: 'boolean',
          description: 'Whether the checkbox is checked.',
        },
        {
          name: 'onCheckedChange',
          type: '(checked: boolean) => void',
          description:
            'Callback function called when the checked state changes.',
        },
        {
          name: 'label',
          type: 'string',
          description: 'Optional label text to display next to the checkbox.',
        },
        {
          name: 'error',
          type: 'string',
          description: 'Error message to display (affects styling).',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: '`false`',
          description: 'Whether the checkbox is disabled.',
        },
        {
          name: 'labelStyle',
          type: 'TextStyle',
          description: 'Additional styles to apply to the label text.',
        },
        {
          name: 'accessibilityLabel',
          type: 'string',
          description:
            'Accessibility label for screen readers. Defaults to `label` when omitted.',
        },
      ],
    },
  ],
  accessibility: {
    summary: 'The Checkbox component is built with accessibility in mind:',
    items: [
      'Uses TouchableOpacity for proper touch handling',
      'Supports disabled state with reduced opacity',
      'Label text is properly associated with the checkbox',
      'Provides visual feedback for checked/unchecked states',
      'Uses semantic color theming for different states',
      'Supports custom styling while maintaining accessibility',
    ],
  },
};
