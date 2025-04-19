import { ErrorCommon } from "../../models";

export type ErrorCommonConstructorParam = {
  cause?: unknown;
  title?: ShowErrorTitle;
};
export type ExceptionHandlerError = ErrorCommon | Error | string;
export type ShowErrorTitle = "🚨 Error" | "⚠️ Warning" | "📝 Validation";
export type ShowErrorMode = "Toast" | "Alert";
export type Destination = ShowErrorMode | "boundary" | "boundary-alone" | "none";
