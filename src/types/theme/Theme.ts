import { MD3Theme } from "react-native-paper/src/types";
import { ThemeColorsCommon } from "./Colors";

export type ThemeCommon = Omit<MD3Theme, "colors"> & {
  colors: ThemeColorsCommon;
};
