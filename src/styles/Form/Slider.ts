import { StyleSheet } from "react-native";
import { MD3Theme } from "react-native-paper";

export const getSliderCustomStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    slider: {
      flex: 0.9,
      height: 40,
      zIndex: 1,
    },
    thumb: {
      color: theme.colors.primary,
    },
    MaximumTrackThumb: {
      color: theme.colors.secondary,
    },
    container: {
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
      justifyContent: "space-around",
    },
    numberInputContainer: { transform: [{ translateY: -5 }] },
    numberInput: {
      flex: 1,
      marginBottom: -15,
    },
    inputContentStyle: {
      textAlign: "center",
    },
  });
