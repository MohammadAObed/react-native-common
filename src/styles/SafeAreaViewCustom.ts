import { StyleSheet } from 'react-native';
import { type MD3Theme } from 'react-native-paper';

export const getSafeAreaViewCustomStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    safeAreaView: {
      flex: 1,
      paddingHorizontal: 5,
      backgroundColor: theme.colors.background,
    },
  });
