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
    this.errorCode = errorCode ?? (ErrorCommon.ErrorCode.CUSTOM as T);
    this.showToScreen = options?.showToScreen ?? !ErrorCommon.ErrorCodesNotShownToScreen.includes(this.errorCode as ErrorCodeValues);
    this.showOnly = options?.showOnly;
    this.originalError = options?.originalError;
  }

  static readonly ALLOW_IN_DEV_MODE = true;
  static readonly FORCE_APP_QUIT = false as const;
  static readonly EXECUTE_DEFAULT_HANDLER = true as const;
  static readonly DB_ERROR_MESSAGE = "Failed to load resources..." as const;
  static readonly ErrorCode = {
    UNKOWN: "0x00001",
    CUSTOM: "0x00002",
    FETCH_ERROR: "0x00003",
    MUTATION_ERROR: "0x00004",
    GET_DB_VERSION: "0x10000",
    LOAD_DB_ASSET: "0x10001",
    LOAD_DB_ASSET_LOCAL_URI: "0x10002",
    UNKNOWN_DB_VERSION: "0x10003",
    UNKNOWN_DB_VERSION_FILE: "0x10004",
    NO_DB_TRANSACTION_FOUND: "0x10005",
  } as const;
  static readonly ErrorCodesNotShownToScreen: ErrorCodeValues[] = [ErrorCommon.ErrorCode.UNKOWN, ErrorCommon.ErrorCode.CUSTOM] as const;

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
