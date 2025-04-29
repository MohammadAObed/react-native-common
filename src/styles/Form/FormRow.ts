import { StyleSheet } from "react-native";
import { type MD3Theme } from "react-native-paper";
import { DEFAULT_FONT_SIZE } from "../../constants";

export const getFormRowStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    formRowContainer: {
      backgroundColor: theme.colors.elevation.level2,
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 8.5,
      paddingHorizontal: 15,
      flexWrap: "wrap",
      columnGap: 8,
    },
    label: {
      color: theme.colors.onSurfaceVariant,
      fontSize: DEFAULT_FONT_SIZE,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      gap: 5,
      // backgroundColor: "red",
    },
  });

export const getFormRowModeStyles = () =>
  StyleSheet.create({
    normal: {},
    blend: { backgroundColor: "transparent" },
  });
