import { useState } from "react";
import { View } from "react-native";
import { Checkbox, type CheckboxProps } from "react-native-paper";
import { useStyles } from "../../../hooks";
import { getDropDownCustomStyles } from "../../../styles";
import type { DropDownBarProps, TextInputCustomProps } from "../../../types/components";
import { TextInputCustom } from "../TextInputCustom";

export const DropDownBar = <T,>({
  searchPlaceholder,
  data,
  valueField,
  labelField,
  showSelectAllCheckBox,
  search,
  onSeletAllCheckBoxChange,
  onSearch,
}: DropDownBarProps<T>) => {
  const { styles } = useStyles(getDropDownCustomStyles);
  const [text, setText] = useState("");
  const [selectAllstatus, setSelectAllstatus] = useState<CheckboxProps["status"]>("unchecked");

  const onChangeText: TextInputCustomProps["onChangeText"] = (newText) => {
    setText(() => newText);
    onSearch(newText);
  };

  const onSelectAll = () => {
    setSelectAllstatus((prev) => {
      const status = prev !== "checked" ? "checked" : "unchecked";
      let selectedValues: string[] = [];
      if (status === "checked") {
        selectedValues = data.filter((x) => !text || x[labelField]!.toString().mIncludes(text)).map((x) => x[valueField]!.toString());
      }
      onSeletAllCheckBoxChange?.(selectedValues);
      return status;
    });
  };

  if (!search && !showSelectAllCheckBox) return;

  return (
    <View style={styles.dropDownBarContainer}>
      {search && <TextInputCustom style={styles.inputSearchCustom} value={text} onChangeText={onChangeText} placeholder={searchPlaceholder} />}
      {showSelectAllCheckBox && (
        <View style={styles.selectAllCheckboxContainer}>
          <Checkbox status={selectAllstatus} onPress={onSelectAll} />
        </View>
      )}
    </View>
  );
};
