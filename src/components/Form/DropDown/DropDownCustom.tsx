import { useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { useStyles } from "../../../hooks";
import { getDropDownCustomStyles, getDropDownCustomVariantStyles } from "../../../styles";
import type { DropDownCustomProps, DropDownLabelField, DropDownValueField } from "../../../types/components";
import { DropDownMultiSelect } from "./DropDownMultiSelect";
import { DropDownSingleSelect } from "./DropDownSingleSelect";

export const DropDownCustom = <Model, Value extends DropDownValueField = number>({
  style,
  wrapperStyle,
  isMultiSelect,
  label,
  valueField,
  labelField,
  data,
  value,
  placeholder,
  variant = "plain",
  seperator = ", ",
  text,
  orderByValue,
  disabledValues,
  allowEmpty,
  fullWidth,
  onChange,
  ...rest
}: DropDownCustomProps<Model, Value>) => {
  const { styles } = useStyles(getDropDownCustomStyles);
  const { styles: variantStyles } = useStyles(getDropDownCustomVariantStyles);
  const [isFocused, setIsFocused] = useState(false);

  let orderedData = data;
  if (orderByValue && value) {
    orderedData = data.mOrderBy((x) => value.indexOf(x[valueField] as Value));
  }

  const multiSelectValue = isMultiSelect ? value?.map((x) => x?.toString() ?? "") : [];
  const singleSelectValue = !isMultiSelect ? value?.toString() : "";

  const onMultiChangeValue = (keys: string[]) => {
    if (!isMultiSelect) return;
    if (data.length === 0) return;
    const typeofDataKey = typeof data[0]![valueField];
    let values = (
      typeofDataKey === "string" ? keys : typeofDataKey === "bigint" ? keys.map((x) => BigInt(x)) : keys.map((x) => parseInt(x))
    ) as Value[];
    if (disabledValues?.includes(values.mLast()!)) return;
    const deletedValue = value.find((val) => !values.includes(val));
    const newValue = deletedValue === undefined ? values.mLast() : undefined;
    onChange({ values, deletedValue, newValue });
  };

  const onSingleChangeValue = (item: Model) => {
    if (isMultiSelect) return;
    const itemKey = item[valueField] as NonNullable<Value>;
    if (disabledValues?.includes(itemKey)) return; //does not work for now, but multi does!
    if (allowEmpty) {
      onChange(itemKey === value ? undefined : itemKey);
    } else {
      onChange(itemKey);
    }
  };

  const focus = () => setIsFocused(() => true);
  const unfocus = () => setIsFocused(() => false);

  let selectedText = text;
  if (!text) {
    selectedText = data.find((x) => x[valueField] === value)?.[labelField] as DropDownLabelField | undefined;
    if (isMultiSelect) {
      let selectedItems = data.filter((x) => value?.includes(x[valueField] as Value));
      selectedText = selectedItems.map((x) => x[labelField]).join(seperator);
    }
    if (!selectedText) selectedText = placeholder;
  }
  const props = {
    style: [variantStyles[variant], style],
    data: orderedData,
    isFocused,
    focus,
    unfocus,
    valueField,
    labelField,
    placeholder,
    text,
    disabledValues,
  };
  return (
    <View style={[styles.container, variantStyles[variant], fullWidth ? { alignSelf: "stretch" } : {}, wrapperStyle]}>
      <Text style={[styles.label, isFocused && styles.focusedLabel]}>{label}</Text>
      <Text variant="bodyMedium" style={[styles.placeholder, styles.dummyTextForDynamicWidth]}>
        {selectedText}
      </Text>
      {isMultiSelect ? (
        <DropDownMultiSelect value={multiSelectValue} onChange={onMultiChangeValue} seperator={seperator} {...props} {...rest} />
      ) : (
        <DropDownSingleSelect value={singleSelectValue} onChange={onSingleChangeValue} {...props} {...rest} />
      )}
    </View>
  );
};
