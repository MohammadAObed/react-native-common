import type { TextInputCustomProps } from "../../components";

export type useInputHandlersProps = Pick<
  TextInputCustomProps,
  "value" | "minValue" | "maxValue" | "decimalPlaces" | "onChangeNumber" | "onChangeDecimal" | "textForceUpdateCounter"
> & {
  onChangeText?: (value: string) => string | void;
};
