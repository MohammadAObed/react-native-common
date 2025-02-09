import { useStyles } from "../../../hooks";
// import React from "react";
import { Dropdown } from "react-native-element-dropdown";
import { DropdownProps } from "react-native-element-dropdown/lib/typescript/components/Dropdown/model";
import { getDropDownCustomStyles } from "../../../styles";
import { DropDownLabelField, DropDownSingleAndMultiProps, DropDownValueField } from "../../../types/components";
import { DropDownIcon } from "./DropDownIcon";
import { DropDownItem } from "./DropDownItem";

export const DropDownSingleSelect = <Model,>({
  style,
  data,
  value,
  valueField,
  labelField,
  placeholder,
  iconName,
  text,
  disabledValues,
  isFocused,
  focus,
  unfocus,
  onChange,
  renderItemProps,
  ...rest
}: DropdownProps<Model> & DropDownSingleAndMultiProps<Model>) => {
  const { styles } = useStyles(getDropDownCustomStyles);

  const isValueString = value != undefined && value != null && typeof value === "string";
  const isValueModel = value != undefined && value != null && typeof value !== "string";

  const renderItem = (item: Model) => {
    const itemKey = item[valueField] as DropDownValueField;
    const isFocused = isValueString ? itemKey == value : isValueModel && itemKey == value[valueField]; //"==" instead of "===" because item[valueField] might be for example: 2 and not "2"
    const props = renderItemProps?.(item, isFocused);
    return (
      <DropDownItem
        item={item}
        labelField={labelField}
        iconName={iconName}
        isFocused={isFocused}
        {...props}
        disabled={disabledValues?.includes(itemKey)}
      />
    );
  };

  let inputText: string | null =
    text ??
    (value
      ? (data.find((x) => (isValueString ? x[valueField] == value : isValueModel && x[valueField] == value[valueField]))?.[
          labelField
        ] as DropDownLabelField) //"==" instead of "===" because x[valueField] might be for example: 2 and not "2"
      : null);
  if (inputText === "") inputText = null;

  return (
    <Dropdown
      style={[styles.dropdown, style]}
      placeholderStyle={[styles.placeholder, !isFocused && inputText ? styles.text : undefined]}
      selectedTextStyle={styles.selectedText}
      inputSearchStyle={styles.inputSearch}
      value={value}
      data={data}
      valueField={valueField}
      labelField={labelField}
      containerStyle={styles.dropdownContainer}
      placeholder={!isFocused ? inputText ?? placeholder ?? "" : inputText ?? "..."}
      searchPlaceholder="Search..."
      onFocus={() => focus()}
      onBlur={() => unfocus()}
      onChange={(item: Model) => {
        onChange(item);
        unfocus();
      }}
      renderLeftIcon={() => <DropDownIcon iconName={iconName} isFocused={isFocused} />}
      renderItem={renderItem}
      {...rest}
    />
  );
};
