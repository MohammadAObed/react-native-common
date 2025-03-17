import { ButtonCustom, ButtonText } from "../components";
import { useStyles } from "../hooks";
import { getButtonCustomModeTextStyles, getButtonCustomStyles } from "../styles";
import type { ButtonCustomWithIconProps } from "../types/components";
import { isValidComponent } from "../utils";
import { PressableIcon } from "./PressableIcon";

export const ButtonCustomWithIcon = ({ textStyle, children, disabled, mode = "bare", icons, onPress, ...rest }: ButtonCustomWithIconProps) => {
  const { styles } = useStyles(getButtonCustomStyles);
  const { styles: modeTextStyles } = useStyles(getButtonCustomModeTextStyles);
  return (
    <ButtonCustom mode={mode} disabled={disabled} onPress={onPress} {...rest}>
      <>
        {isValidComponent(children) ? (
          children
        ) : (
          <ButtonText textStyle={textStyle} mode={mode} disabled={disabled}>
            {children}
          </ButtonText>
        )}
        {icons?.map((icon, index) => (
          <PressableIcon
            key={index}
            name={icon.name}
            iconMode={icon.mode ?? "bare"}
            onPress={icon.onPress ?? onPress}
            size={icon.size ?? styles.text.fontSize * 1.8}
            color={modeTextStyles[mode].color}
            style={icon.style}
          />
        ))}
      </>
    </ButtonCustom>
  );
};
