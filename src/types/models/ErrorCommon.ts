import { ErrorCommon } from "../../models";

export type ErrorCommonConstructorParam = {
  cause?: unknown;
  type?: ErrorType;
};
export type ExceptionHandlerError = ErrorCommon | Error | string;
export type ErrorType = "error" | "warning" | "validation";
export type ShowErrorMode = "toast" | "alert";
export type Destination = ShowErrorMode | "boundary" | "boundary-alone" | "none";
