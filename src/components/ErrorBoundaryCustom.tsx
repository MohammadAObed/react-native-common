import ErrorBoundary from "react-native-error-boundary";
import type { ErrorBoundaryCustomProps } from "../types/components";
import { Exception } from "./Exception";

export const ErrorBoundaryCustom = ({ children, message, FallbackComponent, mode = "full-screen", ...rest }: ErrorBoundaryCustomProps) => {
  if (FallbackComponent === undefined) {
    FallbackComponent = (props) => (
      <Exception {...props} mode={mode}>
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
