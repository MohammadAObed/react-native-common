// import {useStyles} from "../../hooks";
import { forwardRef } from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { useStyles } from "../hooks";
import { commonStyles, getButtonCustomModeStyles, getButtonCustomModeTextStyles, getButtonCustomStyles } from "../styles";
import type { ButtonCustomProps } from "../types/components";
import { isValidComponent } from "../utils";

export const ButtonCustom = forwardRef(
  (
    { children, textStyle, style, disabled, withRadius, applyDisabledStyle, mode = "bare", variant, ...rest }: ButtonCustomProps,
    ref: React.ForwardedRef<View>
  ) => {
    const { styles } = useStyles(getButtonCustomStyles);
    const { styles: modeStyles } = useStyles(getButtonCustomModeStyles);

    return (
      <TouchableOpacity
        ref={ref}
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
          <ButtonText textStyle={textStyle} mode={mode} disabled={disabled} variant={variant}>
            {children}
          </ButtonText>
        )}
      </TouchableOpacity>
    );
  }
);

export const ButtonText = ({ children, textStyle, disabled, variant, mode = "bare" }: ButtonCustomProps) => {
  const { styles: modeTextStyles } = useStyles(getButtonCustomModeTextStyles);

  return (
    <Text style={[modeTextStyles[mode], textStyle]} disabled={disabled} variant={variant}>
      {children}
    </Text>
  );
};
