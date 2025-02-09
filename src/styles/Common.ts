import { StyleSheet, ViewStyle } from "react-native";
import { MD3Theme } from "react-native-paper";
import { HIGHEST_ZINDEX, LARGE_FONT_SIZE, SECONDARY_MEDIUM_OPACITY } from "../constants";

export const iconStyle: ViewStyle = { position: "absolute", bottom: 5, zIndex: HIGHEST_ZINDEX };

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
  absoluteNavigationButton: {
    ...iconStyle,
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  absoluteNavigationButtonText: {
    fontSize: LARGE_FONT_SIZE,
  },
  disabledButton: { opacity: 0.5 },
});

export const getCommonShadowStyle = (theme: MD3Theme, elevation: number) =>
  StyleSheet.create({
    shadow: {
      elevation, // Android
      shadowColor: `${theme.colors.secondary}${SECONDARY_MEDIUM_OPACITY}`,
      shadowOpacity: 0.3,
      shadowRadius: elevation * 0.5,
      shadowOffset: {
        width: 0,
        height: elevation / 2,
      },
    },
  });
