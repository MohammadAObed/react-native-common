import { SafeAreaViewCustom } from "../../components";
import { useStyles } from "../../hooks";
import { getFloatingContainerModeStyles, getFloatingContainerStyles } from "../../styles";
import type { FloatingContainerProps } from "../../types/components";

export const FloatingContainer = ({ children, style, mode = "bottom-right" }: FloatingContainerProps) => {
  const { styles } = useStyles(getFloatingContainerStyles);
  const { styles: modeStyles } = useStyles(getFloatingContainerModeStyles);
  return <SafeAreaViewCustom style={[styles.container, modeStyles[mode], style]}>{children}</SafeAreaViewCustom>;
};
