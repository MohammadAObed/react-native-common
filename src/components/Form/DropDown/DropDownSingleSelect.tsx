import { Dropdown } from "react-native-element-dropdown";
import type { DropdownProps } from "react-native-element-dropdown/lib/typescript/components/Dropdown/model";
import { useStyles } from "../../../hooks";
import { getDropDownCustomStyles } from "../../../styles";
import type { DropDownLabelField, DropDownSingleAndMultiProps, DropDownValueField } from "../../../types/components";
import { DropDownBar } from "./DropDownBar";
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
  search,
  focus,
  unfocus,
  onChange,
  renderItemProps,
  ...rest
}: DropdownProps<Model> & DropDownSingleAndMultiProps<Model>) => {
  const { styles } = useStyles(getDropDownCustomStyles);

  const isValueString = typeof value === "string";
  const isValueModel = value !== undefined && value !== null && typeof value !== "string";

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
        disabled={disabledValues?.includes(itemKey)}
        {...props}
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
      containerStyle={styles.dropdownContainer}
      placeholderStyle={[styles.placeholder, !isFocused && inputText ? styles.text : undefined]}
      selectedTextStyle={styles.selectedText}
      itemContainerStyle={styles.itemContainer}
      iconColor={!isFocused ? styles.icon.color : styles.selectedIcon.color}
      value={value}
      data={data}
      valueField={valueField}
      labelField={labelField}
      placeholder={!isFocused ? inputText ?? placeholder ?? "" : inputText ?? "..."}
      search={true}
      searchPlaceholder="Search..."
      onFocus={() => focus()}
      onBlur={() => unfocus()}
      onChange={(item: Model) => {
        onChange(item);
        unfocus();
      }}
      renderLeftIcon={() => <DropDownIcon iconName={iconName} isFocused={isFocused} />}
      renderItem={renderItem}
      renderInputSearch={(onSearch) => (
        <DropDownBar
          showSelectAllCheckBox={false}
          data={data}
          valueField={valueField}
          labelField={labelField}
          search={search}
          searchPlaceholder="Search..."
          onSearch={onSearch}
        />
      )}
      {...rest}
    />
  );
};
