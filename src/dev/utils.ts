import Constants from "expo-constants";

export function isDev() {
  return Constants.appOwnership === "expo";
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
