import { DatePicker, DateRange } from '@/components/ui/date-picker';
import React, { useState } from 'react';

export function DatePickerRange() {
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();

  return (
    <DatePicker
      mode='range'
      label='Select Date'
      value={selectedRange}
      onChange={setSelectedRange}
      placeholder='Choose a range'
    />
  );
}
