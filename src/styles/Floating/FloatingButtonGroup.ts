import { StyleSheet } from "react-native";
import { type MD3Theme } from "react-native-paper";

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
    iconColor: { color: theme.colors.surface },
    rippleColor: { color: theme.colors.onSurfaceVariant },
  });
