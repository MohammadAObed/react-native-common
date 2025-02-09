import { StyleSheet } from "react-native";
import { MD3Theme } from "react-native-paper";

export const getScrollContainerStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
    },
    contentContainer: {
      rowGap: 12,
      paddingVertical: 10,
      minHeight: "100%",
    },
  });
