import { HIGHEST_ZINDEX } from "@mohammad_obed/react-native-common/src/constants";
import { StyleSheet } from "react-native";
import { type MD3Theme } from "react-native-paper";

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
      width: "102%",
      gap: 15,
      backgroundColor: theme.colors.surface,
      borderRadius: 10,
      paddingHorizontal: 20,
      paddingVertical: 25,
    },
    cancelButton: {
      position: "absolute",
      top: 0,
      right: 10,
      color: theme.colors.onSurface,
      zIndex: HIGHEST_ZINDEX,
    },
    title: {},
  });
