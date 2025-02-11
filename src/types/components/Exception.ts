import type { PropsWithChildren } from 'react';
import type { Props } from 'react-native-error-boundary/lib/ErrorBoundary/FallbackComponent';
import { ErrorCustom } from '../../models';

export type ExceptionProps = Omit<Props, 'error'> & PropsWithChildren & {
    error: ErrorCustom
};
