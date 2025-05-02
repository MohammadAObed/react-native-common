import { StyleSheet } from "react-native";
import { type MD3Theme } from "react-native-paper";

export const getSvgCustomStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    svg: {
      color: theme.colors.primary,
    },
    stroke: {
      color: theme.colors.outline,
    },
  });
