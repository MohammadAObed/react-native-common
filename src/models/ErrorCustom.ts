import { ErrorCode, ErrorCodesNotShownToScreen } from "../constants";
import type { ErrorCodeValues } from "../types/constants";
import type { ErrorCustomConstructorParam } from "../types/models";

export class ErrorCustom<T extends string = ErrorCodeValues> extends Error {
  errorCode: T;
  showToScreen: boolean | undefined;
  showOnly: boolean | undefined;

  constructor(message: string, errorCode?: T, options?: ErrorCustomConstructorParam) {
    super(message);
    this.name = "ErrorCustom";
    this.errorCode = errorCode ?? (ErrorCode.CUSTOM as T);
    this.showToScreen = options?.showToScreen ?? !ErrorCodesNotShownToScreen.includes(this.errorCode as ErrorCodeValues);
    this.showOnly = options?.showOnly;
  }
}
