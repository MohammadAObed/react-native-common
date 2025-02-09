import type { ViewProps } from 'react-native';

export type FormRowProps = ViewProps & {
  label?: React.ReactNode;
  mode?: 'blend' | 'normal';
};
