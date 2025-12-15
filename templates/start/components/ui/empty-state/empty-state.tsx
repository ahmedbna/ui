import { View, StyleSheet } from 'react-native';
import { Text } from '../text';
import { Icon } from '../icon';
import { useColor } from '@/hooks/useColor';

interface EmptyStateProps {
    icon?: React.ComponentType<any>;
    title: string;
    description?: string;
    action?: React.ReactNode;
}

export const EmptyState = ({ icon: IconComponent, title, description, action }: EmptyStateProps) => {
  const mutedColor = useColor('mutedForeground');

  return (
    <View style={styles.container}>
        {IconComponent && (
            <View style={styles.iconContainer}>
                 <IconComponent size={48} color={mutedColor} />
            </View>
        )}
        <Text variant="subtitle" style={{ textAlign: 'center', marginBottom: 4 }}>{title}</Text>
        {description && (
             <Text style={{ textAlign: 'center', color: mutedColor, marginBottom: 20 }}>{description}</Text>
        )}
        {action && (
            <View style={styles.action}>
                {action}
            </View>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  iconContainer: {
    marginBottom: 16,
    opacity: 0.5,
  },
  action: {
    marginTop: 10,
  }
});
