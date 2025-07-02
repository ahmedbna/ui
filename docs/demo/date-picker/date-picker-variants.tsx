import { DatePicker } from '@/components/ui/date-picker';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';

export function DatePickerVariants() {
  const [filledDate, setFilledDate] = useState<Date | undefined>();
  const [outlineDate, setOutlineDate] = useState<Date | undefined>();
  const [groupDate, setGroupDate] = useState<Date | undefined>();

  return (
    <View style={{ gap: 16 }}>
      <DatePicker
        label='Filled Variant'
        variant='filled'
        value={filledDate}
        onChange={setFilledDate}
        placeholder='Select date'
      />

      <DatePicker
        label='Outline Variant'
        variant='outline'
        value={outlineDate}
        onChange={setOutlineDate}
        placeholder='Select date'
      />

      <DatePicker
        label='Group Variant'
        variant='group'
        value={groupDate}
        onChange={setGroupDate}
        placeholder='Select date'
      />
    </View>
  );
}
