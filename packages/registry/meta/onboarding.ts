// Documentation metadata. Rendered by <ApiReference> on the docs page and
// served as structured data at /r/ai/<name>.json.
import type { ComponentMeta } from '../schema.js';

export const onboardingMeta: ComponentMeta = {
  name: 'onboarding',
  usage: {
    import:
      "import { Onboarding, OnboardingStep } from '@/components/ui/onboarding';",
    snippet:
      "const steps: OnboardingStep[] = [\n  {\n    id: '1',\n    title: 'Welcome',\n    description: 'Get started with our amazing app',\n    icon: <WelcomeIcon />,\n  },\n  {\n    id: '2',\n    title: 'Explore Features',\n    description: 'Discover all the powerful features we offer',\n    icon: <FeaturesIcon />,\n  },\n  {\n    id: '3',\n    title: 'Get Started',\n    description: \"You are all set! Let's begin your journey\",\n    icon: <StartIcon />,\n  },\n];\n\n<Onboarding\n  steps={steps}\n  onComplete={() => console.log('Onboarding completed')}\n  onSkip={() => console.log('Onboarding skipped')}\n/>;",
  },
  types: [
    {
      name: 'Onboarding',
      description: 'A swipeable, multi-step onboarding flow.',
      props: [
        {
          name: 'steps',
          type: 'OnboardingStep[]',
          required: true,
          description: 'The steps to display, in order.',
        },
        {
          name: 'onComplete',
          type: '() => void',
          required: true,
          description: "Called when the last step's primary button is pressed.",
        },
        {
          name: 'onSkip',
          type: '() => void',
          description:
            'Called when Skip is pressed. Falls back to `onComplete` if omitted.',
        },
        {
          name: 'showSkip',
          type: 'boolean',
          default: '`true`',
          description:
            'Whether to show the Skip button (hidden on the last step).',
        },
        {
          name: 'showProgress',
          type: 'boolean',
          default: '`true`',
          description: 'Whether to show the progress dots.',
        },
        {
          name: 'swipeEnabled',
          type: 'boolean',
          default: '`true`',
          description:
            'Whether steps can be swiped between, in addition to using the buttons.',
        },
        {
          name: 'primaryButtonText',
          type: 'string',
          default: "`'Get Started'`",
          description: 'Label for the primary button on the last step.',
        },
        {
          name: 'skipButtonText',
          type: 'string',
          default: "`'Skip'`",
          description: 'Label for the skip button.',
        },
        {
          name: 'nextButtonText',
          type: 'string',
          default: "`'Next'`",
          description: 'Label for the primary button on non-final steps.',
        },
        {
          name: 'backButtonText',
          type: 'string',
          default: "`'Back'`",
          description: 'Label for the back button (hidden on the first step).',
        },
        {
          name: 'style',
          type: 'ViewStyle',
          description: 'Additional styles for the container.',
        },
        {
          name: 'children',
          type: 'ReactNode',
          description:
            "Optional extra content rendered below each step's text.",
        },
      ],
    },
    {
      name: 'OnboardingStep',
      description: 'One step in the `steps` array.',
      props: [
        {
          name: 'id',
          type: 'string',
          required: true,
          description: 'A unique key for the step.',
        },
        {
          name: 'title',
          type: 'string',
          required: true,
          description: 'The step title.',
        },
        {
          name: 'description',
          type: 'string',
          required: true,
          description: 'The step body text.',
        },
        {
          name: 'image',
          type: 'ReactNode',
          description:
            'Optional image content, shown above the text. Takes priority over `icon`.',
        },
        {
          name: 'icon',
          type: 'ReactNode',
          description:
            'Optional icon content, shown above the text when `image` is not set.',
        },
        {
          name: 'backgroundColor',
          type: 'string',
          description: 'Overrides the theme background color for this step.',
        },
      ],
    },
  ],
  accessibility: {
    summary: 'The Onboarding component is built with accessibility in mind:',
    items: [
      'Announces each step change via `AccessibilityInfo.announceForAccessibility` ("<title>. Step X of Y.")',
      'The decorative progress dots are hidden from the accessibility tree',
    ],
  },
};
