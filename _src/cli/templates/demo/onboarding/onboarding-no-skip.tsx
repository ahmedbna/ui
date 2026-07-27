import { Onboarding, OnboardingStep } from '@/components/ui/onboarding';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';

const InfoIcon = ({ name, color }: { name: string; color: string }) => (
  <View
    style={{
      padding: 20,
      backgroundColor: `${color}20`,
      borderRadius: 60,
      borderWidth: 2,
      borderColor: color,
    }}
  >
    <Feather name={name as any} size={60} color={color} />
  </View>
);

export function OnboardingNoSkip() {
  const steps: OnboardingStep[] = [
    {
      id: '1',
      title: 'Setup Your Profile',
      description:
        "Let's start by setting up your profile. This helps us personalize your experience.",
      icon: <InfoIcon name='user' color='#8b5cf6' />,
    },
    {
      id: '2',
      title: 'Choose Preferences',
      description:
        'Select your preferences to customize the app according to your needs and workflow.',
      icon: <InfoIcon name='settings' color='#06b6d4' />,
    },
    {
      id: '3',
      title: 'Enable Notifications',
      description:
        'Stay updated with important notifications. You can always change these settings later.',
      icon: <InfoIcon name='bell' color='#f59e0b' />,
    },
    {
      id: '4',
      title: 'All Set!',
      description:
        "Congratulations! Your account is now ready. Let's dive in and explore the features.",
      icon: <InfoIcon name='check-circle' color='#10b981' />,
    },
  ];

  return (
    <Onboarding
      steps={steps}
      onComplete={() => console.log('Required onboarding completed!')}
      showSkip={false}
      primaryButtonText='Complete Setup'
      nextButtonText='Continue'
      backButtonText='Previous'
    />
  );
}
