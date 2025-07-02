import { DatePicker } from '@/components/ui/date-picker';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';

export function DatePickerTime() {
  const [time24, setTime24] = useState<Date | undefined>();
  const [time12, setTime12] = useState<Date | undefined>();

  return (
    <View style={{ gap: 16 }}>
      <DatePicker
        label='24-Hour Time'
        mode='time'
        value={time24}
        onChange={setTime24}
        placeholder='Select time'
        timeFormat='24'
      />

      <DatePicker
        label='12-Hour Time'
        mode='time'
        value={time12}
        onChange={setTime12}
        placeholder='Select time'
        timeFormat='12'
      />
    </View>
  );
}
