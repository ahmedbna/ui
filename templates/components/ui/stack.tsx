// stack.tsx
import * as React from "react";
import {
  View,
  StyleSheet,
  type ViewProps,
  type ViewStyle,
  type StyleProp,
} from "react-native";
type Direction = "row" | "column";

export type BaseStackProps = Omit<ViewProps, "style"> & {
  /** Spacing between children (in dp). */
  gap?: number;
  /** Reverse the main-axis direction (row-reverse/column-reverse). */
  reverse?: boolean;
  /** Shorthand: center both axes. */
  center?: boolean;
  /** Shorthand: fill available space (true → flex: 1). */
  flex?: number | boolean;
  /** Container style. */
  style?: StyleProp<ViewStyle>;

  // Native padding properties
  padding?: ViewStyle["padding"];
  paddingTop?: ViewStyle["paddingTop"];
  paddingBottom?: ViewStyle["paddingBottom"];
  paddingLeft?: ViewStyle["paddingLeft"];
  paddingRight?: ViewStyle["paddingRight"];
  paddingHorizontal?: ViewStyle["paddingHorizontal"];
  paddingVertical?: ViewStyle["paddingVertical"];

  // Basic style props that can be passed directly
  height?: ViewStyle["height"];
  width?: ViewStyle["width"];
  backgroundColor?: ViewStyle["backgroundColor"];
  borderTopWidth?: ViewStyle["borderTopWidth"];
  borderBottomWidth?: ViewStyle["borderBottomWidth"];
  borderLeftWidth?: ViewStyle["borderLeftWidth"];
  borderRightWidth?: ViewStyle["borderRightWidth"];
  borderWidth?: ViewStyle["borderWidth"];
  borderColor?: ViewStyle["borderColor"];
  borderTopColor?: ViewStyle["borderTopColor"];
  borderBottomColor?: ViewStyle["borderBottomColor"];
  borderLeftColor?: ViewStyle["borderLeftColor"];
  borderRightColor?: ViewStyle["borderRightColor"];
  borderRadius?: ViewStyle["borderRadius"];
  borderTopLeftRadius?: ViewStyle["borderTopLeftRadius"];
  borderTopRightRadius?: ViewStyle["borderTopRightRadius"];
  borderBottomLeftRadius?: ViewStyle["borderBottomLeftRadius"];
  borderBottomRightRadius?: ViewStyle["borderBottomRightRadius"];
  margin?: ViewStyle["margin"];
  marginTop?: ViewStyle["marginTop"];
  marginBottom?: ViewStyle["marginBottom"];
  marginLeft?: ViewStyle["marginLeft"];
  marginRight?: ViewStyle["marginRight"];
  marginHorizontal?: ViewStyle["marginHorizontal"];
  marginVertical?: ViewStyle["marginVertical"];
  minHeight?: ViewStyle["minHeight"];
  minWidth?: ViewStyle["minWidth"];
  maxHeight?: ViewStyle["maxHeight"];
  maxWidth?: ViewStyle["maxWidth"];
  opacity?: ViewStyle["opacity"];
  overflow?: ViewStyle["overflow"];
  position?: ViewStyle["position"];
  top?: ViewStyle["top"];
  bottom?: ViewStyle["bottom"];
  left?: ViewStyle["left"];
  right?: ViewStyle["right"];
  zIndex?: ViewStyle["zIndex"];
  alignItems?: ViewStyle["alignItems"];
  justifyContent?: ViewStyle["justifyContent"];

};

type InternalProps = BaseStackProps & {
  __direction: Direction;
};

const BaseStack = React.forwardRef<View, InternalProps>(function BaseStack(
  {
    __direction,
    gap = 0,
    reverse,
    center,
    flex,
    style,
    children,
    // Native padding properties
    padding,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingHorizontal,
    paddingVertical,
    // Basic style props
    height,
    width,
    backgroundColor,
    borderTopWidth,
    borderBottomWidth,
    borderLeftWidth,
    borderRightWidth,
    borderWidth,
    borderColor,
    borderTopColor,
    borderBottomColor,
    borderLeftColor,
    borderRightColor,
    borderRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    margin,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    marginHorizontal,
    marginVertical,
    minHeight,
    minWidth,
    maxHeight,
    maxWidth,
    opacity,
    overflow,
    position,
    top,
    bottom,
    left,
    right,
    zIndex,
    alignItems,
    justifyContent,
    ...viewProps
  },
  ref
) {
  const dir = reverse
    ? __direction === "row"
      ? "row-reverse"
      : "column-reverse"
    : __direction;

  const resolvedFlex: number | undefined =
    typeof flex === "boolean" ? (flex ? 1 : undefined) : flex;


  // Direct style props
  const directStyleProps: ViewStyle = {
    height,
    width,
    backgroundColor,
    borderTopWidth,
    borderBottomWidth,
    borderLeftWidth,
    borderRightWidth,
    borderWidth,
    borderColor,
    borderTopColor,
    borderBottomColor,
    borderLeftColor,
    borderRightColor,
    borderRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    margin,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    marginHorizontal,
    marginVertical,
    minHeight,
    minWidth,
    maxHeight,
    maxWidth,
    opacity,
    overflow,
    position,
    top,
    bottom,
    left,
    right,
    zIndex,
    // Native padding properties
    padding,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingHorizontal,
    paddingVertical,
  };

  // Base container style
  const containerStyle: ViewStyle = {
    flexDirection: dir,
    alignItems: center ? "center" : alignItems,
    justifyContent: center ? "center" : justifyContent,
    flex: resolvedFlex,
    ...directStyleProps,
  };

  // Apply a gap if it's not 0
  if (gap != null) {
    containerStyle.gap = gap;
  }

  // Normalize children
  const kids = React.Children.toArray(children).filter(
    (c) => c !== null && c !== undefined && !!c
  );

  return (
    <View ref={ref} style={[containerStyle, style]} {...viewProps}>
      {kids}
    </View>
  );
});

export type XStackProps = BaseStackProps;
export type YStackProps = BaseStackProps;
export type ZStackProps = BaseStackProps;

export const XStack = React.forwardRef<View, XStackProps>(function XStack(
  props,
  ref
) {
  return <BaseStack ref={ref} __direction="row" {...props} />;
});

export const YStack = React.forwardRef<View, YStackProps>(function YStack(
  props,
  ref
) {
  return <BaseStack ref={ref} __direction="column" {...props} />;
});

export const ZStack = React.forwardRef<View, ZStackProps>(function ZStack(
  { children, style, gap, ...rest },
  ref
) {
  // Normalize children
  const kids = React.Children.toArray(children).filter(
    (c) => c !== null && c !== undefined && !!c
  );

  // Render: first child in normal flow, later children absolutely fill
  return (
    <BaseStack
      ref={ref}
      __direction="column"
      // Force no gap for overlay layout to ensure perfect stacking
      gap={0}
      {...rest}
      style={[{ position: "relative" }, style]}
    >
      {kids.map((child, idx) =>
        idx === 0 ? (
          child as React.ReactElement
        ) : (
          <View
            key={(child as any)?.key ?? `z-${idx}`}
            pointerEvents="box-none"
            style={StyleSheet.absoluteFillObject}
          >
            {child}
          </View>
        )
      )}
    </BaseStack>
  );
});
