import type { ColorPickerProps } from 'react-native-wheel-color-picker';

export type ColorPickerCustomProps = ColorPickerProps & {
  value: string;
};

export type ColorProps = ColorPickerCustomProps & {
  onVisibilityChange?: (isVisible: boolean) => void;
  isVisible?: boolean;
};
