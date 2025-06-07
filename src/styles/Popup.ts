import { StyleSheet } from "react-native";
import { type MD3Theme } from "react-native-paper";
import { HIGHEST_ZINDEX } from "../constants";
import { getRoundnessStyle } from "../styles/Common";

export const getPopupStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    shade: {
      flex: 1,
      backgroundColor: theme.colors.scrim,
    },
    centeredContainer: {
      alignItems: "center",
    },
    Button: {
      alignSelf: "stretch",
    },
    invisibleContainer: {
      position: "absolute",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
    },
    contentContainer: {
      ...getRoundnessStyle(theme).Popup,
      width: "102%",
      gap: 15,
      backgroundColor: theme.colors.surface,
      paddingHorizontal: 20,
      paddingVertical: 25,
    },
    cancelButton: {
      position: "absolute",
      top: 0,
      right: 10,
      color: theme.colors.onSurface,
      zIndex: HIGHEST_ZINDEX,
      fontSize: theme.fonts.displaySmall.fontSize,
    },
    title: {},
  });
