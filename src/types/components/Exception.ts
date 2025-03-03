import { OverlayMode } from "@mohammad_obed/react-native-common/src/types/components/Common";
import type { PropsWithChildren } from "react";
import type { Props } from "react-native-error-boundary/lib/ErrorBoundary/FallbackComponent";
import { ErrorCustom } from "../../models";

export type ExceptionProps = Omit<Props, "error"> &
  PropsWithChildren & {
    error: ErrorCustom | Error;
    mode?: OverlayMode;
  };
