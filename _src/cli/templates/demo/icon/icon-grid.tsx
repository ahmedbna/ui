import { Icon } from '@/components/ui/icon';
import { View } from '@/components/ui/view';
import {
  Bell,
  Calendar,
  Camera,
  Download,
  Edit,
  Heart,
  Home,
  Mail,
  Minus,
  Plus,
  Search,
  Settings,
  Star,
  Trash,
  Upload,
  User,
} from 'lucide-react-native';
import React from 'react';

export function IconGrid() {
  const icons = [
    Home,
    Search,
    Bell,
    User,
    Settings,
    Heart,
    Star,
    Mail,
    Calendar,
    Camera,
    Download,
    Upload,
    Edit,
    Trash,
    Plus,
    Minus,
  ];

  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
      }}
    >
      {icons.map((IconComponent, index) => (
        <View
          key={index}
          style={{
            padding: 12,
            backgroundColor: '#f8f9fa',
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 48,
          }}
        >
          <Icon name={IconComponent} size={20} color='#495057' />
        </View>
      ))}
    </View>
  );
}
