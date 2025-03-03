import { StyleSheet } from "react-native";
import { type MD3Theme } from "react-native-paper";

export const getLoadingStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    indicator: {
      color: theme.colors.primary,
    },
    loadingText: {
      color: theme.colors.primary,
    },
  });
