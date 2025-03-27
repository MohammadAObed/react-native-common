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
}
