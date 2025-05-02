import { StyleSheet, type ViewStyle } from "react-native";
import { type MD3Theme } from "react-native-paper";
import { HIGHEST_ZINDEX } from "../constants";

export const iconStyle: ViewStyle = {
  position: "absolute",
  bottom: 5,
  zIndex: HIGHEST_ZINDEX,
};

export const commonStyles = StyleSheet.create({
  containerCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  containerRowCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  containerRowCenterHorizontal: {
    flexDirection: "row",
    justifyContent: "center",
  },
  positionRelative: {
    position: "relative",
  },
  disabledButton: { opacity: 0.5 },
  absoluteBottomCentered: {
    position: "absolute",
    bottom: 5,
    zIndex: HIGHEST_ZINDEX,
    alignSelf: "center",
    flexDirection: "row",
    gap: 5,
  },
  fitContainer: {
    paddingVertical: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  centerContainerContent: {
    flex: 1,
  },
});

export const getRoundnessStyle = (theme: MD3Theme) =>
  StyleSheet.create({
    button: { borderRadius: theme.roundness * 5 },
    Dropdown: { borderTopLeftRadius: theme.roundness * 1.5, borderTopRightRadius: theme.roundness * 1.5 },
    Card: { borderRadius: theme.roundness * 1.5 },
    Choices: { borderRadius: theme.roundness * 5 * 1.6 },
    TextInput: { borderTopLeftRadius: theme.roundness * 1.5, borderTopRightRadius: theme.roundness * 1.5 },
    Popup: { borderRadius: theme.roundness * 1.5 },
    Toast: { borderRadius: theme.roundness * 1.5 },
  });
