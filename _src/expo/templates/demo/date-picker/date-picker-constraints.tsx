import { DatePicker } from '@/components/ui/date-picker';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';

export function DatePickerConstraints() {
  const [pastDate, setPastDate] = useState<Date | undefined>();
  const [futureDate, setFutureDate] = useState<Date | undefined>();
  const [rangeDate, setRangeDate] = useState<Date | undefined>();

  const today = new Date();
  const maxPastDate = new Date();
  maxPastDate.setDate(today.getDate() - 1); // Yesterday

  const minFutureDate = new Date();
  minFutureDate.setDate(today.getDate() + 1); // Tomorrow

  const minRangeDate = new Date();
  minRangeDate.setMonth(today.getMonth() - 1); // Last month

  const maxRangeDate = new Date();
  maxRangeDate.setMonth(today.getMonth() + 1); // Next month

  return (
    <View style={{ gap: 16 }}>
      <DatePicker
        label='Past Dates Only'
        value={pastDate}
        onChange={setPastDate}
        placeholder='Select past date'
        maximumDate={maxPastDate}
      />

      <DatePicker
        label='Future Dates Only'
        value={futureDate}
        onChange={setFutureDate}
        placeholder='Select future date'
        minimumDate={minFutureDate}
      />

      <DatePicker
        label='Date Range'
        value={rangeDate}
        onChange={setRangeDate}
        placeholder='Select date in range'
        minimumDate={minRangeDate}
        maximumDate={maxRangeDate}
      />
    </View>
  );
}
