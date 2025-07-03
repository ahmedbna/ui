// Example usage of the composable combobox - FIXED VERSION
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
} from '@/components/ui/combobox';
import { Text } from '@/components/ui/text';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Building, Check, Star } from 'lucide-react-native';
import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

const frameworks = [
  {
    value: 'react',
    label: 'React',
    description: 'A JavaScript library for building user interfaces',
  },
  {
    value: 'vue',
    label: 'Vue.js',
    description: 'The Progressive JavaScript Framework',
  },
  {
    value: 'angular',
    label: 'Angular',
    description: 'Platform for building mobile and desktop web applications',
  },
  {
    value: 'svelte',
    label: 'Svelte',
    description: 'Cybernetically enhanced web apps',
  },
  {
    value: 'solid',
    label: 'SolidJS',
    description:
      'Simple and performant reactivity for building user interfaces',
  },
];

const users = [
  {
    value: 'john',
    label: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://i.pravatar.cc/40?img=1',
    role: 'Developer',
  },
  {
    value: 'jane',
    label: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://i.pravatar.cc/40?img=2',
    role: 'Designer',
  },
  {
    value: 'bob',
    label: 'Bob Johnson',
    email: 'bob@example.com',
    avatar: 'https://i.pravatar.cc/40?img=3',
    role: 'Manager',
  },
];

