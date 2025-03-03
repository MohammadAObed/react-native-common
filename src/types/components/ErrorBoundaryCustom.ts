import { OverlayMode } from "@mohammad_obed/react-native-common/src/types/components/Common";
import type { ErrorBoundaryProps } from "react-native-error-boundary";

export type ErrorBoundaryCustomProps = Omit<ErrorBoundaryProps, "FallbackComponent"> & {
  message?: string;
  FallbackComponent?: ErrorBoundaryProps["FallbackComponent"];
  mode?: OverlayMode;
};
