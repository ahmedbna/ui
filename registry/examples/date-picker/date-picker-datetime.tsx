import { DatePicker } from '@/components/ui/date-picker';
import React, { useState } from 'react';

export function DatePickerDateTime() {
  const [dateTime, setDateTime] = useState<Date | undefined>();

  return (
    <DatePicker
      label='Date & Time'
      mode='datetime'
      value={dateTime}
      onChange={setDateTime}
      placeholder='Select date and time'
      timeFormat='12'
    />
  );
}
