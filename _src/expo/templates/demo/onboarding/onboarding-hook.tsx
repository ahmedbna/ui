import { Button } from '@/components/ui/button';
import {
  Onboarding,
  OnboardingStep,
  useOnboarding,
} from '@/components/ui/onboarding';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React from 'react';

function MainApp() {
  const { resetOnboarding } = useOnboarding();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8fafc',
      }}
    >
      <View style={{ alignItems: 'center', marginBottom: 40 }}>
        {/* <Text>{}</Text> */}
        <Text variant='heading' style={{ marginTop: 20, textAlign: 'center' }}>
          Welcome to the App!
        </Text>
        <Text
          variant='body'
          style={{
            marginTop: 12,
            textAlign: 'center',
            color: '#64748b',
            lineHeight: 22,
          }}
        >
          You've successfully completed the onboarding process. You can restart
          it anytime using the button below.
        </Text>
      </View>

      <Button
        onPress={resetOnboarding}
        variant='outline'
        style={{ paddingHorizontal: 24 }}
      >
        🔄 Restart Onboarding
      </Button>
    </View>
  );
}

function OnboardingFlow() {
  const { completeOnboarding, skipOnboarding } = useOnboarding();

  const steps: OnboardingStep[] = [
    {
      id: '1',
      title: 'Hook-based State',
      description:
        'This onboarding uses the useOnboarding hook to manage state across your entire app.',
      // icon: '🪝',
    },
    {
      id: '2',
      title: 'Persistent State',
      description:
        'The hook remembers your progress and can be used to control onboarding flow throughout your app.',
      // icon: '📱',
    },
    {
      id: '3',
      title: 'Easy Integration',
      description:
        'Integrate onboarding state with your existing app navigation and user management.',
      // icon: '🚀',
    },
  ];

  return (
    <Onboarding
      steps={steps}
      onComplete={completeOnboarding}
      onSkip={skipOnboarding}
      primaryButtonText='Complete & Continue'
      nextButtonText='Next Step'
      skipButtonText='Skip Demo'
    />
  );
}

export function OnboardingHook() {
  const { hasCompletedOnboarding } = useOnboarding();

  return hasCompletedOnboarding ? <MainApp /> : <OnboardingFlow />;
}
