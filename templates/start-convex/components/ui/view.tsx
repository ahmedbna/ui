import { forwardRef } from 'react';
import { View as RNView, type ViewProps } from 'react-native';

export const View = forwardRef<RNView, ViewProps>(
  ({ style, ...otherProps }, ref) => {
    return (
      <RNView
        ref={ref}
        style={[{ backgroundColor: 'transparent' }, style]}
        {...otherProps}
      />
    );
  }
);
