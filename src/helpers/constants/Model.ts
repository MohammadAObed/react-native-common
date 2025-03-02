import { NEW_ID, NEW_ID_FACTOR } from "@mohammad_obed/react-native-common/src/constants";

export function getNewestId(id?: number) {
  return (id ?? NEW_ID) + NEW_ID_FACTOR;
}
