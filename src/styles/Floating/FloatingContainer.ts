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
    topLeft: {
      left: edgeMargin,
    },
    topCenter: {
      alignSelf: "center",
    },
    topRight: {
      right: edgeMargin,
    },
    bottomLeft: {
      left: edgeMargin,
      bottom: edgeMargin,
    },
    bottomCenter: {
      bottom: edgeMargin,
      alignSelf: "center",
    },
    bottomRight: {
      bottom: edgeMargin,
      right: edgeMargin,
    },
    middleLeft: {
      top: "50%",
      left: edgeMargin,
    },
    middleCenter: {
      top: "50%",
      alignSelf: "center",
    },
    middleRight: {
      top: "50%",
      right: edgeMargin,
    },
  });
