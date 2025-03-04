import { OverlayMode } from "@mohammad_obed/react-native-common/src/types/components/Common";
import { ErrorBoundaryCustomProps } from "@mohammad_obed/react-native-common/src/types/components/ErrorBoundaryCustom";
import { LoadingProps } from "@mohammad_obed/react-native-common/src/types/components/Loading";
import { SuspenseProps } from "react";

export type SuspenseWithErrorBoundaryProps = SuspenseProps & {
  mode?: OverlayMode;
  loadingMode?: OverlayMode;
  errorMode?: OverlayMode;
  loadingText?: LoadingProps["text"];
  errorFallback?: ErrorBoundaryCustomProps["FallbackComponent"];
  errorMessage?: ErrorBoundaryCustomProps["message"];
  center?: boolean;
};
