import { StyleSheet } from "react-native";
import { type MD3Theme } from "react-native-paper";

export const getCollapsibleStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    icon: {
      color: theme.colors.onSurface,
      fontSize: theme.fonts.bodyMedium.fontSize,
    },
    container: {
      width: "100%",
    },
    row: { flexDirection: "row", alignItems: "center", justifyContent: "flex-start", flexWrap: "wrap", width: "100%", padding: 5 },
    title: { textAlign: "left" },
    subTitle: { marginLeft: 10, opacity: 0.7, flex: 1 },
  });
