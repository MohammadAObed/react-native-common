import { StyleSheet } from 'react-native';
import { type MD3Theme } from 'react-native-paper';
import { SECONDARY_MEDIUM_OPACITY } from '../constants';

export const getPopupStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    shade: {
      flex: 1,
      backgroundColor: `${theme.colors.secondary}${SECONDARY_MEDIUM_OPACITY}`,
    },
    centeredContainer: {
      alignItems: 'center',
    },
    Button: {
      alignSelf: 'stretch',
    },
    invisibleContainer: {
      position: 'absolute',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
    contentContainer: {
      width: '102%',
      gap: 15,
      backgroundColor: theme.colors.background,
      borderRadius: 10,
      padding: 20,
    },
    cancelButton: {
      position: 'absolute',
      top: 0,
      right: 5,
      color: theme.colors.secondary,
    },
    title: {},
  });
