import { StyleSheet } from "react-native";
import { type MD3Theme } from "react-native-paper";

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
    errorCode: {
      position: "absolute",
      bottom: 15,
      left: 15,
      alignSelf: "center",
    },
    appVersion: {
      position: "absolute",
      bottom: 15,
      right: 15,
      alignSelf: "center",
    },
    simpleText: {
      marginTop: 4,
    },
  });
