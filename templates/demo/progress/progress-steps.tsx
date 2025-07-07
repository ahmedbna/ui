import { Progress } from '@/components/ui/progress';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

export function ProgressSteps() {
  const [currentStep, setCurrentStep] = useState(2);

  const steps = ['Account Setup', 'Personal Info', 'Verification', 'Complete'];

  const progress = (currentStep / (steps.length - 1)) * 100;

  return (
    <View style={{ gap: 20 }}>
      {/* Step Progress */}
      <View style={{ gap: 16 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text variant='title'>Setup Progress</Text>
          <Text variant='caption' style={{ color: '#666' }}>
            Step {currentStep + 1} of {steps.length}
          </Text>
        </View>

        <Progress value={progress} height={8} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 8,
          }}
        >
          {steps.map((step, index) => (
            <View
              key={index}
              style={{
                alignItems: 'center',
                flex: 1,
              }}
            >
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  backgroundColor: index <= currentStep ? '#007AFF' : '#e5e7eb',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 8,
                }}
              >
                <Text
                  variant='caption'
                  style={{
                    color: index <= currentStep ? '#fff' : '#666',
                    fontWeight: '600',
                  }}
                >
                  {index < currentStep ? '✓' : index + 1}
                </Text>
              </View>
              <Text
                variant='caption'
                style={{
                  color: index <= currentStep ? '#000' : '#999',
                  fontWeight: index === currentStep ? '600' : '400',
                  textAlign: 'center',
                }}
              >
                {step}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Controls */}
      <View
        style={{
          flexDirection: 'row',
          gap: 12,
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            backgroundColor: currentStep > 0 ? '#007AFF' : '#e5e7eb',
            borderRadius: 6,
          }}
          onPress={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          <Text
            style={{
              color: currentStep > 0 ? '#fff' : '#999',
              fontWeight: '500',
            }}
          >
            Previous
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            backgroundColor:
              currentStep < steps.length - 1 ? '#007AFF' : '#e5e7eb',
            borderRadius: 6,
          }}
          onPress={() =>
            setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
          }
          disabled={currentStep === steps.length - 1}
        >
          <Text
            style={{
              color: currentStep < steps.length - 1 ? '#fff' : '#999',
              fontWeight: '500',
            }}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
