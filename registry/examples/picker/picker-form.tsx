import { Button } from '@/components/ui/button';
import { Picker } from '@/components/ui/picker';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';

export function PickerForm() {
  const [category, setCategory] = useState<string>('');
  const [priority, setPriority] = useState<string>('');
  const [errors, setErrors] = useState<{
    category?: string;
    priority?: string;
  }>({});

  const categories = [
    { label: 'Bug Report', value: 'bug' },
    { label: 'Feature Request', value: 'feature' },
    { label: 'General Inquiry', value: 'general' },
  ];

  const priorities = [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
    { label: 'Critical', value: 'critical' },
  ];

  const handleSubmit = () => {
    const newErrors: { category?: string; priority?: string } = {};

    if (!category) {
      newErrors.category = 'Please select a category';
    }

    if (!priority) {
      newErrors.priority = 'Please select a priority';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Form is valid
      console.log('Form submitted:', { category, priority });
    }
  };

  return (
    <View style={{ gap: 16 }}>
      <Picker
        options={categories}
        value={category}
        onValueChange={(value) => {
          setCategory(value);
          if (errors.category) {
            setErrors((prev) => ({ ...prev, category: undefined }));
          }
        }}
        placeholder='Select category...'
        label='Category'
        error={errors.category}
        variant='outline'
      />

      <Picker
        options={priorities}
        value={priority}
        onValueChange={(value) => {
          setPriority(value);
          if (errors.priority) {
            setErrors((prev) => ({ ...prev, priority: undefined }));
          }
        }}
        placeholder='Select priority...'
        label='Priority'
        error={errors.priority}
        variant='outline'
      />

      <Button onPress={handleSubmit}>Submit Ticket</Button>
    </View>
  );
}
