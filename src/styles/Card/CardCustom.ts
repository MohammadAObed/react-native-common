import { StyleSheet } from "react-native";
import { type MD3Theme } from "react-native-paper";
import { getRoundnessStyle } from "../../styles/Common";

export const getCardCustomStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      ...getRoundnessStyle(theme).Card,
      backgroundColor: theme.colors.elevation.level1,
      height: 73,
      alignItems: "flex-start",
      paddingHorizontal: 12,
      marginHorizontal: 12,
      flexDirection: "column",
      rowGap: 0,
    },
    title: {
      fontWeight: "bold",
    },
    description: {
      width: "56%",
      color: theme.colors.onSurfaceVariant,
    },
  });
