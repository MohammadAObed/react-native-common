import { ReactNode } from "react";
import { CollapsibleProps } from "../Collapsible/Collapsible";
import { ScrollContainerProps } from "../ScrollContainer";

export type CollapsibleListProps<T> = {
  data: T[];
  itemStyle?: CollapsibleProps["style"];
  maxHeight?: ScrollContainerProps["maxHeight"];
  behavior?: "normal" | "collapse-others";
  collapseMode?: CollapsibleProps["mode"];
  renderChild?: (item: T) => ReactNode;
} & (
  | { renderItem?: never; titleKey: keyof T; subTitleKey: keyof T }
  | { renderItem: (item: T) => ReactNode; titleKey?: never; subTitleKey?: never }
);
