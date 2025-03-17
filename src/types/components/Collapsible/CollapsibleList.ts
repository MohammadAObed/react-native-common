import { ReactNode } from "react";
import { CollapsibleProps } from "../Collapsible/Collapsible";
import { ScrollContainerProps } from "../ScrollContainer";

export type CollapsibleListProps<T> = {
  data: T[];
  itemStyle?: CollapsibleProps["style"];
  maxHeight?: ScrollContainerProps["maxHeight"];
  collapseMode?: CollapsibleProps["mode"];
  renderChild?: (item: T) => ReactNode;
} & (
  | { renderItem?: never; titleKey: keyof T; subTitleKey: keyof T; behavior?: "normal" | "collapse-others" }
  | { renderItem: (item: T) => ReactNode; titleKey?: never; subTitleKey?: never; behavior?: "normal" }
);
