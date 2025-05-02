import { StyleSheet } from "react-native";
import { type MD3Theme } from "react-native-paper";
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
      borderColor: theme.colors.outline,
    },
  });

export const getButtonCustomModeStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    bare: {},
    text: {
      paddingHorizontal: 7,
      paddingVertical: 9,
    },
    ["text-shadow"]: {
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
    bare: { color: theme.colors.onSurface },
    text: { color: theme.colors.onSurface },
    ["text-shadow"]: {
      fontWeight: "900",
      textShadowColor: `${theme.colors.onSurface}${77}`,
      textShadowRadius: 5,
      color: theme.colors.onSurface,
    },
    button: { color: theme.colors.onPrimary },
  });
