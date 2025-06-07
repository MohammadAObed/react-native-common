import type { MD3Theme } from 'react-native-paper/src/types';
import type { ThemeColorsCommon } from './Colors';

export type ThemeCommon = Omit<MD3Theme, 'colors'> & {
  colors: ThemeColorsCommon;
};
