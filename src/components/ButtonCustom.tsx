// import {useStyles} from "../../hooks";
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { useStyles } from '../hooks';
import {
  commonStyles,
  getButtonCustomModeStyles,
  getButtonCustomModeTextStyles,
  getButtonCustomStyles,
} from '../styles';
import type { ButtonCustomProps } from '../types/components';
import { isValidComponent } from '../utils';

export const ButtonCustom = ({
  children,
  textStyle,
  style,
  disabled,
  withRadius,
  applyDisabledStyle,
  mode = 'bare',
  ...rest
}: ButtonCustomProps) => {
  const { styles } = useStyles(getButtonCustomStyles);
  const { styles: modeStyles } = useStyles(getButtonCustomModeStyles);

  return (
    <TouchableOpacity
      style={[
        styles.button,
        modeStyles[mode],
        withRadius && styles.withRadius,
        applyDisabledStyle && disabled ? commonStyles.disabledButton : {},
        style,
      ]}
      {...rest}
      disabled={disabled}
    >
      {isValidComponent(children) ? (
        children
      ) : (
        <ButtonText textStyle={textStyle} mode={mode} disabled={disabled}>
          {children}
        </ButtonText>
      )}
    </TouchableOpacity>
  );
};

export const ButtonText = ({
  children,
  textStyle,
  disabled,
  mode = 'bare',
}: ButtonCustomProps) => {
  const { styles } = useStyles(getButtonCustomStyles);
  const { styles: modeTextStyles } = useStyles(getButtonCustomModeTextStyles);

  return (
    <Text
      style={[styles.text, modeTextStyles[mode], textStyle]}
      disabled={disabled}
    >
      {children}
    </Text>
  );
};
