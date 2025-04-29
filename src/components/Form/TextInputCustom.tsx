import { useState } from "react";
import { Text, TextInput } from "react-native-paper";
import { DEFAULT_DECIMAL_PLACES } from "../../constants";
import { checkAllowedExactText } from "../../helpers";
import { useInputHandlers, useStyles } from "../../hooks";
import { PaperBugHelper } from "../../libs/Bugs";
import { getTextInputCustomModeStyles, getTextInputCustomStyles } from "../../styles";
import type { TextInputCustomProps } from "../../types/components";

export const TextInputCustom = ({
  style,
  underlineStyle,
  underlineColor,
  textColor,
  value,
  label,
  placeholder,
  modeCustom,
  inputMode,
  disabled,
  minValue = 0,
  maxValue = Number.MAX_SAFE_INTEGER,
  decimalPlaces = DEFAULT_DECIMAL_PLACES,
  textForceUpdateCounter = 0,
  onFocus,
  onBlur,
  onChangeText,
  onChangeNumber,
  onChangeDecimal,
  ...rest
}: TextInputCustomProps) => {
  const { styles, theme } = useStyles(getTextInputCustomStyles);
  const { styles: modeStyles } = useStyles(getTextInputCustomModeStyles);
  const [isActive, setIsActive] = useState(false);
  const { inputText, setInputText, handleOnChangeDecimal, handleOnChangeNumber, handleOnChangeText } = useInputHandlers({
    value,
    decimalPlaces,
    minValue,
    maxValue,
    onChangeDecimal,
    onChangeNumber,
    onChangeText,
    textForceUpdateCounter,
  });

  const themeDisabled = {
    ...theme,
    colors: {
      ...theme.colors,
      onSurfaceDisabled: modeCustom === "text" ? "transparent" : theme.colors.onSurfaceDisabled, //if input is disabled, then underline is always showing
    },
  };
  return (
    <TextInput
      style={[styles.input, modeCustom && modeStyles[modeCustom], style]}
      textColor={PaperBugHelper.GetTextInputColor(inputText, placeholder, styles.placeholderColor.color, textColor, styles.input.color)}
      underlineColor={underlineColor ?? styles.underlineColor.color}
      placeholderTextColor={styles.placeholderColor.color}
      theme={themeDisabled}
      label={
        label && (
          <Text style={[styles.inputLabel, { color: textColor ?? isActive ? styles.activeInputLabel.color : styles.input.color }]}>{label}</Text>
        )
      }
      placeholder={placeholder}
      value={PaperBugHelper.GetTextInputValue(isActive, inputText, placeholder)}
      inputMode={inputMode}
      disabled={disabled}
      onFocus={(e) => {
        setIsActive(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setIsActive(false);
        if (checkAllowedExactText(inputMode ?? "") && (inputMode === "decimal" || inputMode === "numeric") && minValue !== undefined) {
          setInputText(minValue.toString());
        }
        onBlur?.(e);
      }}
      onChangeText={(text) =>
        onChangeText
          ? handleOnChangeText(text)
          : onChangeNumber
          ? handleOnChangeNumber(text)
          : onChangeDecimal
          ? handleOnChangeDecimal?.(text)
          : null
      }
      {...rest}
    />
  );
};
