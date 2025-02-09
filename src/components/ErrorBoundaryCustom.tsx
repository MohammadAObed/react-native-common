// import React from "react";
import ErrorBoundary from "react-native-error-boundary";
import { ErrorBoundaryCustomProps } from "../types/components";
import { Exception } from "./Exception";

export const ErrorBoundaryCustom = ({ children, message, FallbackComponent, ...rest }: ErrorBoundaryCustomProps) => {
  return (
    <ErrorBoundary
      FallbackComponent={FallbackComponent != undefined ? FallbackComponent : (props) => <Exception {...props}>{message}</Exception>}
      {...rest}
    >
      {children}
    </ErrorBoundary>
  );
};
