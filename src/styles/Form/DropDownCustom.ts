import { StyleSheet } from 'react-native';
import { type MD3Theme } from 'react-native-paper';
import {
  DEFAULT_FONT_SIZE,
  FORM_LABEL_OPACITY,
  HIGHEST_ZINDEX,
  SECONDARY_HIGH_OPACITY,
  SECONDARY_LOW_OPACITY,
  SECONDARY_MEDIUM_OPACITY,
  SMALL_FONT_SIZE,
} from '../../constants';

export const getDropDownCustomStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    label: {
      color: `${theme.colors.secondary}${FORM_LABEL_OPACITY}`,
      position: 'absolute',
      top: 5,
      zIndex: HIGHEST_ZINDEX,
      paddingHorizontal: 18,
      fontSize: SMALL_FONT_SIZE,
    },
    focusedLabel: {
      color: theme.colors.primary,
    },
    container: {
      backgroundColor: `${theme.colors.secondary}${SECONDARY_LOW_OPACITY}`,
    },
    dropdownContainer: {
      minWidth: 120,
    },
    dropdown: {
      height: 55,
      paddingTop: 15,
      borderColor: `${theme.colors.secondary}${SECONDARY_MEDIUM_OPACITY}`,
      borderBottomWidth: 0.5,
      paddingHorizontal: 8,
    },
    placeholder: {
      color: `${theme.colors.secondary}${SECONDARY_HIGH_OPACITY}`,
      fontSize: DEFAULT_FONT_SIZE,
      marginRight: -7,
    },
    text: {
      fontSize: DEFAULT_FONT_SIZE,
    },
    selectedText: {
      color: theme.colors.primary,
    },
    inputSearch: {
      height: 40,
      fontSize: DEFAULT_FONT_SIZE,
    },
    icon: {
      marginRight: 5,
      color: theme.colors.secondary,
    },
    selectedIcon: {
      color: theme.colors.primary,
    },
    itemContainer: {
      backgroundColor: theme.colors.background,
    },
    item: {
      paddingHorizontal: 17,
      paddingVertical: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    selectedItem: {
      backgroundColor: `${theme.colors.secondary}${SECONDARY_LOW_OPACITY}`,
    },
    dummyTextForDynamicWidth: {
      paddingHorizontal: 16,
      opacity: 0,
      marginTop: -20,
      maxHeight: 20,
      fontSize: DEFAULT_FONT_SIZE,
    },
    disabledItem: {
      opacity: 0.5,
    },
    dropDownBarContainer: {
      justifyContent: 'center',
      height: 55,
    },
    inputSearchCustom: {
      height: 55,
      fontSize: DEFAULT_FONT_SIZE,
    },
    selectAllCheckboxContainer: {
      position: 'absolute',
      right: 14,
    },
  });

export const getDropDownCustomModeStyles = () =>
  StyleSheet.create({
    normal: {},
    bare: {
      paddingTop: 0,
      paddingBottom: 0,
      paddingHorizontal: 0,
      borderBottomWidth: 0,
      backgroundColor: 'transparent',
      zIndex: -1, //this is for Build Label eye icon in ItemsEventsTab.tsx -> Build.tsx -> BuildLabel.tsx
    },
  });
