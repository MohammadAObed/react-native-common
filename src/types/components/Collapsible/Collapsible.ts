import type { PropsWithChildren, ReactNode } from "react";
import { ViewStyle } from "react-native";

export type CollapsibleProps = PropsWithChildren & {
  style?: ViewStyle;
  title: ReactNode | undefined;
  subTitle?: string;
  mode?: "normal" | "title-as-description";
} & ({ onToggle: (isExpand: boolean) => void; isExpanded: boolean } | { onToggle?: (isExpand: boolean) => void; isExpanded?: boolean });
