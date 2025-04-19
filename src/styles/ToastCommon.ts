import { StyleSheet } from "react-native";
import { type MD3Theme } from "react-native-paper";

export const getToastCommonStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      position: "relative",
      backgroundColor: theme.colors.background,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 15,
      marginHorizontal: 10,
      marginBottom: 30,
      width: "95%",
    },
    text: {
      color: theme.colors.secondary,
      width: "85%",
      lineHeight: 20,
    },
  });
