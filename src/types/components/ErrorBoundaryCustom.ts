import type { ErrorBoundaryProps } from 'react-native-error-boundary';

export type ErrorBoundaryCustomProps = Omit<
  ErrorBoundaryProps,
  'FallbackComponent'
> & {
  message?: string;
  FallbackComponent?: ErrorBoundaryProps['FallbackComponent'];
};
