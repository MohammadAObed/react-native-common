import { ErrorBoundaryCustom } from "@mohammad_obed/react-native-common/src/components/ErrorBoundaryCustom";
import { Loading } from "@mohammad_obed/react-native-common/src/components/Loading";
import type { SuspenseWithErrorBoundaryProps } from "@mohammad_obed/react-native-common/src/types/components";
import { Suspense } from "react";

export const SuspenseWithErrorBoundary = ({
  errorMessage,
  errorFallback,
  center,
  mode = "simple",
  errorMode,
  ...rest
}: SuspenseWithErrorBoundaryProps) => {
  return (
    <ErrorBoundaryCustom FallbackComponent={errorFallback} mode={errorMode ?? mode} center={center} message={errorMessage}>
      <SuspenseContent mode={mode} center={center} {...rest} />
    </ErrorBoundaryCustom>
  );
};

const SuspenseContent = ({ children, fallback, mode, loadingMode, loadingText, center, ...rest }: SuspenseWithErrorBoundaryProps) => {
  if (fallback === undefined) {
    fallback = <Loading mode={loadingMode ?? mode} center={center} text={loadingText} />;
  }
  return (
    <Suspense fallback={fallback} {...rest}>
      {children}
    </Suspense>
  );
};
