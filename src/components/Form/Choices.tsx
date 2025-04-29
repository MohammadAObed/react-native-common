import { cloneElement, isValidElement } from "react";
import { View } from "react-native";
import { useStyles } from "../../hooks";
import { getChoicesStyles } from "../../styles";
import type { ChoicesProps, ChoiceValueField, DynamicProps } from "../../types/components";
import { getValues } from "../../utils";
import { ButtonCustomWithIcon } from "../ButtonCustomWithIcon";

export const Choices = <Model extends DynamicProps, Value extends ChoiceValueField = number>({
  isMultiSelect,
  style,
  containerStyle,
  valueField = "value" as keyof Model,
  labelField = "label" as keyof Model,
  data,
  value,
  allowEmpty,
  disabledValues,
  icons,
  onChange,
  getProps,
}: ChoicesProps<Model, Value>) => {
  const { styles } = useStyles(getChoicesStyles);

  const onChangeValue = (itemValue: NonNullable<Value>) => {
    if (isMultiSelect) {
      const values =
        itemValue === undefined
          ? []
          : !value.includes(itemValue)
          ? [...value, itemValue]
          : allowEmpty || value.length > 1
          ? value.filter((x) => x !== itemValue)
          : value;
      const deletedValue = value.find((val) => !values.includes(val));
      const newValue = deletedValue === undefined ? values.mLast() : undefined;
      onChange({ values, deletedValue, newValue });
    } else {
      if (allowEmpty) {
        const newValue = value !== itemValue ? itemValue : undefined;
        onChange(newValue);
      } else {
        onChange(itemValue);
      }
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {getValues(data).map((dataItem) => {
        const itemValue = dataItem[valueField] as NonNullable<Value>;
        const itemLabel = dataItem[labelField] as React.ReactNode;
        const isSelected = isMultiSelect ? value.includes(itemValue) : value === itemValue;
        const label = dataItem.props && isValidElement(itemLabel) ? cloneElement(itemLabel, { ...dataItem.props }) : itemLabel;
        const props = getProps?.(dataItem);

        return (
          <ButtonCustomWithIcon
            key={itemValue}
            style={[styles.option, isSelected && styles.selectedOption, style]}
            textStyle={isSelected ? styles.selectedText : undefined}
            mode={isSelected ? "button" : "text"}
            withRadius
            disabled={disabledValues?.includes(itemValue)}
            onPress={() => onChangeValue(itemValue)}
            icons={isSelected ? icons : undefined}
            {...props}
          >
            {label}
          </ButtonCustomWithIcon>
        );
      })}
    </View>
  );
};
