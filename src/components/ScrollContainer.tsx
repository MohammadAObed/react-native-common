import { forwardRef } from 'react';
import { ScrollView, type ScrollViewProps } from 'react-native';
import { useStyles } from '../hooks';
import { getScrollContainerStyles } from '../styles';

//we use it because if the keyboard is visible, and we click on a scroll component, the keyboard disappear, a view does not do this
export const ScrollContainer = forwardRef(
  ({ children }: ScrollViewProps, ref: React.ForwardedRef<ScrollView>) => {
    const { styles } = useStyles(getScrollContainerStyles);
    return (
      <ScrollView
        ref={ref}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {children}
      </ScrollView>
    );
  }
);
