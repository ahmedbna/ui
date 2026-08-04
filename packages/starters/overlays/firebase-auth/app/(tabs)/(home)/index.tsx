import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { ScrollView } from '@/components/ui/scroll-view';
import { Skeleton } from '@/components/ui/skeleton';
import { Text } from '@/components/ui/text';
import { useToast } from '@/components/ui/toast';
import { View } from '@/components/ui/view';
import { useColor } from '@/hooks/useColor';
import { useTasks } from '@/hooks/useTasks';
import { Trash2 } from 'lucide-react-native';
import { useEffect, useState } from 'react';

export default function HomeScreen() {
  const { tasks, loading, error, connected, add, toggle, remove, retry } =
    useTasks();
  const [text, setText] = useState('');
  const toast = useToast();
  const red = useColor('red');
  const green = useColor('green');
  const textMuted = useColor('textMuted');

  useEffect(() => {
    if (error) toast.error('Firestore error', error);
  }, [error, toast]);

  const submit = async () => {
    const value = text;
    setText('');
    await add(value);
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 24, paddingTop: 120, gap: 16 }}
      keyboardShouldPersistTaps='handled'
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <View
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: connected ? green : textMuted,
          }}
        />
        <Text variant='caption'>
          {/* `connected` is `!snapshot.metadata.fromCache` — so this reads
              "serving from the server" rather than "a socket is open". */}
          {connected ? 'Live from Firestore' : 'Serving from cache…'}
        </Text>
        <View style={{ flex: 1 }} />
        <Badge>{`${tasks.length}`}</Badge>
      </View>

      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <Input
            placeholder='What needs doing?'
            value={text}
            onChangeText={setText}
            onSubmitEditing={submit}
            returnKeyType='done'
            maxLength={500}
          />
        </View>
        <Button size='sm' disabled={!text.trim()} onPress={submit}>
          Add
        </Button>
      </View>

      {/* A listener error is terminal — Firestore tore the subscription down
          and will not reconnect on its own, so there has to be a way back. */}
      {error && !loading && (
        <Card style={{ gap: 12 }}>
          <Text variant='caption'>{error}</Text>
          <Button size='sm' variant='outline' onPress={retry}>
            Try again
          </Button>
        </Card>
      )}

      {loading ? (
        <View style={{ gap: 8 }}>
          <Skeleton height={64} variant='rounded' />
          <Skeleton height={64} variant='rounded' />
          <Skeleton height={64} variant='rounded' />
        </View>
      ) : tasks.length === 0 ? (
        <Card style={{ alignItems: 'center', gap: 8, paddingVertical: 32 }}>
          <Text variant='subtitle'>No tasks yet</Text>
          <Text variant='caption' style={{ textAlign: 'center' }}>
            Add one above. Open a second simulator to watch it appear there too.
          </Text>
        </Card>
      ) : (
        <View style={{ gap: 8 }}>
          {tasks.map((task) => (
            <Card
              key={task.id}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
                // A write this device has made but the server has not yet
                // acknowledged. Usually invisible; obvious on a bad connection.
                opacity: task.pending ? 0.6 : 1,
              }}
            >
              <Checkbox
                checked={task.isComplete}
                onCheckedChange={() => toggle(task)}
              />
              <Text
                variant='body'
                style={{
                  flex: 1,
                  textDecorationLine: task.isComplete ? 'line-through' : 'none',
                  opacity: task.isComplete ? 0.5 : 1,
                }}
              >
                {task.text}
              </Text>
              <Button
                size='icon'
                variant='ghost'
                onPress={() => remove(task)}
                accessibilityLabel={`Delete ${task.text}`}
              >
                <Icon name={Trash2} size={18} color={red} />
              </Button>
            </Card>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
