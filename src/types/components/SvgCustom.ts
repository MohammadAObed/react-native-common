import { SvgShapeValues } from "@mohammad_obed/react-native-common/src/constants";
import { ColorValue } from "react-native";

export type SvgCustomProps = {
  shape: SvgShapeValues;
  strokeWidth?: number;
  color?: ColorValue;
  isSmall?: boolean;
};
