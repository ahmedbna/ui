import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { TouchableOpacity } from 'react-native';

interface MenuItemProps {
  icon: string;
  label: string;
  onPress: () => void;
  destructive?: boolean;
}

function MenuItem({
  icon,
  label,
  onPress,
  destructive = false,
}: MenuItemProps) {
  const textColor = useThemeColor(
    {},
    destructive ? 'destructive' : 'foreground'
  );
  const mutedColor = useThemeColor({}, 'muted');

  return (
    <PopoverClose asChild>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 12,
          borderRadius: 6,
        }}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Text
          style={{
            fontSize: 16,
            marginRight: 12,
            width: 20,
            textAlign: 'center',
          }}
        >
          {icon}
        </Text>
        <Text style={{ color: textColor, fontSize: 14 }}>{label}</Text>
      </TouchableOpacity>
    </PopoverClose>
  );
}

export function PopoverMenu() {
  const borderColor = useThemeColor({}, 'border');

  const handleMenuAction = (action: string) => {
    console.log(`Menu action: ${action}`);
  };

  return (
    <View style={{ gap: 16, alignItems: 'center' }}>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant='outline'>⚙️ Options</Button>
        </PopoverTrigger>
        <PopoverContent
          align='end'
          style={{
            padding: 8,
            minWidth: 180,
          }}
        >
          <MenuItem
            icon='👤'
            label='View Profile'
            onPress={() => handleMenuAction('profile')}
          />
          <MenuItem
            icon='⚙️'
            label='Settings'
            onPress={() => handleMenuAction('settings')}
          />
          <MenuItem
            icon='📄'
            label='Export Data'
            onPress={() => handleMenuAction('export')}
          />
          <View
            style={{
              height: 1,
              backgroundColor: borderColor,
              marginVertical: 4,
            }}
          />
          <MenuItem
            icon='🚪'
            label='Sign Out'
            onPress={() => handleMenuAction('signout')}
          />
          <MenuItem
            icon='🗑️'
            label='Delete Account'
            onPress={() => handleMenuAction('delete')}
            destructive
          />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button>✏️ Actions</Button>
        </PopoverTrigger>
        <PopoverContent side='bottom' align='start' style={{ padding: 8 }}>
          <MenuItem
            icon='📝'
            label='Edit'
            onPress={() => handleMenuAction('edit')}
          />
          <MenuItem
            icon='📋'
            label='Copy'
            onPress={() => handleMenuAction('copy')}
          />
          <MenuItem
            icon='📤'
            label='Share'
            onPress={() => handleMenuAction('share')}
          />
          <MenuItem
            icon='⭐'
            label='Add to Favorites'
            onPress={() => handleMenuAction('favorite')}
          />
        </PopoverContent>
      </Popover>
    </View>
  );
}
