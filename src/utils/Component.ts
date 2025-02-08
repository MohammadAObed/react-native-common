import { isValidElement } from "react";

export function isValidComponent(children: React.ReactNode) {
  return isValidElement(children) || (Array.isArray(children) && children.some((child) => isValidElement(child)));
}
