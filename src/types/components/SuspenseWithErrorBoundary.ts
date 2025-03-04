import { SuspenseProps } from "react";
import type { OverlayMode } from "../components/Common";
import type { ErrorBoundaryCustomProps } from "../components/ErrorBoundaryCustom";
import type { LoadingProps } from "../components/Loading";

export type SuspenseWithErrorBoundaryProps = SuspenseProps & {
  mode?: OverlayMode;
  loadingMode?: OverlayMode;
  errorMode?: OverlayMode;
  loadingText?: LoadingProps["text"];
  errorFallback?: ErrorBoundaryCustomProps["FallbackComponent"];
  errorMessage?: ErrorBoundaryCustomProps["message"];
  center?: boolean;
};
