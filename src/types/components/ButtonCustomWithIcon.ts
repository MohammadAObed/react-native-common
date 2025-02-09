import type { ButtonCustomProps } from './ButtonCustom';
import type { PressableIconProps } from './PressableIcon';

export type ButtonCustomWithIconProps = ButtonCustomProps & {
  icons?: Icons[];
};

export type Icons = {
  name?: PressableIconProps['name'];
  mode?: PressableIconProps['iconMode'];
  style?: PressableIconProps['style'];
  size?: PressableIconProps['size'];
  onPress?: () => void;
};
