import { ViewStyle } from "react-native";
import { ButtonCustomProps } from "../ButtonCustom";
import { ButtonCustomWithIconProps } from "../ButtonCustomWithIcon";
import { DynamicProps, IsMultiProps, OptionalChildren, ValueProperty } from "../Common";

export type ChoicesProps<Model extends DynamicProps, Value extends ChoiceValueField = number> = OptionalChildren<ButtonCustomWithIconProps> & {
  containerStyle?: ViewStyle;
  data: Model[];
  valueField?: keyof Model;
  labelField?: keyof Model;
  disabledValues?: Value[];
  getProps?: (item: Model) => ButtonCustomProps;
} & IsMultiProps<Value>;

export type ChoiceValueField = ValueProperty;
