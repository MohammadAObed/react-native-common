import { StyleSheet } from 'react-native';
import { type MD3Theme } from 'react-native-paper';
import {
  DEFAULT_FONT_SIZE,
  FORM_BACKGROUND_OPACITY,
  FORM_LABEL_OPACITY,
  SECONDARY_HIGH_OPACITY,
  SECONDARY_MEDIUM_OPACITY,
} from '../../constants';

export const getTextInputCustomStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    input: {
      backgroundColor: 'transparent',
      color: theme.colors.onSurface,
      fontSize: DEFAULT_FONT_SIZE * 1.0714,
    },
    inputLabel: {
      color: `${theme.colors.secondary}${FORM_LABEL_OPACITY}`,
      fontSize: DEFAULT_FONT_SIZE,
    },
    activeInputLabel: {
      color: `${theme.colors.primary}${SECONDARY_HIGH_OPACITY}`,
    },
    placeholderColor: {
      color: `${theme.colors.secondary}${SECONDARY_MEDIUM_OPACITY}`,
    },
    underlineColor: {
      color: `${theme.colors.secondary}${SECONDARY_MEDIUM_OPACITY}`,
    },
    activeUnderlineColor: {
      color: theme.colors.primary,
    },
  });

export const getTextInputCustomModeStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    form: {
      backgroundColor: `${theme.colors.secondary}${FORM_BACKGROUND_OPACITY}`,
    },
    text: {
      backgroundColor: 'transparent',
    },
  });
