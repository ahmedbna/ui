import { Picker } from '@/components/ui/picker';
import { MapPin, Settings, User } from 'lucide-react-native';
import React, { useState } from 'react';

export function PickerStyled() {
  const [location, setLocation] = useState<string>('');
  const [user, setUser] = useState<string>('');
  const [setting, setSetting] = useState<string>('');

  const locations = [
    { label: 'New York', value: 'ny' },
    { label: 'Los Angeles', value: 'la' },
    { label: 'Chicago', value: 'chi' },
  ];

  const users = [
    { label: 'John Doe', value: 'john' },
    { label: 'Jane Smith', value: 'jane' },
    { label: 'Bob Johnson', value: 'bob' },
  ];

  const settings = [
    { label: 'Notifications', value: 'notifications' },
    { label: 'Privacy', value: 'privacy' },
    { label: 'Account', value: 'account' },
  ];

  return (
    <>
      <Picker
        options={locations}
        value={location}
        onValueChange={setLocation}
        placeholder='Select location...'
        icon={MapPin}
        label='Location'
        variant='outline'
      />

      <Picker
        options={users}
        value={user}
        onValueChange={setUser}
        placeholder='Select user...'
        icon={User}
        label='User'
        variant='filled'
        style={{ marginTop: 16 }}
      />

      <Picker
        options={settings}
        value={setting}
        onValueChange={setSetting}
        placeholder='Select setting...'
        icon={Settings}
        label='Settings'
        variant='group'
        style={{ marginTop: 16 }}
      />
    </>
  );
}
