import { useMemo } from 'react';
import { type MD3Theme, useTheme } from 'react-native-paper';

export function useStyles<T, P>(
  getStyles: (theme: MD3Theme) => T,
  ...dependencies: P[]
): { styles: T; theme: MD3Theme } {
  const theme = useTheme();
  const styles = useMemo(
    () => getStyles(theme),
    [theme.colors, ...dependencies]
  ); // [theme.colors] might not work... instead: [theme.dark]
  return { styles, theme };
}
