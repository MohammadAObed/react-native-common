import type { PropsWithChildren, ReactNode } from 'react';
import type { ViewStyle } from 'react-native';

export type CollapsibleProps = PropsWithChildren & {
  style?: ViewStyle;
  title: ReactNode | undefined;
  subTitle?: string;
} & (
    | { onToggle: (isExpand: boolean) => void; isExpanded: boolean }
    | { onToggle?: (isExpand: boolean) => void; isExpanded?: boolean }
  );
