import { AvoidKeyboard } from '@/components/ui/avoid-keyboard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Send, SendHorizonal } from 'lucide-react-native';
import React, { useState } from 'react';
import { FlatList, Pressable } from 'react-native';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export function AvoidKeyboardChat() {
  const card = useThemeColor({}, 'card');
  const blue = useThemeColor({}, 'blue');

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hey! How are you doing?',
      isUser: false,
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: '2',
      text: "Hi there! I'm doing great, thanks for asking!",
      isUser: true,
      timestamp: new Date(Date.now() - 240000),
    },
    {
      id: '3',
      text: "That's wonderful to hear! Any exciting plans for today?",
      isUser: false,
      timestamp: new Date(Date.now() - 180000),
    },
    {
      id: '4',
      text: "Actually yes! I'm working on some new React Native components.",
      isUser: true,
      timestamp: new Date(Date.now() - 120000),
    },
  ]);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText.trim(),
        isUser: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newMessage]);
      setInputText('');

      // Simulate response after a delay
      setTimeout(() => {
        const responses = [
          'That sounds interesting!',
          'Tell me more about that.',
          "Cool! How's it going?",
          'Nice work!',
        ];
        const response: Message = {
          id: (Date.now() + 1).toString(),
          text: responses[Math.floor(Math.random() * responses.length)],
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, response]);
      }, 1000);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={{
        marginBottom: 12,
        alignItems: item.isUser ? 'flex-end' : 'flex-start',
      }}
    >
      <View
        style={{
          maxWidth: '80%',
          padding: 12,
          borderRadius: 16,
          backgroundColor: item.isUser ? blue : '#F2F2F7',
        }}
      >
        <Text
          style={{
            color: item.isUser ? 'white' : '#000',
            fontSize: 16,
          }}
        >
          {item.text}
        </Text>
        <Text
          style={{
            color: item.isUser ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)',
            fontSize: 12,
            marginTop: 4,
          }}
        >
          {item.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View
        style={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        <Text variant='title'>Chat Demo</Text>
        <Text variant='caption' style={{ opacity: 0.6, marginTop: 4 }}>
          Real-time chat with keyboard avoidance
        </Text>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Input Area */}
      <View
        style={{
          flexDirection: 'row',
          padding: 16,
          gap: 12,
          backgroundColor: card,
        }}
      >
        <View style={{ flex: 1 }}>
          <Input
            value={inputText}
            onChangeText={setInputText}
            placeholder='Type a message...'
            variant='outline'
            onSubmitEditing={sendMessage}
            returnKeyType='send'
          />
        </View>
        <Button
          onPress={sendMessage}
          variant={inputText.trim() ? 'success' : 'outline'}
          size='icon'
        >
          <SendHorizonal size={20} color='white' />
        </Button>
      </View>

      {/* Keyboard avoidance with extra space for better UX */}
      <AvoidKeyboard />
    </View>
  );
}
