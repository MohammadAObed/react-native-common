import { StyleSheet } from "react-native";
import { MD3Theme } from "react-native-paper";
import { DEFAULT_FONT_SIZE } from "../constants";

export const getSvgCustomStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    svg: {
      color: theme.colors.primary,
    },
    stroke: {
      color: theme.colors.secondary,
    },
    unknownText: { fontSize: DEFAULT_FONT_SIZE },
  });
