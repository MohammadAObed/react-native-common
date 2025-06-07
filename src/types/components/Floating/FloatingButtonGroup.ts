import type { GestureResponderEvent, ViewStyle } from 'react-native';
import type { FABGroupProps } from 'react-native-paper';
import type { FloatingContainerProps } from './FloatingContainer';

export type FloatingButtonGroupProps = {
  mode?: FloatingContainerProps['mode'];
  visible?: boolean;
  openIcon?: FABGroupProps['icon'];
  onPress?: (open: boolean, e: GestureResponderEvent) => void;
  onLongPress?: (open: boolean, e: GestureResponderEvent) => void;
  containerStyle?: ViewStyle;
} & Omit<
  FABGroupProps,
  | 'backdropColor'
  | 'onPress'
  | 'onLongPress'
  | 'open'
  | 'onStateChange'
  | 'visible'
>;
