import { StyleSheet } from "react-native";
import { type MD3Theme } from "react-native-paper";

export const getTextInputCustomStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    input: {
      backgroundColor: "transparent",
      borderColor: theme.colors.outline,
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
    label: {
      color: theme.colors.onSurfaceVariant,
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
