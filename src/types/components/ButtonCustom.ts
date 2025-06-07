import type { TextStyle, TouchableOpacityProps } from 'react-native';
import type { TextProps } from 'react-native-paper';

export type ButtonCustomProps = TouchableOpacityProps & {
  mode?: 'text' | 'plain' | 'contained' | 'text-shadow';
  textStyle?: TextStyle;
  withRadius?: boolean;
  applyDisabledStyle?: boolean;
  variant?: TextProps<string>['variant'];
};
