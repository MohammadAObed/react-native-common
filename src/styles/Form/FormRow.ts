import { StyleSheet } from "react-native";
import { MD3Theme } from "react-native-paper";
import { DEFAULT_FONT_SIZE, FORM_BACKGROUND_OPACITY, FORM_LABEL_OPACITY } from "../../constants";

export const getFormRowStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    formRowContainer: {
      backgroundColor: `${theme.colors.secondary}${FORM_BACKGROUND_OPACITY}`,
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 8.5,
      paddingHorizontal: 15,
      flexWrap: "wrap",
      columnGap: 8,
    },
    label: {
      color: `${theme.colors.secondary}${FORM_LABEL_OPACITY}`,
      fontSize: DEFAULT_FONT_SIZE,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      gap: 5,
      // backgroundColor: "red",
    },
  });

export const getFormRowModeStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    normal: {},
    blend: { backgroundColor: "transparent" },
  });
