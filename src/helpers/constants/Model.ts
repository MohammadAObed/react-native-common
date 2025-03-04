import { NEW_ID, NEW_ID_FACTOR } from "../../constants";

export function getNewestId(id?: number) {
  return (id ?? NEW_ID) + NEW_ID_FACTOR;
}
