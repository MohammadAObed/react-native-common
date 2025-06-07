import { useTheme } from 'react-native-paper';
import type { ThemeCommon } from '../types/theme';

export function useThemeCommon() {
  const theme = useTheme() as ThemeCommon;
  return theme;
}
