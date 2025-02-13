import { useStyles } from '../hooks';
import { getFloatingContainerModeStyles, getFloatingContainerStyles } from '../styles';
import type { FloatingContainerProps } from '../types/components/FloatingContainer';
import { SafeAreaViewCustom } from './SafeAreaViewCustom';

export const FloatingContainer = ({ children, style, mode = 'topRight' }: FloatingContainerProps) => {
  const { styles } = useStyles(getFloatingContainerStyles);
  const { styles: modeStyles } = useStyles(getFloatingContainerModeStyles);
  return (
    <SafeAreaViewCustom style={[styles.container, modeStyles[mode], style]}>{children}</SafeAreaViewCustom>
  );
};
