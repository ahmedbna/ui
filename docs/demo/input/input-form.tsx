import { Button } from '@/components/ui/button';
import { GroupedInput, GroupedInputItem, Input } from '@/components/ui/input';
import { View } from '@/components/ui/view';
import {
  Calendar,
  CreditCard,
  Lock,
  Mail,
  Phone,
  User,
} from 'lucide-react-native';
import React, { useState } from 'react';

export function InputForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!formData.email.includes('@'))
      newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      alert('Form submitted successfully!');
    }
  };

  return (
    <View style={{ gap: 24 }}>
      <GroupedInput title='Account Information'>
        <GroupedInputItem
          label='First Name'
          placeholder='John'
          icon={User}
          value={formData.firstName}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, firstName: text }))
          }
          error={errors.firstName}
        />
        <GroupedInputItem
          label='Last Name'
          placeholder='Doe'
          icon={User}
          value={formData.lastName}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, lastName: text }))
          }
        />
        <GroupedInputItem
          label='Email'
          placeholder='john@example.com'
          icon={Mail}
          value={formData.email}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, email: text }))
          }
          error={errors.email}
          keyboardType='email-address'
        />
        <GroupedInputItem
          label='Phone'
          placeholder='+1 (555) 123-4567'
          icon={Phone}
          value={formData.phone}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, phone: text }))
          }
          keyboardType='phone-pad'
        />
      </GroupedInput>

      <View style={{ gap: 16 }}>
        <Input
          label='Password'
          placeholder='Create password'
          icon={Lock}
          value={formData.password}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, password: text }))
          }
          error={errors.password}
          secureTextEntry
          variant='outline'
        />
        <Input
          label='Confirm Password'
          placeholder='Confirm password'
          icon={Lock}
          value={formData.confirmPassword}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, confirmPassword: text }))
          }
          error={errors.confirmPassword}
          secureTextEntry
          variant='outline'
        />
      </View>

      <GroupedInput title='Payment Information'>
        <GroupedInputItem
          label='Card Number'
          placeholder='1234 5678 9012 3456'
          icon={CreditCard}
          value={formData.cardNumber}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, cardNumber: text }))
          }
          keyboardType='numeric'
        />
        <GroupedInputItem
          label='Expiry Date'
          placeholder='MM/YY'
          icon={Calendar}
          value={formData.expiryDate}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, expiryDate: text }))
          }
          keyboardType='numeric'
        />
        <GroupedInputItem
          label='CVV'
          placeholder='123'
          value={formData.cvv}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, cvv: text }))
          }
          keyboardType='numeric'
        />
      </GroupedInput>

      <Button onPress={handleSubmit}>Submit Form</Button>
    </View>
  );
}
