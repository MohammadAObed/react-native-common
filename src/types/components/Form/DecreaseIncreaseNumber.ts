import type { OptionalChildren } from "../Common";
import type { NumberInputModeProps } from "./NumberInput";

export type DecreaseIncreaseNumberProps = OptionalChildren<{}> & {
  value: number;
  min?: number;
  max?: number;
  visible?: boolean;
  onChangeValue: (value: number) => void;
} & NumberInputModeProps;
