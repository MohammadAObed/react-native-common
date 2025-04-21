import { StyleSheet } from "react-native";
import { ThemeCommon } from "../types/theme";

export const getToastCommonStyles = (theme: ThemeCommon) =>
  StyleSheet.create({
    container: {
      position: "relative",
      backgroundColor: theme.colors.secondary,
      borderRadius: 8,
      paddingVertical: 14,
      marginHorizontal: 10,
      marginBottom: 30,
      width: "95%",
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
    },
    text: {
      color: theme.colors.background,
      flex: 0.9,
      lineHeight: 20,
    },
    bold: {
      fontWeight: "bold",
    },
    errorIconColor: {
      color: theme.colors.error,
    },
    successIconColor: {
      color: theme.colors.success,
    },
    infoIconColor: {
      color: theme.colors.info,
    },
    warningIconColor: {
      color: theme.colors.warning,
    },
    validationIconColor: {
      color: theme.colors.validation,
    },
    icon: {
      alignSelf: "center",
      marginTop: 1,
    },
    closeBtnText: {
      color: theme.colors.primary,
    },
  });
