import { StyleSheet } from "react-native";
import { MD3Theme } from "react-native-paper";

export const getPressableIconStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    icon: {
      color: theme.colors.primary,
    },
    disabledIcon: {
      color: theme.colors.surfaceDisabled,
    },
    landscapeDevice: {
      transform: [{ rotate: "-90deg" }],
    },
  });
