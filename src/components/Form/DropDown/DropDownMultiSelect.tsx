import { useStyles } from '../../../hooks';
import { DropDownBugHelper } from '../../../libs/Bugs';
import { getDropDownCustomStyles } from '../../../styles';
import type {
  DropDownMultiProps,
  DropDownSingleAndMultiProps,
  DropDownValueField,
} from '../../../types/components';
// import React from "react";
import { MultiSelect } from 'react-native-element-dropdown';
import type { MultiSelectProps } from 'react-native-element-dropdown/lib/typescript/components/MultiSelect/model';
import { DropDownBar } from './DropDownBar';
import { DropDownIcon } from './DropDownIcon';
import { DropDownItem } from './DropDownItem';

export const DropDownMultiSelect = <Model,>({
  style,
  data,
  value,
  valueField,
  labelField,
  placeholder,
  iconName,
  seperator,
  text,
  disabledValues,
  isFocused,
  search,
  showSelectAllCheckBox,
  focus,
  unfocus,
  onChange,
  renderItemProps,
  ...rest
}: MultiSelectProps<Model> &
  DropDownMultiProps &
  DropDownSingleAndMultiProps<Model>) => {
  const { styles } = useStyles(getDropDownCustomStyles);

  let selectedItems = data.filter((x) =>
    value?.includes(x[valueField]?.toString() ?? '')
  );

  let inputText: string | null =
    text ?? selectedItems.map((x) => x[labelField]).join(seperator);
  if (inputText === '') inputText = null;

  const renderItem = (item: Model) => {
    const itemKey = item[valueField] as DropDownValueField;
    const isFocused = value?.includes(itemKey?.toString() ?? '');
    const props = renderItemProps?.(item, isFocused ?? false);
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

  return (
    <MultiSelect
      style={[styles.dropdown, style]}
      placeholderStyle={[
        styles.placeholder,
        !isFocused && inputText ? styles.text : undefined,
      ]}
      selectedTextStyle={styles.selectedText}
      itemContainerStyle={styles.itemContainer}
      containerStyle={styles.dropdownContainer}
      data={data}
      value={value}
      valueField={valueField}
      labelField={labelField}
      placeholder={
        !isFocused ? (inputText ?? placeholder ?? '') : (inputText ?? '...')
      }
      search={true}
      onBlur={() => unfocus()}
      onFocus={() => focus()}
      onChange={(allValues) => {
        allValues = DropDownBugHelper.HandleMultiSelectOnChangeParam(allValues);
        if (value && value.length > 0) {
          const unSelectValues = allValues.vGetDuplicates();
          allValues = allValues.filter(
            (item) => !unSelectValues.includes(item)
          );
        }
        onChange(allValues);
      }}
      renderLeftIcon={() => (
        <DropDownIcon iconName={iconName} isFocused={isFocused} />
      )}
      renderItem={renderItem}
      renderInputSearch={(onSearch) => (
        <DropDownBar
          data={data}
          onChange={onChange}
          valueField={valueField}
          labelField={labelField}
          showSelectAllCheckBox={showSelectAllCheckBox}
          search={search}
          searchPlaceholder="Search..."
          onSearch={onSearch}
        />
      )}
      {...rest}
    />
  );
};
