import { StyleSheet } from "react-native";
import type { MD3Theme } from "react-native-paper";

const getShadowStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    shadowContainer: {
      position:'relative',
      overflow:'visible',
    },
    shadow: {
      position:'absolute',
      top: 0,
      left: 0,
      right: 0, // Instead of width: '100%'
      bottom: 0,
      backgroundColor: theme.colors.secondary,
      // elevation: 10, // For Android shadow visibility
    }
  });

export default getShadowStyles;
