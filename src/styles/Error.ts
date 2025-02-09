import { StyleSheet } from "react-native";
import { MD3Theme } from "react-native-paper";

export const getErrorStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
      justifyContent: "center",
      rowGap: 15,
      paddingHorizontal: 15,
    },
    buttonText: {
      fontWeight: "900",
    },
  });
