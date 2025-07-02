import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';
import { Alert } from 'react-native';

export function DatePickerForm() {
  const [birthDate, setBirthDate] = useState<Date | undefined>();
  const [appointmentDate, setAppointmentDate] = useState<Date | undefined>();
  const [errors, setErrors] = useState<{
    birthDate?: string;
    appointmentDate?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!birthDate) {
      newErrors.birthDate = 'Birth date is required';
    } else {
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 18) {
        newErrors.birthDate = 'Must be 18 years or older';
      }
    }

    if (!appointmentDate) {
      newErrors.appointmentDate = 'Appointment date is required';
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (appointmentDate < today) {
        newErrors.appointmentDate = 'Appointment must be in the future';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      Alert.alert('Success', 'Form submitted successfully!');
    }
  };

  const maxBirthDate = new Date();
  maxBirthDate.setFullYear(maxBirthDate.getFullYear() - 18);

  const minAppointmentDate = new Date();
  minAppointmentDate.setDate(minAppointmentDate.getDate() + 1);

  return (
    <View style={{ gap: 16 }}>
      <Text variant='title' style={{ marginBottom: 8 }}>
        Registration Form
      </Text>

      <DatePicker
        label='Date of Birth'
        value={birthDate}
        onChange={(date) => {
          setBirthDate(date);
          if (errors.birthDate) {
            setErrors((prev) => ({ ...prev, birthDate: undefined }));
          }
        }}
        placeholder='Select your birth date'
        maximumDate={maxBirthDate}
        error={errors.birthDate}
      />

      <DatePicker
        label='Appointment'
        mode='datetime'
        value={appointmentDate}
        onChange={(date) => {
          setAppointmentDate(date);
          if (errors.appointmentDate) {
            setErrors((prev) => ({ ...prev, appointmentDate: undefined }));
          }
        }}
        placeholder='Select appointment date and time'
        minimumDate={minAppointmentDate}
        timeFormat='12'
        error={errors.appointmentDate}
      />

      <Button onPress={handleSubmit} style={{ marginTop: 8 }}>
        Submit Registration
      </Button>
    </View>
  );
}
