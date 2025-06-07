import { useState } from 'react';
import { View } from 'react-native';
import {
  ChevronDownIcon,
  ChevronRightIcon,
} from 'react-native-heroicons/solid';
import { Text } from 'react-native-paper';
import { useStyles } from '../../hooks';
import { getCollapsibleStyles } from '../../styles';
import type { CollapsibleProps } from '../../types/components';
import { isValidComponent } from '../../utils';
import { ButtonCustom } from '../ButtonCustom';
import { ScrollContainer } from '../ScrollContainer';

export const Collapsible = ({
  children,
  style,
  title,
  subTitle,
  isExpanded,
  onToggle,
}: CollapsibleProps) => {
  const { styles } = useStyles(getCollapsibleStyles);
  const [expanded, setExpanded] = useState(false);
  const isExpandedFinal = isExpanded ?? expanded;
  const numberOfLines = !isExpandedFinal ? 1 : undefined;
  const onPressRow = () => {
    setExpanded((prev) => {
      onToggle?.(!prev);
      return !prev;
    });
  };
  return (
    <View style={[styles.container, style]}>
      <ButtonCustom style={styles.row} onPress={onPressRow}>
        {!isExpandedFinal && (
          <ChevronRightIcon
            size={styles.icon.fontSize}
            color={styles.icon.color}
          />
        )}
        <Text numberOfLines={numberOfLines} style={styles.title}>
          {isExpandedFinal && (
            <ChevronDownIcon
              size={styles.icon.fontSize}
              color={styles.icon.color}
            />
          )}
          {title}
        </Text>
        {subTitle && (
          <Text numberOfLines={numberOfLines} style={styles.subTitle}>
            {subTitle}
          </Text>
        )}
      </ButtonCustom>

      {isExpandedFinal && children && (
        <ScrollContainer maxHeight={200}>
          {isValidComponent(children) ? children : <Text>{children}</Text>}
        </ScrollContainer>
      )}
    </View>
  );
};
