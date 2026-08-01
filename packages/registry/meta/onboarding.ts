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
  accessibility: {
    summary: 'The Onboarding component is built with accessibility in mind:',
    items: [
      'Proper semantic structure for screen readers',
      'Keyboard navigation support',
      'High contrast support for progress indicators',
      'Descriptive labels for navigation buttons',
      'Support for dynamic text sizing',
      'Focus management between steps',
    ],
  },
};
