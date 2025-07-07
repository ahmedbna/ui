import { Onboarding, OnboardingStep } from '@/components/ui/onboarding';
import { Heart, Rocket, Target } from 'lucide-react-native';
import React from 'react';

export function OnboardingCustomButtons() {
  const steps: OnboardingStep[] = [
    {
      id: '1',
      title: '🎉 Welcome Aboard!',
      description:
        "We're thrilled to have you join our community of innovators and creators.",
      icon: <Heart color='#ee5a52' size={100} />,
    },
    {
      id: '2',
      title: '🚀 Boost Your Productivity',
      description:
        'Discover powerful tools that will transform the way you work and collaborate.',
      icon: <Rocket color='#4ecdc4' size={100} />,
    },
    {
      id: '3',
      title: '🎯 Achieve Your Goals',
      description:
        'Set ambitious targets and track your progress with our advanced analytics.',
      icon: <Target color='#45b7d1' size={100} />,
    },
  ];

  return (
    <Onboarding
      steps={steps}
      onComplete={() => console.log('Custom buttons onboarding completed!')}
      onSkip={() => console.log('Custom buttons onboarding skipped!')}
      primaryButtonText='🚀 Launch App'
      nextButtonText='👉 Continue'
      backButtonText='👈 Back'
      skipButtonText='⏭️ Skip for Now'
    />
  );
}
