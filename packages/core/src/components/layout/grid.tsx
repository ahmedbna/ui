import React from 'react';
import { View, ViewProps, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../hooks';

export interface GridProps extends ViewProps {
  columns?: number;
  gap?: keyof typeof spacing | number;
  children: React.ReactNode;
}

export interface GridItemProps extends ViewProps {
  span?: number;
  children: React.ReactNode;
}

const spacing = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
  '4xl': 64,
};

export const Grid: React.FC<GridProps> = ({
  columns = 2,
  gap = 'md',
  style,
  children,
  ...props
}) => {
  const theme = useTheme();
  const gapValue =
    typeof gap === 'number' ? gap : theme.spacing[gap] || theme.spacing.md;

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginHorizontal: -gapValue / 2,
    },
  });

  const childrenWithProps = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        ...child.props,
        style: [
          {
            flex: 1,
            minWidth: `${100 / columns}%`,
            paddingHorizontal: gapValue / 2,
            marginBottom: gapValue,
          },
          child.props.style,
        ],
      });
    }
    return child;
  });

  return (
    <View style={[styles.container, style]} {...props}>
      {childrenWithProps}
    </View>
  );
};

export const GridItem: React.FC<GridItemProps> = ({
  span = 1,
  style,
  children,
  ...props
}) => {
  const styles = StyleSheet.create({
    item: {
      flex: span,
    },
  });

  return (
    <View style={[styles.item, style]} {...props}>
      {children}
    </View>
  );
};
