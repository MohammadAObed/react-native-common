import * as Device from "expo-device";
import { isValidElement } from "react";
import { ShadowChild, ShadowChildren, ShadowStyle } from "../../types/helpers";
import { fromEntries } from "../../utils";

const containerStyleKeys: (keyof ShadowStyle)[] = ["width", "height"];
const styleKeys: (keyof ShadowStyle)[] = ["marginHorizontal", "marginVertical", "marginBottom", "marginTop", "marginLeft", "marginRight"];

export function isBlurSupported() {
  return Device.osName === "Android" && parseInt(Device.osVersion ?? "0", 10) >= 12;
}

export function getContainerStyleFromChildren(children: ShadowChildren): ShadowStyle {
  let _containerStyle: ShadowStyle = {};
  if (isValidElement(children)) {
    _containerStyle = getContainerStyleFromChild(children);
  } else if (Array.isArray(children)) {
    containerStyleKeys.forEach((key) => (_containerStyle[key] = getStylePropValueFromArray(children, key) as any));
  }
  return _containerStyle;
}

export function getStyleFromChildren(children: ShadowChildren): ShadowStyle {
  let _style: ShadowStyle = {};
  if (isValidElement(children)) {
    _style = getStyleFromChild(children);
  } else if (Array.isArray(children)) {
    styleKeys.forEach((key) => (_style[key] = getStylePropValueFromArray(children, key) as any));
  }
  return _style;
}

export function getContainerStyleFromChild(child: ShadowChild): ShadowStyle {
  return fromEntries(containerStyleKeys.map((key) => [key, getStylePropValue(child, key)]));
}

export function getStyleFromChild(child: ShadowChild): ShadowStyle {
  return fromEntries(styleKeys.map((key) => [key, getStylePropValue(child, key)]));
}

function getStylePropValue(child: ShadowChild, key: keyof ShadowStyle) {
  if (!child || typeof child !== "object" || !Object.hasOwn(child, "props")) return;
  return (
    child?.props?.[key] ??
    child?.props?.style?.[key] ??
    (child?.props?.style as any[])
      ?.flat?.()
      ?.mOrderBy?.((y) => y?.[key] !== undefined && y?.[key] !== null)
      ?.mMax?.((y) => y?.[key])
  );
}

function getStylePropValueFromArray(children: ShadowChildren[], key: keyof ShadowStyle) {
  return children.map((x: any) => getStyleFromChild(x)[key]).mMax((x) => x);
}
