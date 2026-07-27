import { Button } from '@/components/ui/button';
import { View } from '@/components/ui/view';
import { LinearGradient } from 'expo-linear-gradient';
import { Star } from 'lucide-react-native';

export function ButtonCustom() {
  return (
    <View style={{ gap: 12, flexDirection: 'row', flexWrap: 'wrap' }}>
      <Button
        style={{ backgroundColor: '#8B5CF6', borderRadius: 12 }}
        textStyle={{ color: 'white', fontWeight: 'bold' }}
        onPress={() => {}}
      >
        Custom Purple
      </Button>
      <Button
        variant='outline'
        style={{
          borderColor: '#F59E0B',
          borderWidth: 2,
          borderRadius: 20,
        }}
        textStyle={{ color: '#F59E0B', fontWeight: '600' }}
        onPress={() => {}}
      >
        Custom Orange
      </Button>

      <LinearGradient
        colors={['#FF6B6B', '#4ECDC4']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: 12,
          overflow: 'hidden',
          flex: 1,
        }}
      >
        <Button
          icon={Star}
          style={{
            backgroundColor: 'transparent',
          }}
          textStyle={{ color: 'white', fontWeight: 'bold' }}
          onPress={() => {}}
        >
          Gradient Style
        </Button>
      </LinearGradient>
    </View>
  );
}
