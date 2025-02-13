import {
  DevicePhoneMobileIcon,
  EyeIcon,
  EyeSlashIcon,
  FlagIcon,
  MinusCircleIcon,
  MinusIcon,
  PlayIcon,
  PlusCircleIcon,
  PlusIcon,
  StarIcon,
  TrashIcon,
  XMarkIcon,
} from 'react-native-heroicons/solid';
import { useStyles } from '../hooks';
import { getPressableIconStyles } from '../styles';
import type { PressableIconProps } from '../types/components';
import { ButtonCustom } from './ButtonCustom';

export const PressableIcon = ({
  children,
  style,
  name,
  disabled,
  color,
  size = 35,
  iconMode = 'circle',
  ...rest
}: PressableIconProps) => {
  const { styles } = useStyles(getPressableIconStyles);

  const IconColor =
    color ?? (disabled ? styles.disabledIcon.color : styles.icon.color);

  return (
    <ButtonCustom style={style} disabled={disabled} {...rest}>
      {name === 'plus' ? (
        <>
          {iconMode === 'circle' && (
            <PlusCircleIcon color={IconColor} size={size} />
          )}
          {iconMode === 'bare' && <PlusIcon color={IconColor} size={size} />}
        </>
      ) : name === 'minus' ? (
        <>
          {iconMode === 'circle' && (
            <MinusCircleIcon color={IconColor} size={size} />
          )}
          {iconMode === 'bare' && <MinusIcon color={IconColor} size={size} />}
        </>
      ) : name === 'trash' ? (
        <>
          <TrashIcon color={IconColor} size={size} />
        </>
      ) : name === 'xmark' ? (
        <>
          <XMarkIcon color={IconColor} size={size} />
        </>
      ) : name === 'eye' ? (
        <>
          <EyeIcon color={IconColor} size={size} />
        </>
      ) : name === 'eye-dropper' ? (
        <>
          <EyeSlashIcon color={IconColor} size={size} />
        </>
      ) : name === 'device' ? (
        <>
          <DevicePhoneMobileIcon color={IconColor} size={size} />
        </>
      ) : name === 'landscape-device' ? (
        <>
          <DevicePhoneMobileIcon
            color={IconColor}
            size={size}
            style={styles.landscapeDevice}
          />
        </>
      ) : name === 'star' ? (
        <>
          <StarIcon color={IconColor} size={size} />
        </>
      ) : name === 'play' ? (
        <>
          <PlayIcon color={IconColor} size={size} />
        </>
      ) : name === 'Flag' ? (
        <>
          <FlagIcon color={IconColor} size={size} />
        </>
      ) : (
        ''
      )}
      {children}
    </ButtonCustom>
  );
};
