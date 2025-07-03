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

const skills = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'nodejs', label: 'Node.js' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'go', label: 'Go' },
];

export function ComboboxMultiple() {
  const [values, setValues] = useState<string[]>([]);

  return (
    <Combobox multiple values={values} onValuesChange={setValues}>
      <ComboboxTrigger>
        <ComboboxValue placeholder='Select skills...' />
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput placeholder='Search skills...' />
        <ComboboxList>
          <ComboboxEmpty>No skill found.</ComboboxEmpty>
          {skills.map((skill) => (
            <ComboboxItem key={skill.value} value={skill.value}>
              {skill.label}
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
