import { StyleSheet } from "react-native";
import { type MD3Theme } from "react-native-paper";

export const getFloatingContainerStyles = (_theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      position: "absolute",
      backgroundColor: "transparent",
    },
  });

const edgeMargin = 10;

export const getFloatingContainerModeStyles = (_theme: MD3Theme) =>
  StyleSheet.create({
    ["top-left"]: {
      left: edgeMargin,
    },
    ["top-center"]: {
      alignSelf: "center",
    },
    ["top-right"]: {
      right: edgeMargin,
    },
    ["bottom-left"]: {
      left: edgeMargin,
      bottom: edgeMargin,
    },
    ["bottom-center"]: {
      bottom: edgeMargin,
      alignSelf: "center",
    },
    ["bottom-right"]: {
      bottom: edgeMargin,
      right: edgeMargin,
    },
    ["middle-left"]: {
      top: "50%",
      left: edgeMargin,
    },
    ["middle-center"]: {
      top: "50%",
      alignSelf: "center",
    },
    ["middle-right"]: {
      top: "50%",
      right: edgeMargin,
    },
  });
