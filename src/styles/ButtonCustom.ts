import { StyleSheet } from "react-native";
import { MD3Theme } from "react-native-paper";
import { DEFAULT_FONT_SIZE } from "../constants";
// TODO brainstorm better style structure

export const getButtonCustomStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    button: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 5,
    },
    withRadius: {
      borderRadius: 20,
    },
    text: { fontSize: DEFAULT_FONT_SIZE },
  });

export const getButtonCustomModeStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    bare: {},
    text: {
      paddingHorizontal: 7,
      paddingVertical: 9,
    },
    button: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 7,
      paddingVertical: 9,
    },
  });

export const getButtonCustomModeTextStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    bare: {
      color: theme.colors.onSurface,
    },
    text: {
      color: theme.colors.onSurface,
    },
    button: {
      color: theme.colors.background,
    },
  });
