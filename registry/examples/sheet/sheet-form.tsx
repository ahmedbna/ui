import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useState } from 'react';
import { Alert, StyleSheet, TextInput } from 'react-native';

export function SheetForm() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');
  const borderColor = useThemeColor({}, 'border');
  const mutedColor = useThemeColor({}, 'textMuted');

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    Alert.alert('Success', 'Form submitted successfully!');
    setFormData({ name: '', email: '', message: '' });
    setOpen(false);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Button>Open Contact Form</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Contact Us</SheetTitle>
          <SheetDescription>
            Fill out the form below and we'll get back to you soon.
          </SheetDescription>
        </SheetHeader>
        <View style={styles.formContainer}>
          <View style={styles.fieldContainer}>
            <Text style={[styles.label, { color: textColor }]}>Name</Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor,
                  backgroundColor,
                  color: textColor,
                },
              ]}
              value={formData.name}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, name: text }))
              }
              placeholder='Enter your name'
              placeholderTextColor={mutedColor}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={[styles.label, { color: textColor }]}>Email</Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor,
                  backgroundColor,
                  color: textColor,
                },
              ]}
              value={formData.email}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, email: text }))
              }
              placeholder='Enter your email'
              placeholderTextColor={mutedColor}
              keyboardType='email-address'
              autoCapitalize='none'
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={[styles.label, { color: textColor }]}>Message</Text>
            <TextInput
              style={[
                styles.input,
                styles.textArea,
                {
                  borderColor,
                  backgroundColor,
                  color: textColor,
                },
              ]}
              value={formData.message}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, message: text }))
              }
              placeholder='Enter your message'
              placeholderTextColor={mutedColor}
              multiline
              numberOfLines={4}
              textAlignVertical='top'
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button style={styles.button} onPress={handleSubmit}>
              Submit
            </Button>
            <Button
              variant='outline'
              style={styles.button}
              onPress={handleReset}
            >
              Reset
            </Button>
          </View>
        </View>
      </SheetContent>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    padding: 24,
    gap: 20,
  },
  fieldContainer: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  button: {
    flex: 1,
  },
});
