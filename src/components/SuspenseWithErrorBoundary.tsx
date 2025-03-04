import { Suspense } from "react";
import type { SuspenseWithErrorBoundaryProps } from "../types/components";
import { ErrorBoundaryCustom } from "./ErrorBoundaryCustom";
import { Loading } from "./Loading";

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
