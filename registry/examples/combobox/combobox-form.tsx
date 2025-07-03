import { Button } from '@/components/ui/button';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from '@/components/ui/combobox';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';

const roles = [
  { value: 'frontend', label: 'Frontend Developer' },
  { value: 'backend', label: 'Backend Developer' },
  { value: 'fullstack', label: 'Full Stack Developer' },
  { value: 'mobile', label: 'Mobile Developer' },
  { value: 'devops', label: 'DevOps Engineer' },
  { value: 'qa', label: 'QA Engineer' },
  { value: 'designer', label: 'UI/UX Designer' },
];

export function ComboboxForm() {
  const [selectedRole, setSelectedRole] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!selectedRole) {
      setError('Please select a role');
      return;
    }
    setError('');
    setSubmitted(true);

    // Reset after 2 seconds
    setTimeout(() => {
      setSubmitted(false);
      setSelectedRole('');
    }, 2000);
  };

  return (
    <View style={{ gap: 16 }}>
      <View>
        <Text style={{ marginBottom: 8, fontWeight: '600' }}>Job Role *</Text>
        <Combobox
          value={selectedRole}
          onValueChange={(value) => {
            setSelectedRole(value);
            setError('');
          }}
        >
          <ComboboxTrigger error={!!error}>
            <ComboboxValue placeholder='Select your role...' />
          </ComboboxTrigger>
          <ComboboxContent>
            <ComboboxInput placeholder='Search roles...' />
            <ComboboxList>
              <ComboboxEmpty>No role found.</ComboboxEmpty>
              {roles.map((role) => (
                <ComboboxItem key={role.value} value={role.value}>
                  {role.label}
                </ComboboxItem>
              ))}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
        {error && (
          <Text style={{ color: 'red', fontSize: 12, marginTop: 4 }}>
            {error}
          </Text>
        )}
      </View>

      <Button onPress={handleSubmit} disabled={submitted}>
        {submitted ? 'Submitted!' : 'Submit'}
      </Button>
    </View>
  );
}
