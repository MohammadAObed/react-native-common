import { ErrorBoundaryCustom } from "@mohammad_obed/react-native-common/src/components/ErrorBoundaryCustom";
import { Loading } from "@mohammad_obed/react-native-common/src/components/Loading";
import { Suspense } from "react";
import type { SuspenseCustomProps } from "../types/components";

export const SuspenseCustom = ({ errorMessage, errorFallback, mode = "full-screen", ...rest }: SuspenseCustomProps) => {
  return (
    <ErrorBoundaryCustom FallbackComponent={errorFallback} mode={mode} message={errorMessage}>
      <SuspenseContent mode={mode} {...rest} />
    </ErrorBoundaryCustom>
  );
};

const SuspenseContent = ({ children, fallback, mode, loadingText, ...rest }: SuspenseCustomProps) => {
  if (fallback === undefined) {
    fallback = <Loading mode={mode} text={loadingText} />;
  }
  return (
    <Suspense fallback={fallback} {...rest}>
      {children}
    </Suspense>
  );
};
