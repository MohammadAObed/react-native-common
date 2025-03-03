import { OverlayMode } from "@mohammad_obed/react-native-common/src/types/components/Common";
import { SuspenseProps } from "react";
import { ErrorBoundaryCustomProps } from "../components/ErrorBoundaryCustom";
import { LoadingProps } from "../components/Loading";

export type SuspenseCustomProps = SuspenseProps & {
  mode?: OverlayMode;
  loadingText?: LoadingProps["text"];
  errorFallback?: ErrorBoundaryCustomProps["FallbackComponent"];
  errorMessage?: ErrorBoundaryCustomProps["message"];
};
