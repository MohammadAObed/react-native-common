import { TextInputCustomProps } from "../../components";

export type useInputHandlersProps = Pick<
  TextInputCustomProps,
  "value" | "minValue" | "maxValue" | "decimalPlaces" | "onChangeNumber" | "onChangeDecimal"
> & {
  onChangeText?: (value: string) => string | void;
};
