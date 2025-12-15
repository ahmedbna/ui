import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Text } from '../text';
import { AlertCircle, AlertTriangle, CheckCircle, Info } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { useColor } from '@/hooks/useColor';

type AlertVariant = 'default' | 'destructive' | 'success' | 'warning';

interface AlertProps {
  variant?: AlertVariant;
  title: string;
  description?: string;
  style?: ViewStyle;
}

export const Alert = ({ variant = 'default', title, description, style }: AlertProps) => {
  const bgColor = useColor('secondary'); // or a specific surface color
  const borderColor = useColor('border');
  const textColor = useColor('foreground');
  const iconColor = useColor('mutedForeground');

  const getVariantStyles = () => {
    switch (variant) {
      case 'destructive':
        return {
          bg: Colors.red[100],
          border: Colors.red[200],
          text: Colors.red[800],
          icon: AlertCircle,
          iconColor: Colors.red[600],
        };
      case 'success':
        return {
          bg: Colors.green[100],
          border: Colors.green[200],
          text: Colors.green[800],
          icon: CheckCircle,
          iconColor: Colors.green[600],
        };
      case 'warning':
        return {
          bg: Colors.orange[100],
          border: Colors.orange[200],
          text: Colors.orange[800],
          icon: AlertTriangle,
          iconColor: Colors.orange[600],
        };
      default:
        // Use dynamic theme colors for default
        return {
          bg: bgColor, // Dynamic
          border: borderColor, // Dynamic
          text: textColor, // Dynamic
          icon: Info,
          iconColor: iconColor, // Dynamic
        };
    }
  };

  const config = getVariantStyles();
  const Icon = config.icon;

  return (
    <View style={[
      styles.container,
      { backgroundColor: config.bg, borderColor: config.border },
      style
    ]}>
      <Icon size={20} color={config.iconColor} style={{ marginTop: 2 }} />
      <View style={styles.content}>
        <Text style={[styles.title, { color: config.text }]}>{title}</Text>
        {description && (
          <Text style={[styles.description, { color: config.text }]}>{description}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  content: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
  },
  description: {
    fontSize: 13,
    opacity: 0.9,
    lineHeight: 18,
  },
});
