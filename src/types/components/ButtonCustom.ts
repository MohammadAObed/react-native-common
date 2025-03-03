import type { TextStyle, TouchableOpacityProps } from "react-native";

export type ButtonCustomProps = TouchableOpacityProps & {
  mode?: "text" | "bare" | "button" | "text-shadow";
  textStyle?: TextStyle;
  withRadius?: boolean;
  applyDisabledStyle?: boolean;
};
