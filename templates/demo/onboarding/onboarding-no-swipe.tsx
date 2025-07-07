import { Onboarding, OnboardingStep } from '@/components/ui/onboarding';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';

const StepIcon = ({
  name,
  bgColor,
  iconColor,
}: {
  name: string;
  bgColor: string;
  iconColor: string;
}) => (
  <View
    style={{
      padding: 18,
      backgroundColor: bgColor,
      borderRadius: 50,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    }}
  >
    <Feather name={name as any} size={56} color={iconColor} />
  </View>
);

export function OnboardingNoSwipe() {
  const steps: OnboardingStep[] = [
    {
      id: '1',
      title: 'Tutorial Mode',
      description:
        'Follow along with our step-by-step tutorial. Use the buttons below to navigate at your own pace.',
      icon: <StepIcon name='book-open' bgColor='#ede9fe' iconColor='#7c3aed' />,
    },
    {
      id: '2',
      title: 'Learn the Basics',
      description:
        'Master the fundamental features that will help you get the most out of our platform.',
      icon: <StepIcon name='layers' bgColor='#dcfce7' iconColor='#16a34a' />,
    },
    {
      id: '3',
      title: 'Practice Makes Perfect',
      description:
        'Try out the features yourself in a safe environment before working with real data.',
      icon: <StepIcon name='target' bgColor='#fef3c7' iconColor='#d97706' />,
    },
  ];

  return (
    <Onboarding
      steps={steps}
      onComplete={() => console.log('Tutorial completed!')}
      onSkip={() => console.log('Tutorial skipped!')}
      swipeEnabled={false}
      showProgress={true}
      primaryButtonText='Start Using App'
      nextButtonText='Next Lesson'
      skipButtonText='Skip Tutorial'
    />
  );
}
