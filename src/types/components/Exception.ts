import type { PropsWithChildren } from "react";
import type { Props } from "react-native-error-boundary/lib/ErrorBoundary/FallbackComponent";
import { ErrorCommon } from "../../models";
import type { OverlayMode } from "../components/Common";

export type ExceptionProps = Omit<Props, "error"> &
  PropsWithChildren & {
    error: ErrorCommon | Error;
    mode?: OverlayMode;
    center?: boolean;
  };
