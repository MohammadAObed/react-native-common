import { useState } from 'react';
import { View } from 'react-native';
import { useStyles } from '../../hooks';
import { getCollapsibleListStyles } from '../../styles';
import type { CollapsibleListProps } from '../../types/components';
import { Collapsible } from '../Collapsible/Collapsible';
import { ScrollContainer } from '../ScrollContainer';

export const CollapsibleList = <T,>({
  data,
  itemStyle,
  maxHeight,
  titleKey,
  subTitleKey,
  behavior = 'multi-expand',
  renderItem,
  renderChild,
}: CollapsibleListProps<T>) => {
  const { styles } = useStyles(getCollapsibleListStyles);
  const [expandedIndex, setExpandedIndex] = useState<number>();

  return (
    <ScrollContainer maxHeight={maxHeight} style={styles.scrollContainer}>
      {data.map((item, index) => (
        <View key={index} style={styles.container}>
          {renderItem ? (
            renderItem(item)
          ) : (
            <Collapsible
              style={itemStyle}
              onToggle={() =>
                setExpandedIndex((prev) => (prev === index ? undefined : index))
              }
              isExpanded={
                behavior === 'single-expand'
                  ? index === expandedIndex
                  : undefined
              }
              title={item[titleKey] as string}
              subTitle={item[subTitleKey] as string}
            >
              {renderChild?.(item)}
            </Collapsible>
          )}
        </View>
      ))}
    </ScrollContainer>
  );
};
