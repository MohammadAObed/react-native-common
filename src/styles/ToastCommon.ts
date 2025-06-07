import { StyleSheet } from "react-native";
import { getRoundnessStyle } from "../styles/Common";
import { ThemeCommon } from "../types/theme";

export const getToastCommonStyles = (theme: ThemeCommon) =>
  StyleSheet.create({
    container: {
      ...getRoundnessStyle(theme).Toast,
      position: "relative",
      backgroundColor: theme.colors.onSurface,
      paddingVertical: 14,
      marginHorizontal: 10,
      marginBottom: 30,
      width: "95%",
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
    },
    text: {
      color: theme.colors.surface,
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
      fontSize: theme.fonts.titleLarge.fontSize - 2,
    },
    closeBtnText: {
      color: theme.colors.surface,
    },
  });
