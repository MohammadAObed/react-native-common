import type { ErrorBoundaryProps } from 'react-native-error-boundary';
import type { OverlayMode } from '../components/Common';

export type ErrorBoundaryCustomProps = Omit<
  ErrorBoundaryProps,
  'FallbackComponent'
> & {
  message?: string;
  FallbackComponent?: ErrorBoundaryProps['FallbackComponent'];
  mode?: OverlayMode;
  center?: boolean;
};
