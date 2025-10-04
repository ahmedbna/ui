// Example usage of Popover component
import {
  Popover,
  PopoverBody,
  PopoverClose,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Text } from '@/components/ui/text';
import { useColor } from '@/hooks/useColor';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export function PopoverExamples() {
  const [isControlledOpen, setIsControlledOpen] = useState(false);
  const primaryColor = useColor('primary');
  const cardColor = useColor('card');

  return (
    <View style={styles.container}>
      {/* Basic Popover */}
      <View style={styles.section}>
        <Text variant='subtitle'>Basic Popover</Text>
        <Popover>
          <PopoverTrigger>
            <View style={[styles.button, { backgroundColor: primaryColor }]}>
              <Text style={styles.buttonText}>Open Popover</Text>
            </View>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverBody>
              <Text>This is a basic popover content.</Text>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </View>

      {/* Popover with Header and Footer */}
      <View style={styles.section}>
        <Text variant='subtitle'>With Header & Footer</Text>
        <Popover>
          <PopoverTrigger>Settings</PopoverTrigger>
          <PopoverContent maxWidth={280}>
            <PopoverHeader>
              <Text variant='title'>Account Settings</Text>
            </PopoverHeader>
            <PopoverBody>
              <Text>
                Manage your account preferences and privacy settings from here.
              </Text>
              <View style={styles.settingItem}>
                <Text>Notifications</Text>
              </View>
              <View style={styles.settingItem}>
                <Text>Privacy</Text>
              </View>
              <View style={styles.settingItem}>
                <Text>Security</Text>
              </View>
            </PopoverBody>
            <PopoverFooter>
              <PopoverClose>
                <View
                  style={[styles.smallButton, { backgroundColor: cardColor }]}
                >
                  <Text>Cancel</Text>
                </View>
              </PopoverClose>
              <PopoverClose>
                <View
                  style={[
                    styles.smallButton,
                    { backgroundColor: primaryColor },
                  ]}
                >
                  <Text style={styles.buttonText}>Save</Text>
                </View>
              </PopoverClose>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </View>

      {/* Different Positions */}
      <View style={styles.section}>
        <Text variant='subtitle'>Different Positions</Text>
        <View style={styles.positionGrid}>
          {/* Top */}
          <Popover>
            <PopoverTrigger>
              <View
                style={[
                  styles.positionButton,
                  { backgroundColor: primaryColor },
                ]}
              >
                <Text style={styles.buttonText}>Top</Text>
              </View>
            </PopoverTrigger>
            <PopoverContent side='top' align='center'>
              <PopoverBody>
                <Text>Positioned at top</Text>
              </PopoverBody>
            </PopoverContent>
          </Popover>

          {/* Right */}
          <Popover>
            <PopoverTrigger>
              <View
                style={[
                  styles.positionButton,
                  { backgroundColor: primaryColor },
                ]}
              >
                <Text style={styles.buttonText}>Right</Text>
              </View>
            </PopoverTrigger>
            <PopoverContent side='right' align='center'>
              <PopoverBody>
                <Text>Positioned at right</Text>
              </PopoverBody>
            </PopoverContent>
          </Popover>

          {/* Bottom */}
          <Popover>
            <PopoverTrigger>
              <View
                style={[
                  styles.positionButton,
                  { backgroundColor: primaryColor },
                ]}
              >
                <Text style={styles.buttonText}>Bottom</Text>
              </View>
            </PopoverTrigger>
            <PopoverContent side='bottom' align='center'>
              <PopoverBody>
                <Text>Positioned at bottom</Text>
              </PopoverBody>
            </PopoverContent>
          </Popover>

          {/* Left */}
          <Popover>
            <PopoverTrigger>
              <View
                style={[
                  styles.positionButton,
                  { backgroundColor: primaryColor },
                ]}
              >
                <Text style={styles.buttonText}>Left</Text>
              </View>
            </PopoverTrigger>
            <PopoverContent side='left' align='center'>
              <PopoverBody>
                <Text>Positioned at left</Text>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </View>
      </View>

      {/* Controlled Popover */}
      <View style={styles.section}>
        <Text variant='subtitle'>Controlled Popover</Text>
        <Popover open={isControlledOpen} onOpenChange={setIsControlledOpen}>
          <PopoverTrigger>
            <View style={[styles.button, { backgroundColor: primaryColor }]}>
              <Text style={styles.buttonText}>
                {isControlledOpen ? 'Close' : 'Open'} Controlled
              </Text>
            </View>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverBody>
              <Text>This is a controlled popover.</Text>
              <Text variant='caption'>State is managed externally</Text>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </View>

      {/* Custom Trigger */}
      <View style={styles.section}>
        <Text variant='subtitle'>Custom Trigger (asChild)</Text>
        <Popover>
          <PopoverTrigger asChild>
            <TouchableOpacity style={styles.customTrigger}>
              <Text>🎨 Custom Styled Trigger</Text>
            </TouchableOpacity>
          </PopoverTrigger>
          <PopoverContent align='start'>
            <PopoverBody>
              <Text>Using asChild prop allows custom trigger styling</Text>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </View>

      {/* Menu-like Popover */}
      <View style={styles.section}>
        <Text variant='subtitle'>Menu Example</Text>
        <Popover>
          <PopoverTrigger>
            <View style={[styles.button, { backgroundColor: primaryColor }]}>
              <Text style={styles.buttonText}>Options ⋮</Text>
            </View>
          </PopoverTrigger>
          <PopoverContent maxWidth={200} align='end'>
            <PopoverBody style={styles.menuBody}>
              <PopoverClose asChild>
                <TouchableOpacity style={styles.menuItem}>
                  <Text>Edit</Text>
                </TouchableOpacity>
              </PopoverClose>
              <PopoverClose asChild>
                <TouchableOpacity style={styles.menuItem}>
                  <Text>Share</Text>
                </TouchableOpacity>
              </PopoverClose>
              <PopoverClose asChild>
                <TouchableOpacity style={styles.menuItem}>
                  <Text>Delete</Text>
                </TouchableOpacity>
              </PopoverClose>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 24,
  },
  section: {
    gap: 12,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  smallButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  settingItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  positionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  positionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  customTrigger: {
    padding: 16,
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  menuBody: {
    padding: 8,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
});

// Example integration in a tab or screen
export function PopoverScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Text>Hello</Text>
      <PopoverExamples />
    </View>
  );
}
