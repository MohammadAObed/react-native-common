import { StyleSheet } from "react-native";
import { type MD3Theme } from "react-native-paper";
import { getRoundnessStyle } from "../../styles";

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
      ...getRoundnessStyle(theme).Choices,
      paddingVertical: 9,
    },
    containerWithClearButton: {
      width: "auto",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 5,
    },
  });
