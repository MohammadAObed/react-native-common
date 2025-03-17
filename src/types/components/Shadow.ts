import type { ViewProps, ViewStyle } from "react-native";

export type ShadowProps = ViewProps & {
  offset?: [x: number, y: number];
  opacity?: number;
  borderRadius?: number;
  blur?: [number, fallbackScaleX: number, fallbackScaleY: number];
  containerStyle?: ViewStyle;
};
