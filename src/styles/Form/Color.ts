import { StyleSheet } from "react-native";
import { type MD3Theme } from "react-native-paper";

export const getColorStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    colorIndicator: {
      zIndex: 2,
      width: 50,
      minHeight: 25,
    },
    colorIndicatorText: {
      color: theme.colors.onSurface,
    },
    colorPickerContainer: {
      marginTop: -60,
      paddingBottom: 30,
      marginLeft: "auto",
      // marginBottom: 45,
    },
  });
