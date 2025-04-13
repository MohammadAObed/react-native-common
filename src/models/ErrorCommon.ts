import { Alert, ToastAndroid } from "react-native";
import type { ErrorCodeValues } from "../types/constants";
import type { Destination, ErrorCommonConstructorParam, ExceptionHandlerError, ShowErrorMode, ShowErrorTitle, ShowMode } from "../types/models";

export class ErrorCommon<T extends string = ErrorCodeValues> extends Error {
  errorCode: T;
  showMode: ShowMode;
  destination: Destination;
  title: ShowErrorTitle;
  _handled: boolean = false;
  constructor(message: string, errorCode?: T, options?: ErrorCommonConstructorParam) {
    super(message);
    this.name = "ErrorCommon";
    this.errorCode = errorCode ?? (ErrorCommon.ErrorCode.CUSTOM as T);
    this.showMode =
      options?.showMode ?? !ErrorCommon.ErrorCodesNotShownToScreen.includes(this.errorCode as ErrorCodeValues) ? "show-only" : "hidden";
    this.destination = options?.destination ?? "none";
    this.title = options?.title ?? "🚨 Error";
  }

  static readonly ALLOW_IN_DEV_MODE = __DEV__;
  static readonly FORCE_APP_QUIT = false as const;
  static readonly EXECUTE_DEFAULT_HANDLER = true as const;
  static readonly ERROR_MESSAGE = "Something went wrong..." as const;
  static readonly DB_ERROR_MESSAGE = "Failed to load resources..." as const;
  static readonly ErrorCode = {
    TEST: "TEST",
    UNKOWN: "UNKOWN",
    CUSTOM: "CUSTOM",
    GET_DB_VERSION: "GET_DB_VERSION",
    LOAD_DB_ASSET: "LOAD_DB_ASSET",
    LOAD_DB_ASSET_LOCAL_URI: "LOAD_DB_ASSET_LOCAL_URI",
    UNKNOWN_DB_VERSION: "UNKNOWN_DB_VERSION",
    UNKNOWN_DB_VERSION_FILE: "UNKNOWN_DB_VERSION_FILE",
    NO_DB_TRANSACTION_FOUND: "NO_DB_TRANSACTION_FOUND",
    FETCH_ERROR: "FETCH_ERROR",
    MUTATION_ERROR: "MUTATION_ERROR",
    TRY_CATCH_ERROR: "TRY_CATCH_ERROR",
  } as const;
  static readonly ErrorCodesNotShownToScreen: ErrorCodeValues[] = [ErrorCommon.ErrorCode.UNKOWN, ErrorCommon.ErrorCode.CUSTOM] as const;

  static shouldShow(error: ExceptionHandlerError) {
    const ShowModes: ShowMode[] = ["show-to-screen", "show-only"];
    return error instanceof ErrorCommon && ShowModes.includes(error.showMode);
  }

  static copy = (error: ErrorCommon): ErrorCommon => {
    const errorCopy = new ErrorCommon(error.message, error.errorCode, {
      showMode: error.showMode,
      cause: error.cause,
      destination: error.destination,
      title: error.title,
    });
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
      destination: error.destination,
      title: error.title,
      _handled: error._handled,
    };
  };

  static exceptionhandler = (error: ExceptionHandlerError, _isFatal: boolean) => {
    if (!(error instanceof ErrorCommon) || error._handled) return;
    if (error.destination !== "Toast" && error.destination !== "Alert") return;
    const isErrorHandledByErrorBoundary = error.stack?.includes("ErrorBoundaryCustom");
    if (isErrorHandledByErrorBoundary) return;
    error._handled = true;
    ErrorCommon.logError(error, "exceptionhandler");
    ErrorCommon.showError(ErrorCommon.getErrorMessage(error), error.title, error.destination);
  };
  static exceptionhandlerNative = (exceptionMsg: string) => {
    if (__DEV__) console.log("🚀 ~ ErrorCommon ~ exceptionMsg: ", exceptionMsg);
    ErrorCommon.showError("The app has crashed ☹️", "🚨 Error", "Alert");
  };

  static showError(errorMessage: string, title: ShowErrorTitle, mode: ShowErrorMode): void {
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
