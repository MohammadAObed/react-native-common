import { StyleSheet } from "react-native";
import { type MD3Theme } from "react-native-paper";
import { DEFAULT_FONT_SIZE } from "../../constants";

export const getTextInputCustomStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    input: {
      backgroundColor: "transparent",
      fontSize: DEFAULT_FONT_SIZE * 1.0714,
      borderColor: theme.colors.outline,
      color: theme.colors.onSurface,
    },
    inputLabel: {
      fontSize: DEFAULT_FONT_SIZE,
    },
    activeInputLabel: {
      color: theme.colors.primary,
    },
    placeholderColor: {
      color: theme.colors.onSurfaceVariant,
    },
    underlineColor: {
      color: theme.colors.outline,
    },
  });

export const getTextInputCustomModeStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    form: {
      backgroundColor: theme.colors.elevation.level2,
    },
    text: {
      backgroundColor: "transparent",
    },
  });
