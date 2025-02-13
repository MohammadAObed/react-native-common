import AntDesign from '@expo/vector-icons/AntDesign';
import { useStyles } from '../../../hooks';
import { getDropDownCustomStyles } from '../../../styles';
import type { DropDownComponentsProps } from '../../../types/components';

export const DropDownIcon = ({
  iconName,
  isFocused,
}: DropDownComponentsProps) => {
  const { styles } = useStyles(getDropDownCustomStyles);
  return (
    <>
      <AntDesign
        style={[styles.icon, isFocused && styles.selectedIcon]}
        name={iconName}
        size={20}
      />
    </>
  );
};
