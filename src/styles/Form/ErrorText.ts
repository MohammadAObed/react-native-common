import { StyleSheet } from "react-native";
import { type MD3Theme } from "react-native-paper";

export const getErrorTextStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    errorText: {
      color: theme.colors.error,
    },
  });
