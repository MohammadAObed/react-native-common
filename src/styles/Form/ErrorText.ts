import { StyleSheet } from 'react-native';
import { type MD3Theme } from 'react-native-paper';
import { DEFAULT_FONT_SIZE } from '../../constants';
import { getFormRowStyles } from './FormRow';

export const getErrorTextStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal:
        getFormRowStyles(theme).formRowContainer.paddingHorizontal,
    },
    errorText: {
      color: theme.colors.error,
      fontSize: DEFAULT_FONT_SIZE,
    },
  });