export function ComboboxExamples() {
  const [value, setValue] = useState('');
  const [user, setUser] = useState('');
  const [multipleFrameworks, setMultipleFrameworks] = useState<string[]>([]);

  const primaryColor = useThemeColor({}, 'primary');
  const textColor = useThemeColor({}, 'text');
  const mutedColor = useThemeColor({}, 'textMuted');

  // Helper function to get framework label by value
  const getFrameworkLabel = (value: string) => {
    return frameworks.find((f) => f.value === value)?.label || value;
  };

  // Helper function to get user label by value
  const getUserLabel = (value: string) => {
    return users.find((u) => u.value === value)?.label || value;
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: textColor }]}>Combobox demo</Text>

      {/* Basic combobox example with custom value display */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          Basic Framework Selector
        </Text>
        <Combobox value={value} onValueChange={setValue}>
          <ComboboxTrigger>
            <Text
              style={[
                styles.triggerText,
                { color: value ? textColor : mutedColor },
              ]}
            >
              {value ? getFrameworkLabel(value) : 'Select framework...'}
            </Text>
          </ComboboxTrigger>
          <ComboboxContent>
            <ComboboxInput placeholder='Search framework...' />
            <ComboboxList>
              <ComboboxGroup>
                {frameworks.map((framework) => (
                  <ComboboxItem
                    key={framework.value}
                    value={framework.value}
                    searchValue={`${framework.label} ${framework.description}`}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? '' : currentValue);
                    }}
                  >
                    <Text>{framework.label}</Text>
                    <Check
                      size={16}
                      color={primaryColor}
                      style={{
                        marginLeft: 'auto',
                        opacity: value === framework.value ? 1 : 0,
                      }}
                    />
                  </ComboboxItem>
                ))}
              </ComboboxGroup>
              <ComboboxEmpty>No framework found.</ComboboxEmpty>
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </View>

      {/* Rich content combobox with custom components */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          User Selector with Rich Content
        </Text>
        <Combobox value={user} onValueChange={setUser}>
          <ComboboxTrigger>
            <Text
              style={[
                styles.triggerText,
                { color: user ? textColor : mutedColor },
              ]}
            >
              {user ? getUserLabel(user) : 'Select user...'}
            </Text>
          </ComboboxTrigger>
          <ComboboxContent>
            <ComboboxInput placeholder='Search users...' />
            <ComboboxList>
              <ComboboxGroup heading='Team Members'>
                {users.map((userData) => (
                  <ComboboxItem
                    key={userData.value}
                    value={userData.value}
                    searchValue={`${userData.label} ${userData.email} ${userData.role}`}
                  >
                    <UserItem user={userData} />
                  </ComboboxItem>
                ))}
              </ComboboxGroup>
              <ComboboxEmpty>No user found.</ComboboxEmpty>
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </View>

      {/* Multiple selection combobox */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          Multiple Framework Selection
        </Text>
        <Combobox
          multiple
          values={multipleFrameworks}
          onValuesChange={setMultipleFrameworks}
        >
          <ComboboxTrigger>
            <Text
              style={[
                styles.triggerText,
                {
                  color: multipleFrameworks.length > 0 ? textColor : mutedColor,
                },
              ]}
            >
              {multipleFrameworks.length === 0
                ? 'Select frameworks...'
                : multipleFrameworks.length === 1
                ? getFrameworkLabel(multipleFrameworks[0])
                : `${multipleFrameworks.length} frameworks selected`}
            </Text>
          </ComboboxTrigger>
          <ComboboxContent>
            <ComboboxInput placeholder='Search frameworks...' />
            <ComboboxList>
              <ComboboxGroup heading='JavaScript Frameworks'>
                {frameworks.map((framework) => (
                  <ComboboxItem
                    key={framework.value}
                    value={framework.value}
                    searchValue={`${framework.label} ${framework.description}`}
                  >
                    <FrameworkItem framework={framework} />
                  </ComboboxItem>
                ))}
              </ComboboxGroup>
              <ComboboxEmpty>No framework found.</ComboboxEmpty>
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </View>

      {/* Custom trigger with icons */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          Custom Trigger with Icons
        </Text>
        <Combobox value={value} onValueChange={setValue}>
          <ComboboxTrigger style={styles.customTrigger}>
            <Building size={16} color={mutedColor} />
            <Text
              style={[
                styles.triggerText,
                { color: value ? textColor : mutedColor },
              ]}
            >
              {value ? getFrameworkLabel(value) : 'Choose your framework...'}
            </Text>
            <Star size={16} color={mutedColor} />
          </ComboboxTrigger>
          <ComboboxContent>
            <ComboboxInput placeholder='Search framework...' />
            <ComboboxList>
              <ComboboxGroup>
                {frameworks.map((framework) => (
                  <ComboboxItem
                    key={framework.value}
                    value={framework.value}
                    searchValue={`${framework.label} ${framework.description}`}
                  >
                    {framework.label}
                  </ComboboxItem>
                ))}
              </ComboboxGroup>
              <ComboboxEmpty>
                <Text style={[styles.emptyText, { color: mutedColor }]}>
                  🔍 No framework matches your search
                </Text>
              </ComboboxEmpty>
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </View>
    </View>
  );
}

// Custom user item component
interface UserItemProps {
  user: {
    label: string;
    email: string;
    avatar: string;
    role: string;
  };
  isSelected?: boolean;
}

function UserItem({ user, isSelected }: UserItemProps) {
  const textColor = useThemeColor({}, 'text');
  const mutedColor = useThemeColor({}, 'textMuted');
  const primaryColor = useThemeColor({}, 'primary');

  return (
    <View style={styles.userItem}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={[styles.userName, { color: textColor }]}>
          {user.label}
        </Text>
        <Text style={[styles.userEmail, { color: mutedColor }]}>
          {user.email}
        </Text>
        <Text style={[styles.userRole, { color: mutedColor }]}>
          {user.role}
        </Text>
      </View>
      {isSelected && (
        <Check size={16} color={primaryColor} style={styles.checkIcon} />
      )}
    </View>
  );
}

// Custom framework item component
interface FrameworkItemProps {
  framework: {
    label: string;
    description: string;
  };
  isSelected?: boolean;
}

function FrameworkItem({ framework, isSelected }: FrameworkItemProps) {
  const textColor = useThemeColor({}, 'text');
  const mutedColor = useThemeColor({}, 'textMuted');
  const primaryColor = useThemeColor({}, 'primary');

  return (
    <View style={styles.frameworkItem}>
      <View style={styles.frameworkInfo}>
        <Text
          style={[
            styles.frameworkName,
            { color: textColor, fontWeight: isSelected ? '600' : '400' },
          ]}
        >
          {framework.label}
        </Text>
        <Text
          style={[styles.frameworkDescription, { color: mutedColor }]}
          numberOfLines={2}
        >
          {framework.description}
        </Text>
      </View>
      {isSelected && (
        <Check size={16} color={primaryColor} style={styles.checkIcon} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  customTrigger: {
    gap: 12,
  },
  triggerText: {
    fontSize: 16,
    flex: 1,
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
  },
  optionLabel: {
    flex: 1,
    fontSize: 14,
  },
  checkIcon: {
    marginLeft: 'auto',
  },
  // User item styles
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontWeight: '500',
  },
  userEmail: {
    fontSize: 12,
  },
  userRole: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  // Framework item styles
  frameworkItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    flex: 1,
  },
  frameworkInfo: {
    flex: 1,
  },
  frameworkName: {
    fontSize: 14,
    marginBottom: 2,
  },
  frameworkDescription: {
    fontSize: 12,
    lineHeight: 16,
  },
});
