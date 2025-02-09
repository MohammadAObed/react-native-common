import { StyleSheet } from "react-native";
import { MD3Theme } from "react-native-paper";
import { SECONDARY_HIGH_OPACITY, SECONDARY_LOW_OPACITY, SMALL_FONT_SIZE } from "../../constants";

export const getColorStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    colorIndicator: {
      zIndex: 2,
      width: 50,
      minHeight: 25,
      borderColor: `${theme.colors.secondary}${SECONDARY_LOW_OPACITY}`,
    },
    colorIndicatorText: {
      color: `${theme.colors.secondary}${SECONDARY_HIGH_OPACITY}`,
      fontSize: SMALL_FONT_SIZE,
    },
    colorPickerContainer: {
      marginTop: -60,
      paddingBottom: 30,
      // marginBottom: 45,
    },
  });
