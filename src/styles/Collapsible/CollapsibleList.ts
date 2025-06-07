import { StyleSheet } from 'react-native';
import { type MD3Theme } from 'react-native-paper';

export const getCollapsibleListStyles = (_theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    scrollContainer: { width: '100%' },
  });
