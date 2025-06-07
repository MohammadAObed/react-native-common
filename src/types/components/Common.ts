import type { Key } from 'react';
import type { RegisteredStyle, StyleProp } from 'react-native';

export type StylePropWithout<T, K extends keyof T> = StyleProp<
  | Omit<T, K>
  | Omit<T, K>[]
  | RegisteredStyle<Omit<T, K>>
  | Array<Omit<T, K> | RegisteredStyle<Omit<T, K>>>
  | null
  | undefined
>;

export type OptionalChildren<Props> = Omit<Props, 'children'> & {
  children?: React.ReactNode;
};

export type DisplayDataItemFrom<
  DataType extends Key,
  Label extends React.ReactNode | React.ReactNode = React.ReactNode,
> = {
  value: DataType;
  label: Label;
  props?: Record<string, unknown>;
};

export type DynamicProps = Record<string, unknown> & {
  props?: Record<string, unknown>;
};

export type IsMultiProps<
  Value extends ValueProperty,
  AdditionalMultiProps extends Record<string, unknown> = {},
  AdditionalSingleProps extends Record<string, unknown> = {},
> =
  | ({
      isMultiSelect: true;
      value: Value[];
      onChange: (values: OnChangeMultiParam<Value>) => void;
      allowEmpty?: boolean;
    } & AdditionalMultiProps)
  | ({
      isMultiSelect?: false;
      value: Value;
    } & (
      | { allowEmpty: true; onChange: (value: Value | undefined) => void }
      | { allowEmpty?: false; onChange: (value: NonNullable<Value>) => void }
    ) &
      AdditionalSingleProps);

type OnChangeMultiParam<Value extends ValueProperty> = {
  values: Value[];
  newValue?: Value;
  deletedValue?: Value;
};

export type ValueProperty = undefined | Key;

export type OverlayMode = 'detailed' | 'simple';
