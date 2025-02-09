import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useStyles } from '../../../hooks';
import { getDropDownCustomStyles } from '../../../styles';
import type {
  DropDownItemProps,
  DropDownLabelField,
} from '../../../types/components';
import { DropDownIcon } from './DropDownIcon';

export const DropDownItem = <Model,>({
  style,
  children,
  item,
  labelField,
  iconName,
  isFocused,
  disabled,
  ...rest
}: DropDownItemProps<Model>) => {
  const { styles } = useStyles(getDropDownCustomStyles);

  return (
    <View
      style={[
        styles.item,
        isFocused && styles.selectedItem,
        disabled && styles.disabledItem,
        style,
      ]}
      {...rest}
    >
      <Text style={[styles.text, isFocused && styles.selectedText]}>
        {item[labelField] as DropDownLabelField}
      </Text>
      <DropDownIcon iconName={iconName} isFocused={isFocused} />
      {children}
    </View>
  );
};
