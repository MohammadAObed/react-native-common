import AntDesign from "@expo/vector-icons/AntDesign";
import type { ViewProps, ViewStyle } from "react-native";
import type { DropdownProps } from "react-native-element-dropdown/lib/typescript/components/Dropdown/model";
import type { MultiSelectProps } from "react-native-element-dropdown/lib/typescript/components/MultiSelect/model";
import type { IsMultiProps, ValueProperty } from "../../Common";

export type DropDownValueField = ValueProperty;
export type DropDownLabelField = string;

export type DropDownCustomProps<Model, Value extends DropDownValueField> = {
  wrapperStyle?: ViewStyle;
  label?: React.ReactNode;
  iconName?: keyof (typeof AntDesign)["glyphMap"];
  valueField: keyof Model;
  labelField: keyof Model;
  variant?: "filled" | "plain";
  renderItemProps?: DropDownSingleAndMultiProps<Model>["renderItemProps"];
  text?: DropDownSingleAndMultiProps<Model>["text"];
  disabledValues?: Value[];
  fullWidth?: boolean;
} & IsMultiProps<
  Value,
  Omit<MultiSelectProps<Model>, "value" | "onChange"> & {
    orderByValue?: boolean;
  } & DropDownMultiProps,
  Omit<DropdownProps<Model>, "value" | "onChange"> & {
    seperator?: undefined;
    orderByValue?: never;
  }
>;

export type DropDownComponentsProps = {
  iconName?: keyof (typeof AntDesign)["glyphMap"];
  isFocused?: boolean;
};

export type DropDownSingleAndMultiProps<Model> = DropDownComponentsProps & {
  focus: () => void;
  unfocus: () => void;
  renderItemProps?: (item: Model, isFocused: boolean) => Partial<DropDownItemProps<Model>>;
  text?: string;
  disabledValues?: DropDownCustomProps<Model, DropDownValueField>["disabledValues"];
};

export type DropDownMultiProps = {
  seperator?: string;
  showSelectAllCheckBox?: boolean;
};

export type DropDownItemProps<Model> = ViewProps &
  DropDownComponentsProps & {
    item: Model;
    labelField: keyof Model;
    disabled?: boolean;
  };

export type DropDownBarProps<T> = {
  data: T[];
  valueField: keyof T;
  labelField: keyof T;
  searchPlaceholder?: string;
  search?: boolean;
  onSearch: (text: string) => void;
} & (
  | { showSelectAllCheckBox: true; onSeletAllCheckBoxChange: (value: string[]) => void }
  | { showSelectAllCheckBox?: false; onSeletAllCheckBoxChange?: undefined }
);
