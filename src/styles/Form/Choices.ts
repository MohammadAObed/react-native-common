import { StyleSheet } from "react-native";
import { type MD3Theme } from "react-native-paper";
import { DEFAULT_FONT_SIZE } from "../../constants";

export const getChoicesStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      flexWrap: "wrap",
    },
    option: {
      paddingVertical: 9,
    },
    selectedOption: {
      backgroundColor: theme.colors.primary,
    },

    containerWithClearButton: {
      width: "auto",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 5,
    },
    selectedText: {
      fontSize: DEFAULT_FONT_SIZE,
      color: theme.colors.onPrimary,
    },
  });
