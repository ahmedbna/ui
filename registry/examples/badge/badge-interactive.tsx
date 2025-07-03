import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

export function BadgeInteractive() {
  const [tags, setTags] = useState(['React', 'TypeScript', 'Expo', 'Mobile']);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Work', 'Personal', 'Important'];

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <View style={{ gap: 20 }}>
      {/* Dismissible tags */}
      <View>
        <Text style={{ marginBottom: 8, fontWeight: '600' }}>
          Tags (tap to remove):
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {tags.map((tag) => (
            <TouchableOpacity key={tag} onPress={() => removeTag(tag)}>
              <Badge variant='secondary'>
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
                >
                  <Text>{tag}</Text>
                  <Text style={{ fontSize: 14 }}>×</Text>
                </View>
              </Badge>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Selectable categories */}
      <View>
        <Text style={{ marginBottom: 8, fontWeight: '600' }}>Categories:</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => setSelectedCategory(category)}
            >
              <Badge
                variant={selectedCategory === category ? 'default' : 'outline'}
                style={{
                  opacity: selectedCategory === category ? 1 : 0.7,
                }}
              >
                {category}
              </Badge>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Toggle badges */}
      <View>
        <Text style={{ marginBottom: 8, fontWeight: '600' }}>
          Filter Options:
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          <TouchableOpacity>
            <Badge variant='success'>Active</Badge>
          </TouchableOpacity>
          <TouchableOpacity>
            <Badge variant='outline'>Completed</Badge>
          </TouchableOpacity>
          <TouchableOpacity>
            <Badge variant='destructive'>Archived</Badge>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
