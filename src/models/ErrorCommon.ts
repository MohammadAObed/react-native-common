import { Alert, ToastAndroid } from "react-native";
import type { ErrorCodeValues } from "../types/constants";
import type { ErrorCommonConstructorParam, ExceptionHandlerError, ShowErrorMode, ShowErrorTitle, ShowMode } from "../types/models";

export class ErrorCommon<T extends string = ErrorCodeValues> extends Error {
  errorCode: T;
  showMode: ShowMode;
  _handled: boolean = false;
  constructor(message: string, errorCode?: T, options?: ErrorCommonConstructorParam) {
    super(message);
    this.name = "ErrorCommon";
    this.errorCode = errorCode ?? (ErrorCommon.ErrorCode.CUSTOM as T);
    this.showMode =
      options?.showMode ?? !ErrorCommon.ErrorCodesNotShownToScreen.includes(this.errorCode as ErrorCodeValues) ? "show-only" : "hidden";
  }

  static readonly ALLOW_IN_DEV_MODE = __DEV__;
  static readonly FORCE_APP_QUIT = false as const;
  static readonly EXECUTE_DEFAULT_HANDLER = true as const;
  static readonly ERROR_MESSAGE = "Something went wrong..." as const;
  static readonly DB_ERROR_MESSAGE = "Failed to load resources..." as const;
  static readonly ErrorCode = {
    UNKOWN: "0x00001",
    CUSTOM: "0x00002",
    FETCH_ERROR: "0x00003",
    MUTATION_ERROR: "0x00004",
    TRY_CATCH_ERROR: "0x00005",
    GET_DB_VERSION: "0x10000",
    LOAD_DB_ASSET: "0x10001",
    LOAD_DB_ASSET_LOCAL_URI: "0x10002",
    UNKNOWN_DB_VERSION: "0x10003",
    UNKNOWN_DB_VERSION_FILE: "0x10004",
    NO_DB_TRANSACTION_FOUND: "0x10005",
  } as const;
  static readonly ErrorCodesNotShownToScreen: ErrorCodeValues[] = [ErrorCommon.ErrorCode.UNKOWN, ErrorCommon.ErrorCode.CUSTOM] as const;

  static shouldShow(error: ExceptionHandlerError) {
    const ShowModes: ShowMode[] = ["show-to-screen", "show-only"];
    return error instanceof ErrorCommon && ShowModes.includes(error.showMode);
  }

  static copy = (error: ErrorCommon): ErrorCommon => {
    const errorCopy = new ErrorCommon(error.message, error.errorCode, {
      showMode: error.showMode,
    });
    errorCopy.cause = error.cause;
    errorCopy.stack = error.stack;
    errorCopy.name = error.name;
    errorCopy._handled = error._handled;
    return errorCopy;
  };

  static copyAnonymous = (error: ErrorCommon): ErrorCommon => {
    return {
      errorCode: error.errorCode,
      showMode: error.showMode,
      name: error.name,
      message: error.message,
      stack: error.stack,
      cause: error.cause,
      _handled: error._handled,
    };
  };

  static exceptionhandler = (error: ExceptionHandlerError, _isFatal: boolean) => {
    const stack = typeof error === "string" ? error : error.stack;
    ErrorCommon.logError(error, "exceptionhandler");
    const isErrorHandledByErrorBoundary = (error instanceof ErrorCommon && error._handled) || stack?.includes("ErrorBoundaryCustom");
    if (isErrorHandledByErrorBoundary) return;
    ErrorCommon.showError(error);
  };
  static exceptionhandlerNative = (exceptionMsg: string) => {
    if (__DEV__) console.log("🚀 ~ ErrorCommon ~ exceptionMsg: ", exceptionMsg);
    ErrorCommon.showError("The app has crashed ☹️", "🚨 Error", "Alert");
  };

  static showError(error: ExceptionHandlerError, title: ShowErrorTitle = "🚨 Error", mode: ShowErrorMode = "Toast"): void {
    const errorMessage = ErrorCommon.getErrorMessage(error);
    const fullMessage = `${title}\n ${errorMessage}`;
    switch (mode) {
      case "Alert":
        Alert.alert(title, errorMessage);
        break;
      case "Toast":
        ToastAndroid.show(fullMessage, ToastAndroid.LONG);
        break;
      default:
        break;
    }
  }

  static getErrorMessage(error: ExceptionHandlerError): string {
    if (error instanceof ErrorCommon && ErrorCommon.shouldShow(error)) return error.message;
    return ErrorCommon.ERROR_MESSAGE;
  }

  static logError(error: ExceptionHandlerError, source: string) {
    if (__DEV__)
      console.log(`🚀 ~ ${source} ~ logError ~ error: `, typeof error === "string" ? error : ErrorCommon.copyAnonymous(error as ErrorCommon));
  }
}
