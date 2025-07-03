import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { View } from '@/components/ui/view';
import React, { useState } from 'react';

export function PopoverForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    // Handle form submission
    console.log('Form submitted:', { name, email });
    // Reset form
    setName('');
    setEmail('');
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Add Contact</Button>
      </PopoverTrigger>
      <PopoverContent maxWidth={320}>
        <PopoverHeader>
          <Text variant='title'>Add New Contact</Text>
        </PopoverHeader>
        <PopoverBody>
          <View style={{ gap: 16 }}>
            <View>
              <Text style={{ marginBottom: 8, fontWeight: '500' }}>Name</Text>
              <Input
                placeholder='Enter full name'
                value={name}
                onChangeText={setName}
              />
            </View>
            <View>
              <Text style={{ marginBottom: 8, fontWeight: '500' }}>Email</Text>
              <Input
                placeholder='Enter email address'
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
                autoCapitalize='none'
              />
            </View>
          </View>
        </PopoverBody>
        <PopoverFooter>
          <PopoverClose asChild>
            <Button variant='outline' size='sm'>
              Cancel
            </Button>
          </PopoverClose>
          <PopoverClose asChild>
            <Button
              size='sm'
              onPress={handleSubmit}
              disabled={!name.trim() || !email.trim()}
            >
              Add Contact
            </Button>
          </PopoverClose>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
