// Example usage of the Picker component
import { Picker, PickerOption, PickerSection } from '@/components/ui/picker';
import { Text } from '@/components/ui/text';
import { MapPin, Settings, User } from 'lucide-react-native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export function PickerExamples() {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Simple options array
  const countryOptions: PickerOption[] = [
    { label: 'United States', value: 'us' },
    { label: 'Canada', value: 'ca' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'Germany', value: 'de' },
    { label: 'France', value: 'fr' },
    { label: 'Japan', value: 'jp' },
    { label: 'Australia', value: 'au' },
  ];

  // Options with descriptions
  const languageOptions: PickerOption[] = [
    {
      label: 'English',
      value: 'en',
      description: 'Primary language',
    },
    {
      label: 'Spanish',
      value: 'es',
      description: 'Español',
    },
    {
      label: 'French',
      value: 'fr',
      description: 'Français',
    },
    {
      label: 'German',
      value: 'de',
      description: 'Deutsch',
    },
    {
      label: 'Japanese',
      value: 'ja',
      description: '日本語',
    },
    {
      label: 'Chinese',
      value: 'zh',
      description: '中文',
      disabled: true, // Example disabled option
    },
  ];

  // Sectioned options
  const categorySections: PickerSection[] = [
    {
      title: 'Technology',
      options: [
        { label: 'Web Development', value: 'web-dev' },
        { label: 'Mobile Development', value: 'mobile-dev' },
        { label: 'Data Science', value: 'data-science' },
        { label: 'DevOps', value: 'devops' },
      ],
    },
    {
      title: 'Design',
      options: [
        { label: 'UI/UX Design', value: 'ui-ux' },
        { label: 'Graphic Design', value: 'graphic' },
        { label: 'Product Design', value: 'product' },
      ],
    },
    {
      title: 'Business',
      options: [
        { label: 'Marketing', value: 'marketing' },
        { label: 'Sales', value: 'sales' },
        { label: 'Project Management', value: 'pm' },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <Text variant='title' style={styles.sectionTitle}>
        Picker Component demo
      </Text>

      {/* Basic Picker */}
      <View style={styles.section}>
        <Text variant='subtitle' style={styles.subtitle}>
          Basic Picker
        </Text>
        <Picker
          options={countryOptions}
          value={selectedCountry}
          onValueChange={setSelectedCountry}
          placeholder='Select a country'
          label='Country'
          icon={MapPin}
        />
      </View>

      {/* Multiple Selection Picker */}
      <View style={styles.section}>
        <Text variant='subtitle' style={styles.subtitle}>
          Multiple Selection
        </Text>
        <Picker
          options={languageOptions}
          values={selectedLanguages}
          onValuesChange={setSelectedLanguages}
          multiple
          placeholder='Select languages'
          label='Languages'
          icon={User}
          modalTitle='Select Languages'
        />
      </View>

      {/* Sectioned Picker with Search */}
      <View style={styles.section}>
        <Text variant='subtitle' style={styles.subtitle}>
          Sectioned with Search
        </Text>
        <Picker
          sections={categorySections}
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          placeholder='Select a category'
          label='Category'
          icon={Settings}
          searchable
          modalTitle='Choose Category'
          searchPlaceholder='Search categories...'
        />
      </View>

      {/* Outline Variant */}
      <View style={styles.section}>
        <Text variant='subtitle' style={styles.subtitle}>
          Outline Variant
        </Text>
        <Picker
          options={countryOptions}
          value={selectedCountry}
          onValueChange={setSelectedCountry}
          placeholder='Select a country'
          variant='outline'
          label='Country'
        />
      </View>

      {/* Group Variant */}
      <View style={styles.section}>
        <Text variant='subtitle' style={styles.subtitle}>
          Group Variant
        </Text>
        <Picker
          options={countryOptions}
          value={selectedCountry}
          onValueChange={setSelectedCountry}
          placeholder='Select a country'
          variant='group'
          label='Country'
        />
      </View>

      {/* Error State */}
      <View style={styles.section}>
        <Text variant='subtitle' style={styles.subtitle}>
          Error State
        </Text>
        <Picker
          options={countryOptions}
          value=''
          onValueChange={setSelectedCountry}
          placeholder='Select a country'
          label='Country'
          error='Please select a country'
        />
      </View>

      {/* Disabled State */}
      <View style={styles.section}>
        <Text variant='subtitle' style={styles.subtitle}>
          Disabled State
        </Text>
        <Picker
          options={countryOptions}
          value='us'
          onValueChange={setSelectedCountry}
          placeholder='Select a country'
          label='Country'
          disabled
        />
      </View>

      {/* Display Selected Values */}
      <View style={styles.section}>
        <Text variant='subtitle' style={styles.subtitle}>
          Selected Values
        </Text>
        <Text variant='caption'>Country: {selectedCountry || 'None'}</Text>
        <Text variant='caption'>
          Languages:{' '}
          {selectedLanguages.length > 0 ? selectedLanguages.join(', ') : 'None'}
        </Text>
        <Text variant='caption'>Category: {selectedCategory || 'None'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  subtitle: {
    marginBottom: 12,
  },
});
