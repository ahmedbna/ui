import { AvoidKeyboard } from '@/components/ui/avoid-keyboard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useKeyboardHeight } from '@/hooks/useKeyboardHeight';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Settings, Keyboard, Smartphone } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, Switch } from 'react-native';

export function AvoidKeyboardPlayground() {
  const [message, setMessage] = useState('');
  const [offset, setOffset] = useState(20);
  const [duration, setDuration] = useState(0);
  const [showStats, setShowStats] = useState(false);

  const card = useThemeColor({}, 'card');

  // Get keyboard stats for debugging
  const { keyboardHeight, isKeyboardVisible, keyboardAnimationDuration } =
    useKeyboardHeight();

  const presetOffsets = [0, 10, 20, 40, 60];
  const presetDurations = [0, 100, 250, 500];

  return (
    <View style={{ flex: 1 }}>
      {/* Controls */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20 }}
        keyboardShouldPersistTaps='handled'
      >
        {/* Header */}
        <View
          style={{
            padding: 20,
          }}
        >
          <Text variant='title' style={{ marginBottom: 8 }}>
            AvoidKeyboard Playground
          </Text>
          <Text variant='body' style={{ opacity: 0.7 }}>
            Test different configurations and see real-time keyboard stats
          </Text>
        </View>

        {/* Debug Stats Toggle */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20,
            padding: 16,
            backgroundColor: card,
            borderRadius: 8,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Settings size={16} color='#666' />
            <Text variant='body'>Show Keyboard Stats</Text>
          </View>
          <Switch value={showStats} onValueChange={setShowStats} />
        </View>

        {/* Keyboard Stats */}
        {showStats && (
          <View
            style={{
              marginBottom: 20,
              padding: 16,
              backgroundColor: card,
              borderRadius: 8,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 8,
                gap: 8,
              }}
            >
              <Keyboard
                size={16}
                color={isKeyboardVisible ? '#4CAF50' : '#666'}
              />
              <Text variant='subtitle' style={{ fontWeight: '600' }}>
                Keyboard Status
              </Text>
            </View>
            <Text variant='caption' style={{ marginBottom: 4 }}>
              Visible: {isKeyboardVisible ? '✅ Yes' : '❌ No'}
            </Text>
            <Text variant='caption' style={{ marginBottom: 4 }}>
              Height: {keyboardHeight}px
            </Text>
            <Text variant='caption'>
              Animation Duration: {keyboardAnimationDuration}ms
            </Text>
          </View>
        )}

        {/* Offset Controls */}
        <View style={{ marginBottom: 20 }}>
          <Text
            variant='subtitle'
            style={{ marginBottom: 12, fontWeight: '600' }}
          >
            Offset Configuration
          </Text>
          <Text variant='caption' style={{ marginBottom: 12, opacity: 0.7 }}>
            Extra space above keyboard: {offset}px
          </Text>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {presetOffsets.map((value) => (
              <Button
                key={value}
                size='sm'
                variant={offset === value ? 'default' : 'secondary'}
                onPress={() => setOffset(value)}
              >
                {`${value}px`}
              </Button>
            ))}
          </View>
        </View>

        {/* Duration Controls */}
        <View style={{ marginBottom: 20 }}>
          <Text
            variant='subtitle'
            style={{ marginBottom: 12, fontWeight: '600' }}
          >
            Animation Duration
          </Text>
          <Text variant='caption' style={{ marginBottom: 12, opacity: 0.7 }}>
            Extra animation time: {duration}ms
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {presetDurations.map((value) => (
              <Button
                key={value}
                variant={duration === value ? 'default' : 'secondary'}
                size='sm'
                onPress={() => setDuration(value)}
              >
                {value === 0 ? 'Default' : `${value}ms`}
              </Button>
            ))}
          </View>
        </View>

        {/* Usage Examples */}
        <View style={{ marginBottom: 20 }}>
          <Text
            variant='subtitle'
            style={{ marginBottom: 12, fontWeight: '600' }}
          >
            Code Example
          </Text>
          <View
            style={{
              padding: 16,
              backgroundColor: card,
              borderRadius: 8,
            }}
          >
            <Text style={{ fontFamily: 'monospace' }}>
              {`<AvoidKeyboard${offset > 0 ? ` offset={${offset}}` : ''}${
                duration > 0 ? ` duration={${duration}}` : ''
              } />`}
            </Text>
          </View>
        </View>

        {/* Spacer to push test input to bottom */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Test Input Area */}
      <View
        style={{
          padding: 20,
          backgroundColor: card,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 8,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12,
            gap: 8,
          }}
        >
          <Smartphone size={16} color='#666' />
          <Text variant='subtitle' style={{ fontWeight: '600' }}>
            Test Input
          </Text>
        </View>

        <Input
          value={message}
          onChangeText={setMessage}
          placeholder='Tap here to test keyboard avoidance...'
          variant='outline'
          type='textarea'
          rows={3}
        />

        <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
          <Button
            variant='secondary'
            size='sm'
            onPress={() => setMessage('')}
            style={{ flex: 1 }}
          >
            Clear
          </Button>
          <Button
            size='sm'
            onPress={() =>
              setMessage(
                'This is a test message to see how the keyboard avoidance works with different configurations!'
              )
            }
            style={{ flex: 1 }}
          >
            Fill Text
          </Button>
        </View>
      </View>

      {/* The actual AvoidKeyboard component */}
      <AvoidKeyboard offset={offset} duration={duration} />
    </View>
  );
}
