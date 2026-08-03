// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../../schema.js';

export const useHapticsMeta: ComponentMeta = {
  name: 'useHaptics',
  usage: {
    import: "import { useHaptics, triggerHaptic } from '@/hooks/useHaptics';",
    snippet:
      "export function SaveButton({ haptic = true, onSave }) {\n  const feedback = useHaptics(haptic);\n\n  return (\n    <Button\n      haptic={false}\n      onPress={() => {\n        feedback('success');\n        onSave();\n      }}\n    >\n      Save\n    </Button>\n  );\n}",
  },
  types: [
    {
      name: 'useHaptics',
      description:
        'Returns a stable trigger that no-ops while `enabled` is false — the shape every component `haptic` prop plugs into. Its identity only changes when `enabled` does, so it is safe in a `useCallback` dependency array and will not defeat a `React.memo` boundary.',
      props: [
        {
          name: 'enabled',
          type: 'boolean',
          default: '`true`',
          description:
            'Whether the returned trigger fires. Pass a component `haptic` prop straight through.',
        },
        {
          name: 'returns',
          type: '(intent?: HapticIntent) => void',
          description:
            'Fire-and-forget trigger. Defaults to `impact-light` when called with no argument.',
        },
      ],
    },
    {
      name: 'triggerHaptic',
      description:
        'The module-level equivalent, for call sites that are not component bodies — a render prop, an event handler defined outside a component, or a `runOnJS` target. Never throws and never rejects: a device without a taptic engine, or a build where the native module is missing, must not be able to take a press handler down with it.',
      props: [
        {
          name: 'intent',
          type: 'HapticIntent',
          default: "`'impact-light'`",
          description: 'Which haptic to perform.',
        },
      ],
    },
  ],
  variants: [
    {
      name: 'HapticIntent',
      description:
        'What a haptic is *for*, rather than which API to call. On Android each intent maps to an `AndroidHaptics` constant performed through `performAndroidHapticsAsync` (`View.performHapticFeedback`), which is what native Android controls use — not the raw `Vibrator` API that `impactAsync` falls back to and that Expo explicitly discourages. On iOS and web the intent maps to `impactAsync` / `notificationAsync` / `selectionAsync`:',
      values: [
        {
          value: 'selection',
          description:
            'A discrete choice was registered — a radio option, a tab, a list row. iOS/web `selectionAsync()`, Android `Segment_Tick`',
        },
        {
          value: 'tick',
          description:
            'One step in a repeated series — month arrows, a time wheel. iOS/web `selectionAsync()`, Android `Clock_Tick`',
        },
        {
          value: 'toggle-on',
          description:
            'Something switched on. iOS/web `impactAsync(Light)`, Android `Toggle_On`',
        },
        {
          value: 'toggle-off',
          description:
            'Something switched off. iOS/web `impactAsync(Light)`, Android `Toggle_Off`',
        },
        {
          value: 'impact-light',
          description:
            'A generic press or an affordance opening. iOS/web `impactAsync(Light)`, Android `Virtual_Key`',
        },
        {
          value: 'impact-medium',
          description:
            'A heavier affordance. iOS/web `impactAsync(Medium)`, Android `Long_Press`',
        },
        {
          value: 'success',
          description:
            'A task completed. iOS/web `notificationAsync(Success)`, Android `Confirm`',
        },
        {
          value: 'warning',
          description:
            'A destructive or cautionary action. iOS/web `notificationAsync(Warning)`, Android `Reject`',
        },
        {
          value: 'error',
          description:
            'A task failed. iOS/web `notificationAsync(Error)`, Android `Reject`',
        },
      ],
    },
  ],
  accessibility: {
    summary: 'The hook supports accessibility by:',
    items: [
      'Treating haptics as decoration — every call is fire-and-forget, so feedback never blocks or breaks the interaction it accompanies',
      'Respecting the system touch-feedback setting on Android, which suppresses `performHapticFeedback` when the user has turned it off',
      'Respecting iOS Low Power Mode and the user’s Taptic Engine setting, both of which silence the engine',
      'Letting every consuming component opt out through its `haptic` prop, for users who find vibration distracting',
    ],
  },
};
