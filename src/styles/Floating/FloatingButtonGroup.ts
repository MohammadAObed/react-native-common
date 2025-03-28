import { StyleSheet } from "react-native";
import { type MD3Theme } from "react-native-paper";
import { SECONDARY_MEDIUM_OPACITY } from "../../constants";

export const getFloatingButtonGroupStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      position: "absolute",
      width: "100%",
      height: "100%",
      maxWidth: 90,
      maxHeight: 85,
      overflow: "visible",
    },
    fabStyle: {
      backgroundColor: theme.colors.primary,
      color: "white",
      borderRadius: "50%",
    },
    actionContainerStyle: {
      width: "100%",
    },
    actionLabelStyle: {
      width: "100%",
    },
    iconColor: { color: theme.colors.background },
    rippleColor: { color: `${theme.colors.background}${SECONDARY_MEDIUM_OPACITY}` },
  });
