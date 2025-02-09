import type { ViewStyle } from 'react-native';
import type { ButtonCustomProps } from '../ButtonCustom';
import type { ButtonCustomWithIconProps } from '../ButtonCustomWithIcon';
import type {
  DynamicProps,
  IsMultiProps,
  OptionalChildren,
  ValueProperty,
} from '../Common';

export type ChoicesProps<
  Model extends DynamicProps,
  Value extends ChoiceValueField = number,
> = OptionalChildren<ButtonCustomWithIconProps> & {
  containerStyle?: ViewStyle;
  data: Model[];
  valueField?: keyof Model;
  labelField?: keyof Model;
  disabledValues?: Value[];
  getProps?: (item: Model) => ButtonCustomProps;
} & IsMultiProps<Value>;

export type ChoiceValueField = ValueProperty;
