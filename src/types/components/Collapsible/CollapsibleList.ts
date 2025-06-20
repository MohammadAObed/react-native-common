import type { ReactNode } from 'react';
import type { CollapsibleProps } from '../Collapsible/Collapsible';
import type { ScrollContainerProps } from '../ScrollContainer';

export type CollapsibleListProps<T> = {
  data: T[];
  itemStyle?: CollapsibleProps['style'];
  maxHeight?: ScrollContainerProps['maxHeight'];
  renderChild?: (item: T) => ReactNode;
} & (
  | {
      renderItem?: never;
      titleKey: keyof T;
      subTitleKey: keyof T;
      behavior?: 'multi-expand' | 'single-expand';
    }
  | {
      renderItem: (item: T) => ReactNode;
      titleKey?: never;
      subTitleKey?: never;
      behavior?: 'multi-expand';
    }
);
