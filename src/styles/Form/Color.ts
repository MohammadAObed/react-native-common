import { StyleSheet } from "react-native";
import { type MD3Theme } from "react-native-paper";
import { SMALL_FONT_SIZE } from "../../constants";

export const getColorStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    colorIndicator: {
      zIndex: 2,
      width: 50,
      minHeight: 25,
    },
    colorIndicatorText: {
      color: theme.colors.onSurface,
      fontSize: SMALL_FONT_SIZE,
    },
    colorPickerContainer: {
      marginTop: -60,
      paddingBottom: 30,
      marginLeft: "auto",
      // marginBottom: 45,
    },
  });
