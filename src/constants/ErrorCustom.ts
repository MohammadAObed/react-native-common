import type { ErrorCodeValues } from "../types/constants";

export const ErrorCode = {
  UNKOWN: "0x00001",
  CUSTOM: "0x00002",
  GET_DB_VERSION: "0x10000",
  LOAD_DB_ASSET: "0x10001",
  LOAD_DB_ASSET_LOCAL_URI: "0x10002",
  UNKNOWN_DB_VERSION: "0x10003",
  UNKNOWN_DB_VERSION_FILE: "0x10004",
  NO_DB_TRANSACTION_FOUND: "0x10005",
} as const;

export const ErrorCodesNotShownToScreen: ErrorCodeValues[] = [ErrorCode.UNKOWN, ErrorCode.CUSTOM];

export const DB_ERROR_MESSAGE = "Failed to load local resources";
