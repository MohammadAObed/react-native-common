import { useTheme } from "react-native-paper";
import { ThemeCommon } from "../types/theme";

export function useThemeCommon() {
  const theme = useTheme() as ThemeCommon;
  return theme;
}
