import { useMemo } from 'react';
import { useThemeCommon } from '../hooks/useThemeCommon';
import type { ThemeCommon } from '../types/theme';

export function useStyles<T, P>(
  getStyles: (theme: ThemeCommon) => T,
  ...dependencies: P[]
): { styles: T; theme: ThemeCommon } {
  const theme = useThemeCommon();
  const styles = useMemo(
    () => getStyles(theme),
    [theme.colors, ...dependencies]
  ); // [theme.colors] might not work... instead: [theme.dark]
  return { styles, theme };
}
