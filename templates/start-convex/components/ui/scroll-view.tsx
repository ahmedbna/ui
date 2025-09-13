import { ScrollView as RNScrollView, ScrollViewProps } from 'react-native';

export function ScrollView({ style, ...otherProps }: ScrollViewProps) {
  return (
    <RNScrollView
      style={[{ backgroundColor: 'transparent' }, style]}
      {...otherProps}
    />
  );
}
