import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from '@/components/ui/combobox';
import React, { useState } from 'react';

export function ComboboxGroups() {
  const [value, setValue] = useState('');

  return (
    <Combobox value={value} onValueChange={setValue}>
      <ComboboxTrigger>
        <ComboboxValue placeholder='Select technology...' />
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput placeholder='Search technologies...' />
        <ComboboxList>
          <ComboboxEmpty>No technology found.</ComboboxEmpty>

          <ComboboxGroup heading='Frontend Frameworks'>
            <ComboboxItem value='react'>React</ComboboxItem>
            <ComboboxItem value='vue'>Vue</ComboboxItem>
            <ComboboxItem value='angular'>Angular</ComboboxItem>
            <ComboboxItem value='svelte'>Svelte</ComboboxItem>
          </ComboboxGroup>

          <ComboboxGroup heading='Backend Frameworks'>
            <ComboboxItem value='express'>Express.js</ComboboxItem>
            <ComboboxItem value='fastify'>Fastify</ComboboxItem>
            <ComboboxItem value='nestjs'>NestJS</ComboboxItem>
            <ComboboxItem value='koa'>Koa</ComboboxItem>
          </ComboboxGroup>

          <ComboboxGroup heading='Mobile'>
            <ComboboxItem value='react-native'>React Native</ComboboxItem>
            <ComboboxItem value='flutter'>Flutter</ComboboxItem>
            <ComboboxItem value='ionic'>Ionic</ComboboxItem>
          </ComboboxGroup>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
