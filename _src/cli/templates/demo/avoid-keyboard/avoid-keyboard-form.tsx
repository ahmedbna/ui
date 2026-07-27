import { AvoidKeyboard } from '@/components/ui/avoid-keyboard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { Mail, Lock, User, Phone, MessageSquare } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';

export function AvoidKeyboardForm() {
  const [formData, setFormData] = useState({
    first: '',
    last: '',
    email: '',
    phone: '',
    password: '',
    confrim: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.first.trim()) {
      newErrors.first = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Form is valid
      console.log('Form submitted:', formData);
      // Reset form
      setFormData({
        first: '',
        last: '',
        email: '',
        phone: '',
        password: '',
        confrim: '',
        message: '',
      });
      setErrors({});
    }
  };

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={{ padding: 20 }}>
        <Text variant='title' style={{ marginBottom: 8 }}>
          Registration Form
        </Text>
        <Text variant='body' style={{ opacity: 0.7 }}>
          Fill out the form below. Notice how the keyboard avoidance keeps
          inputs visible.
        </Text>
      </View>

      {/* Form Content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20, gap: 16 }}
        keyboardShouldPersistTaps='handled'
      >
        <Input
          label='Frist Name'
          placeholder='Enter your first name'
          icon={User}
          value={formData.first}
          onChangeText={(value) => updateField('first', value)}
          error={errors.first}
        />

        <Input
          label='Last Name'
          placeholder='Enter your last name'
          icon={User}
          value={formData.last}
          onChangeText={(value) => updateField('last', value)}
          error={errors.last}
        />

        <Input
          label='Email'
          placeholder='Enter your email'
          icon={Mail}
          value={formData.email}
          onChangeText={(value) => updateField('email', value)}
          error={errors.email}
          keyboardType='email-address'
          autoCapitalize='none'
        />

        <Input
          label='Confirm'
          placeholder='Confirm your email'
          icon={Mail}
          value={formData.email}
          onChangeText={(value) => updateField('email', value)}
          error={errors.email}
          keyboardType='email-address'
          autoCapitalize='none'
        />

        <Input
          label='Phone'
          placeholder='Enter your phone number'
          icon={Phone}
          value={formData.phone}
          onChangeText={(value) => updateField('phone', value)}
          error={errors.phone}
          keyboardType='phone-pad'
        />

        <Input
          label='Password'
          placeholder='Create a password'
          icon={Lock}
          value={formData.password}
          onChangeText={(value) => updateField('password', value)}
          error={errors.password}
          secureTextEntry
        />

        <Input
          label='Confirm'
          placeholder='Confirm password'
          icon={Lock}
          value={formData.confrim}
          onChangeText={(value) => updateField('confrim', value)}
          error={errors.confrim}
          secureTextEntry
        />

        <Button onPress={handleSubmit} style={{ marginBottom: 20 }}>
          Create Account
        </Button>

        <Text variant='caption' style={{ textAlign: 'center', opacity: 0.6 }}>
          By creating an account, you agree to our Terms of Service and Privacy
          Policy.
        </Text>
      </ScrollView>

      {/* Keyboard avoidance for the form */}
      <AvoidKeyboard />
    </View>
  );
}
