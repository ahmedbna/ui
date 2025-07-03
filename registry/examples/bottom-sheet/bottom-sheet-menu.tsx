import { BottomSheet, useBottomSheet } from '@/components/ui/bottom-sheet';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import { TouchableOpacity } from 'react-native';

const menuItems = [
  { id: 'edit', title: 'Edit', icon: '✏️' },
  { id: 'share', title: 'Share', icon: '📤' },
  { id: 'copy', title: 'Copy Link', icon: '🔗' },
  { id: 'bookmark', title: 'Bookmark', icon: '🔖' },
  { id: 'delete', title: 'Delete', icon: '🗑️', destructive: true },
];

export function BottomSheetMenu() {
  const { isVisible, open, close } = useBottomSheet();

  const textColor = useThemeColor({}, 'text');
  const destructiveColor = useThemeColor({}, 'destructive');

  const handleMenuAction = (action: string) => {
    console.log('Menu action:', action);
    close();
  };

  return (
    <View>
      <Button onPress={open}>Show Menu</Button>

      <BottomSheet isVisible={isVisible} onClose={close} snapPoints={[0.4]}>
        <View>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 16,
                borderBottomWidth: index < menuItems.length - 1 ? 1 : 0,
                borderBottomColor: 'rgba(0,0,0,0.1)',
              }}
              onPress={() => handleMenuAction(item.id)}
            >
              <Text style={{ fontSize: 20, marginRight: 16 }}>{item.icon}</Text>
              <Text
                variant='body'
                style={{
                  flex: 1,
                  color: item.destructive ? destructiveColor : textColor,
                }}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </BottomSheet>
    </View>
  );
}
