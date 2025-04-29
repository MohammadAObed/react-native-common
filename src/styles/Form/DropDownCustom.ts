import { StyleSheet } from "react-native";
import { type MD3Theme } from "react-native-paper";
import { DEFAULT_FONT_SIZE, HIGHEST_ZINDEX, SMALL_FONT_SIZE } from "../../constants";

export const getDropDownCustomStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    label: {
      position: "absolute",
      top: 5,
      zIndex: HIGHEST_ZINDEX,
      paddingHorizontal: 18,
      fontSize: SMALL_FONT_SIZE,
      color: theme.colors.onSurfaceVariant,
    },
    focusedLabel: {
      color: theme.colors.primary,
    },
    container: {
      backgroundColor: theme.colors.elevation.level2,
    },
    dropdownContainer: {
      minWidth: 120,
      marginTop: -20,
    },
    dropdown: {
      height: 55,
      paddingTop: 15,
      borderColor: theme.colors.outline,
      borderBottomWidth: 0.5,
      paddingHorizontal: 8,
    },
    placeholder: {
      color: theme.colors.onSurfaceVariant,
      fontSize: DEFAULT_FONT_SIZE,
      marginRight: -7,
    },
    text: {
      fontSize: DEFAULT_FONT_SIZE,
      color: theme.colors.onSurface,
    },
    selectedText: {
      color: theme.colors.primary,
    },
    icon: {
      marginRight: 5,
      color: theme.colors.onSurfaceVariant,
    },
    selectedIcon: {
      color: theme.colors.primary,
    },
    itemContainer: {
      backgroundColor: theme.colors.surface,
    },
    item: {
      paddingHorizontal: 17,
      paddingVertical: 16,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    selectedItem: {
      backgroundColor: theme.colors.elevation.level2,
    },
    dummyTextForDynamicWidth: {
      paddingHorizontal: 16,
      opacity: 0,
      marginTop: -20,
      maxHeight: 20,
      fontSize: DEFAULT_FONT_SIZE,
      zIndex: -1,
    },
    disabledItem: {
      opacity: 0.5,
    },
    dropDownBarContainer: {
      justifyContent: "center",
      height: 55,
      backgroundColor: theme.colors.surface,
    },
    inputSearchCustom: {
      height: 55,
      fontSize: DEFAULT_FONT_SIZE,
      color: theme.colors.onSurfaceVariant,
    },
    selectAllCheckboxContainer: {
      position: "absolute",
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
      backgroundColor: "transparent",
    },
  });
