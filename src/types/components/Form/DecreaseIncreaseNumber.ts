import { ButtonCustomProps } from "../ButtonCustom";
import { OptionalChildren } from "../Common";
import { NumberInputModeProps } from "./NumberInput";

export type DecreaseIncreaseNumberProps = OptionalChildren<ButtonCustomProps> & {
  value: number;
  min?: number;
  max?: number;
  visible?: boolean;
  onChangeValue: (value: number) => void;
} & NumberInputModeProps;
