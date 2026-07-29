import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { ScrollView } from '@/components/ui/scroll-view';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useColor } from '@/hooks/useColor';
import { api } from '@/convex/_generated/api';
import { useMutation, useQuery } from 'convex/react';
import { Check, Circle, Plus, Trash2 } from 'lucide-react-native';
import { useState } from 'react';

export default function HomeScreen() {
  const green = useColor('green');
  const primary = useColor('primary');
  const textMuted = useColor('textMuted');

  const [text, setText] = useState('');

  // `undefined` while the query is in flight, then live-updating for the rest
  // of the session — Convex pushes every change to this list automatically.
  const tasks = useQuery(api.tasks.list);
  const addTask = useMutation(api.tasks.add);
  const toggleTask = useMutation(api.tasks.toggle);
  const removeTask = useMutation(api.tasks.remove);

  const onAdd = async () => {
    const value = text.trim();
    if (!value) return;

    setText('');
    await addTask({ text: value });
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        gap: 16,
        padding: 24,
        paddingTop: 96,
      }}
    >
      <Text variant='heading' style={{ textAlign: 'center' }}>
        Built with ❤️ by BNA
      </Text>

      <Text
        variant='caption'
        style={{ textAlign: 'center', marginBottom: 8, color: textMuted }}
      >
        This list lives in Convex. Open the app on a second device and watch it
        stay in sync.
      </Text>

      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
        <Input
          value={text}
          onChangeText={setText}
          onSubmitEditing={onAdd}
          returnKeyType='done'
          placeholder='Add a task'
          containerStyle={{ flex: 1 }}
        />
        <Button
          size='icon'
          icon={Plus}
          onPress={onAdd}
          disabled={!text.trim()}
        />
      </View>

      {tasks === undefined ? (
        <View style={{ paddingVertical: 48, alignItems: 'center' }}>
          <Spinner size='lg' variant='circle' />
        </View>
      ) : tasks.length === 0 ? (
        <Card>
          <Text variant='caption' style={{ textAlign: 'center' }}>
            No tasks yet. Add one above — it is written to your Convex
            deployment and streamed straight back.
          </Text>
        </Card>
      ) : (
        <View style={{ gap: 12 }}>
          {tasks.map((task) => (
            <Card
              key={task._id}
              style={{
                gap: 12,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Button
                size='icon'
                variant='ghost'
                icon={task.isCompleted ? Check : Circle}
                onPress={() => toggleTask({ id: task._id })}
              />

              <Text
                variant='body'
                style={{
                  flex: 1,
                  color: task.isCompleted ? green : primary,
                  textDecorationLine: task.isCompleted
                    ? 'line-through'
                    : 'none',
                }}
              >
                {task.text}
              </Text>

              <Button
                size='icon'
                variant='ghost'
                icon={Trash2}
                onPress={() => removeTask({ id: task._id })}
              />
            </Card>
          ))}
        </View>
      )}

      <Card style={{ marginTop: 8 }}>
        <View
          style={{
            gap: 8,
            marginBottom: 8,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Icon name={Plus} size={18} />
          <Text variant='body' style={{ fontWeight: '600' }}>
            Add Components
          </Text>
        </View>
        <Text variant='caption' style={{ color: textMuted }}>
          Run `npx bna-ui add avatar` to drop another component into
          `components/ui`.
        </Text>
      </Card>
    </ScrollView>
  );
}
