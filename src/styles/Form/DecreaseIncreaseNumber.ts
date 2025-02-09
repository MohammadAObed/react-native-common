import { StyleSheet } from 'react-native';
import { type MD3Theme } from 'react-native-paper';
import { LARGE_FONT_SIZE } from '../../constants';

export const getDecreaseIncreaseNumberStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 7,
    },
    containerWithInput: {
      gap: 0,
    },
    label: {
      color: theme.colors.primary,
      fontSize: LARGE_FONT_SIZE,
    },
    inputContentStyle: {
      color: theme.colors.primary,
      textAlign: 'center',
      fontSize: LARGE_FONT_SIZE,
    },
  });
