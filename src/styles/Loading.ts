import { StyleSheet } from 'react-native';
import { type MD3Theme } from 'react-native-paper';
import { SECONDARY_HIGH_OPACITY, SECONDARY_MEDIUM_OPACITY } from '../constants';

export const getLoadingStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    modalBackground: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: `${theme.colors.background}${SECONDARY_HIGH_OPACITY}`,
    },
    indicator: {
      backgroundColor: 'white',
      color: theme.colors.primary,
      shadowColor: `${theme.colors.secondary}${SECONDARY_MEDIUM_OPACITY}`,
      elevation: 15,
      padding: 12,
      borderRadius: 15,
    },
  });
