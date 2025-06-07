import { StyleSheet } from "react-native";
import { type MD3Theme } from "react-native-paper";
import { getRoundnessStyle } from "../styles";
// TODO brainstorm better style structure

export const getButtonCustomStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    button: {
      ...getRoundnessStyle(theme).button,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 5,
      paddingHorizontal: 16,
      paddingVertical: 9,
    },
    withRadius: {
      borderRadius: 20,
      borderColor: theme.colors.outline,
    },
  });

export const getButtonCustomModeStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    plain: { paddingHorizontal: 0, paddingVertical: 0 },
    text: {},
    ["text-shadow"]: {},
    contained: {
      backgroundColor: theme.colors.primary,
    },
  });

export const getButtonCustomModeTextStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    plain: { color: theme.colors.onSurface },
    text: { color: theme.colors.onSurface },
    ["text-shadow"]: {
      fontWeight: "900",
      textShadowColor: `${theme.colors.onSurface}${77}`,
      textShadowRadius: 5,
      color: theme.colors.onSurface,
    },
    contained: { color: theme.colors.onPrimary },
  });
