import type { TextStyle, TouchableOpacityProps } from "react-native";
import { TextProps } from "react-native-paper";

export type ButtonCustomProps = TouchableOpacityProps & {
  mode?: "text" | "bare" | "button" | "text-shadow";
  textStyle?: TextStyle;
  withRadius?: boolean;
  applyDisabledStyle?: boolean;
  variant?: TextProps<string>["variant"];
};
