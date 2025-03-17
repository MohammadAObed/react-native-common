import { forwardRef } from "react";
import { ScrollView } from "react-native";
import { useStyles } from "../hooks";
import { getScrollContainerStyles } from "../styles";
import type { ScrollContainerProps } from "../types/components";

//we use it because if the keyboard is visible, and we click on a scroll component, the keyboard disappear, a view does not do this
export const ScrollContainer = forwardRef(
  ({ children, style, contentContainerStyle, maxHeight, ...rest }: ScrollContainerProps, ref: React.ForwardedRef<ScrollView>) => {
    const { styles } = useStyles(getScrollContainerStyles);
    return (
      <ScrollView
        ref={ref}
        style={[styles.container, maxHeight ? { maxHeight } : {}, style]}
        contentContainerStyle={[styles.contentContainer, maxHeight ? { minHeight: "auto" } : {}, contentContainerStyle]}
        {...rest}
      >
        {children}
      </ScrollView>
    );
  }
);
