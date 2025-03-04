import { SuspenseProps } from "react";
import { OverlayMode } from "../components/Common";
import { ErrorBoundaryCustomProps } from "../components/ErrorBoundaryCustom";
import { LoadingProps } from "../components/Loading";

export type SuspenseCustomProps = SuspenseProps & {
  mode?: OverlayMode;
  loadingText?: LoadingProps["text"];
  errorFallback?: ErrorBoundaryCustomProps["FallbackComponent"];
  errorMessage?: ErrorBoundaryCustomProps["message"];
};
