import { ErrorCommon } from "../../models";

export type ErrorCommonConstructorParam = {
  showMode?: ShowMode;
  cause?: unknown;
  title?: ShowErrorTitle;
  destination?: Destination;
};
export type ExceptionHandlerError = ErrorCommon | Error | string;
export type ShowErrorTitle = "🚨 Error" | "⚠️ Warning" | "📝 Validation";
export type ShowErrorMode = "Toast" | "Alert";
export type ShowMode = "hidden" | "show-to-screen" | "show-only";
export type Destination = ShowErrorMode | "none";
