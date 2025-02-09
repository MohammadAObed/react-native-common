import Constants from "expo-constants";

export function isDev() {
  return Constants.appOwnership === "expo";
}
