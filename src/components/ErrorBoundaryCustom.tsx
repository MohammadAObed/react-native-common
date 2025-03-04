import ErrorBoundary from "react-native-error-boundary";
import type { ErrorBoundaryCustomProps } from "../types/components";
import { Exception } from "./Exception";

export const ErrorBoundaryCustom = ({ children, message, FallbackComponent, center, mode = "simple", ...rest }: ErrorBoundaryCustomProps) => {
  if (FallbackComponent === undefined) {
    FallbackComponent = (props) => (
      <Exception {...props} mode={mode} center={center}>
        {message}
      </Exception>
    );
  }
  return (
    <ErrorBoundary FallbackComponent={FallbackComponent} {...rest}>
      {children}
    </ErrorBoundary>
  );
};
