import { forwardRef } from 'react';
import { ScrollView as RNScrollView, ScrollViewProps } from 'react-native';

export const ScrollView = forwardRef<RNScrollView, ScrollViewProps>(
  ({ style, ...otherProps }, ref) => {
    return (
      <RNScrollView
        ref={ref}
        style={[{ backgroundColor: 'transparent' }, style]}
        {...otherProps}
      />
    );
  }
);
