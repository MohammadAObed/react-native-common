import { ErrorCode, ErrorCodesNotShownToScreen } from "../constants";
import type { ErrorCodeValues } from "../types/constants";
import type { ErrorCommonConstructorParam } from "../types/models";

export class ErrorCommon<T extends string = ErrorCodeValues> extends Error {
  errorCode: T;
  showToScreen: boolean | undefined;
  showOnly: boolean | undefined;
  originalError: Error | undefined;

  constructor(message: string, errorCode?: T, options?: ErrorCommonConstructorParam) {
    super(message);
    this.name = "ErrorCommon";
    this.errorCode = errorCode ?? (ErrorCode.CUSTOM as T);
    this.showToScreen = options?.showToScreen ?? !ErrorCodesNotShownToScreen.includes(this.errorCode as ErrorCodeValues);
    this.showOnly = options?.showOnly;
    this.originalError = options?.originalError;
  }

  static readonly ALLOW_IN_DEV_MODE = true;
  static readonly FORCE_APP_QUIT = false as const;
  static readonly EXECUTE_DEFAULT_HANDLER = true as const;

  static copy = (error: ErrorCommon): ErrorCommon => {
    return {
      errorCode: error.errorCode,
      showToScreen: error.showToScreen,
      showOnly: error.showOnly,
      originalError: error.originalError,
      name: error.name,
      message: error.message,
      stack: error.stack,
      cause: error.cause,
    };
  };

  static exceptionhandler = (error: Error, _isFatal: boolean) => {
    const errorCommon = error as ErrorCommon;
    console.log("🚀 ~ ErrorCommon ~ error: ", errorCommon);
  };
  static exceptionhandlerNative = (exceptionMsg: string) => {
    console.log("🚀 ~ ErrorCommon ~ exceptionMsg: ", exceptionMsg);
  };
}
