import { StyleSheet } from "react-native";
import { MD3Theme } from "react-native-paper";

export const getWizardCustomStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: { alignItems: "center" },
    buttons: { width: 75 },
  });
