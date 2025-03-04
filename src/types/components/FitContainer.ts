import type { PropsWithChildren } from "react";
import { ViewStyle } from "react-native";

export type FitContainerProps = PropsWithChildren & {
  center?: boolean;
  style?: ViewStyle;
};
