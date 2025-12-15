import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Star } from 'lucide-react-native';
import { useColor } from '@/hooks/useColor';

interface RatingProps {
  rating: number;
  maxRating?: number;
  onRatingChange?: (rating: number) => void;
  size?: number;
  activeColor?: string;
  inactiveColor?: string;
}

export const Rating = ({
    rating,
    maxRating = 5,
    onRatingChange,
    size = 24,
    activeColor,
    inactiveColor
}: RatingProps) => {
  const defaultInactive = useColor('mutedForeground');
  const defaultActive = useColor('primary'); // Or keep yellow if preferred, but primary is safer for theme
  // Stick to yellow for stars usually, but check contrast.
  // Actually, let's keep the yellow default but allow override, and make inactive dynamic.
  const finalInactive = inactiveColor || defaultInactive;
  const finalActive = activeColor || '#fbbf24';
  return (
    <View style={styles.container}>
      {Array.from({ length: maxRating }).map((_, index) => {
        const value = index + 1;
        const filled = value <= rating;

        return (
          <TouchableOpacity
             key={index}
             disabled={!onRatingChange}
             onPress={() => onRatingChange && onRatingChange(value)}
          >
             <Star
                size={size}
                fill={filled ? finalActive : 'transparent'}
                color={filled ? finalActive : finalInactive}
             />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 4,
  },
});
