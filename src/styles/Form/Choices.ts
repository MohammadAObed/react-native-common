import { StyleSheet } from 'react-native';
import { type MD3Theme } from 'react-native-paper';
import { DEFAULT_FONT_SIZE, SECONDARY_MEDIUM_OPACITY } from '../../constants';

export const getChoicesStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      flexWrap: 'wrap',
    },
    option: {
      paddingVertical: 9,
    },
    selectedOption: {
      backgroundColor: theme.colors.primary,
    },
    disabledOption: {
      borderColor: `${theme.colors.secondary}${SECONDARY_MEDIUM_OPACITY}`,
      color: `${theme.colors.secondary}${SECONDARY_MEDIUM_OPACITY}`,
    },

    containerWithClearButton: {
      width: 'auto',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 5,
    },
    text: {
      fontSize: DEFAULT_FONT_SIZE,
      color: theme.colors.background,
    },
  });
