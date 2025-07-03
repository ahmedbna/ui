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
import React, { useState } from 'react';

const countries = [
  {
    value: 'us',
    label: 'United States',
    searchValue: 'united states america usa',
  },
  {
    value: 'uk',
    label: 'United Kingdom',
    searchValue: 'united kingdom england britain uk',
  },
  { value: 'ca', label: 'Canada', searchValue: 'canada canadian' },
  {
    value: 'au',
    label: 'Australia',
    searchValue: 'australia australian aussie',
  },
  { value: 'de', label: 'Germany', searchValue: 'germany german deutschland' },
  { value: 'fr', label: 'France', searchValue: 'france french français' },
  { value: 'jp', label: 'Japan', searchValue: 'japan japanese nihon' },
  { value: 'cn', label: 'China', searchValue: 'china chinese zhongguo' },
];

export function ComboboxSearch() {
  const [value, setValue] = useState('');

  return (
    <Combobox value={value} onValueChange={setValue}>
      <ComboboxTrigger>
        <ComboboxValue placeholder='Select country...' />
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput placeholder='Search countries...' />
        <ComboboxList>
          <ComboboxEmpty>No country found.</ComboboxEmpty>
          {countries.map((country) => (
            <ComboboxItem
              key={country.value}
              value={country.value}
              searchValue={country.searchValue}
            >
              {country.label}
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
