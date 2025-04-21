import { showToast } from "../helpers/components/ToastCommon";
import type { ErrorCodeValues } from "../types/constants";
import type { Destination, ErrorCommonConstructorParam, ErrorType, ExceptionHandlerError, ShowErrorMode } from "../types/models";

export class ErrorCommon<T extends string = ErrorCodeValues> extends Error {
  errorCode: T;
  destination: Destination;
  type: ErrorType;
  constructor(message: string, destination?: Destination, errorCode?: T, options?: ErrorCommonConstructorParam) {
    super(message);
    this.name = "ErrorCommon";
    this.errorCode = errorCode ?? (ErrorCommon.ErrorCode.CUSTOM as T);
    this.destination = destination ?? "none";
    this.type = options?.type ?? "error";
  }

  static readonly ALLOW_IN_DEV_MODE = __DEV__;
  static readonly FORCE_APP_QUIT = false as const;
  static readonly EXECUTE_DEFAULT_HANDLER = true as const;
  static readonly ERROR_MESSAGE = "Something went wrong..." as const;
  static readonly DB_ERROR_MESSAGE = "Failed to load resources..." as const;
  static readonly DB_ERROR_DESTINATION: Destination = "boundary" as const;
  static readonly ErrorCode = {
    TEST: "TEST",
    UNKOWN: "UNKOWN",
    CUSTOM: "CUSTOM",
    FETCH_ERROR: "FETCH_ERROR",
    MUTATION_ERROR: "MUTATION_ERROR",
    TRY_CATCH_ERROR: "TRY_CATCH_ERROR",
    GET_DB_VERSION: "GET_DB_VERSION",
    LOAD_DB_ASSET: "LOAD_DB_ASSET",
    LOAD_DB_ASSET_LOCAL_URI: "LOAD_DB_ASSET_LOCAL_URI",
    UNKNOWN_DB_VERSION: "UNKNOWN_DB_VERSION",
    UNKNOWN_DB_VERSION_FILE: "UNKNOWN_DB_VERSION_FILE",
    NO_DB_TRANSACTION_FOUND: "NO_DB_TRANSACTION_FOUND",
  } as const;

  static copy = (error: ErrorCommon): ErrorCommon => {
    const errorCopy = new ErrorCommon(error.message, error.destination, error.errorCode, {
      cause: error.cause,
      type: error.type,
    });
    errorCopy.stack = error.stack;
    errorCopy.name = error.name;
    errorCopy._handled = error._handled;
    return errorCopy;
  };

  static copyAnonymous = (error: ErrorCommon): ErrorCommon => {
    return {
      errorCode: error.errorCode,
      destination: error.destination,
      name: error.name,
      message: error.message,
      stack: error.stack,
      cause: error.cause,
      type: error.type,
      _handled: error._handled,
    };
  };

  static exceptionhandler = (error: ExceptionHandlerError, _isFatal: boolean) => {
    if (!(error instanceof Error) || error._handled) return;
    const isErrorHandledByErrorBoundary = error.stack?.includes("ErrorBoundaryCustom");
    if (isErrorHandledByErrorBoundary) return;
    ErrorCommon.logError(error, "exceptionhandler");
    if (error instanceof ErrorCommon) {
      if (error.destination !== "toast" && error.destination !== "alert") return;
      ErrorCommon.showError(ErrorCommon.getErrorMessage(error), error.type, error.destination);
    } else {
      ErrorCommon.showError(ErrorCommon.getErrorMessage(error));
    }
    error._handled = true;
  };

  static exceptionhandlerNative = (exceptionMsg: string) => {
    if (__DEV__) console.log("🚀 ~ ErrorCommon ~ exceptionMsg: ", exceptionMsg);
    ErrorCommon.showError("The app has crashed ☹️", "error", "alert");
  };

  static showError(errorMessage: string, type: ErrorType = "error", mode: ShowErrorMode = "toast"): void {
    const fullMessage = `${errorMessage}`;
    switch (mode) {
      case "alert":
        showToast({ text1: fullMessage, type, autoHide: false });
        break;
      case "toast":
        showToast({ text1: fullMessage, type });
        break;
      default:
        break;
    }
  }

  static getErrorMessage(error: ExceptionHandlerError): string {
    if (error instanceof ErrorCommon && ErrorCommon.shouldUseErrorMessage(error)) return error.message;
    return ErrorCommon.ERROR_MESSAGE;
  }

  static shouldUseErrorMessage(error: ExceptionHandlerError) {
    const destination: Destination[] = ["toast", "alert", "boundary", "boundary-alone"];
    return error instanceof ErrorCommon && destination.includes(error.destination);
  }

  static logError(error: ExceptionHandlerError, source: string) {
    if (__DEV__)
      console.log(`🚀 ~ ${source} ~ logError ~ error: `, typeof error === "string" ? error : ErrorCommon.copyAnonymous(error as ErrorCommon));
  }
}
