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

export const getCommonShadowStyle = (theme: MD3Theme, elevation: number) =>
  StyleSheet.create({
    shadow: {
      elevation, // Android
      shadowColor: theme.colors.shadow,
      shadowOpacity: 0.3,
      shadowRadius: elevation * 0.5,
      shadowOffset: {
        width: 0,
        height: elevation / 2,
      },
    },
  });
