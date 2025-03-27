import * as Device from "expo-device";
import { isValidElement } from "react";
import type { ViewStyle } from "react-native";

export function getContainerStyleFromChildren(children: any): ViewStyle {
  let _containerStyle: ViewStyle = {};
  if (isValidElement(children)) {
    _containerStyle = getContainerStyleFromChild(children);
  } else if (Array.isArray(children)) {
    _containerStyle.width = children.map((x: any) => getContainerStyleFromChild(x).width).mMax((x) => x);
  }
  return _containerStyle;
}

export function getContainerStyleFromChild(child: any): ViewStyle {
  return {
    width:
      child.props?.width ??
      child.props?.style?.width ??
      (child.props?.style as any[])
        ?.flat()
        ?.mOrderBy((y) => y?.width !== undefined && y?.width !== null)
        ?.mMax?.((y) => y?.width),
  };
}

export function getStyleFromChildren(children: any): ViewStyle {
  let _containerStyle: ViewStyle = {};
  if (isValidElement(children)) {
    _containerStyle = getStyleFromChild(children);
  } else if (Array.isArray(children)) {
    _containerStyle.marginHorizontal = children.map((x: any) => getStyleFromChild(x).marginHorizontal).mMax((x) => x);
  }
  return _containerStyle;
}

export function getStyleFromChild(child: any): ViewStyle {
  return {
    marginHorizontal:
      child.props?.marginHorizontal ??
      child.props?.style?.marginHorizontal ??
      (child.props?.style as any[])
        ?.flat()
        ?.mOrderBy((y) => y?.marginHorizontal !== undefined && y?.marginHorizontal !== null)
        ?.mMax?.((y) => y?.marginHorizontal),
  };
}

export function isBlurSupported() {
  return Device.osName === "Android" && parseInt(Device.osVersion ?? "0", 10) >= 12;
}
