import type { PropsWithChildren } from 'react';
import type { ViewStyle } from 'react-native';

export type FitContainerProps = PropsWithChildren & {
  center?: boolean;
  style?: ViewStyle;
};
