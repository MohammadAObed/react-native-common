import { Text, TextInput } from "react-native-paper";
import { DEFAULT_DECIMAL_PLACES } from "../../constants";
import { checkAllowedExactText } from "../../helpers";
import { useInputHandlers, useStyles } from "../../hooks";
import { PaperBugHelper } from "../../libs/Bugs";
import { getTextInputCustomModeStyles, getTextInputCustomStyles } from "../../styles";
import type { TextInputCustomProps } from "../../types/components";

export const TextInputCustom = ({
  style,
  contentStyle,
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
  variant,
  onFocus,
  onBlur,
  onChangeText,
  onChangeNumber,
  onChangeDecimal,
  ...rest
}: TextInputCustomProps) => {
  const { styles, theme } = useStyles(getTextInputCustomStyles);
  const { styles: modeStyles } = useStyles(getTextInputCustomModeStyles);
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
  const contentStyleFixed = PaperBugHelper.GetTextInputContentStyle(inputText, placeholder, style, contentStyle);
  return (
    <TextInput
      theme={PaperBugHelper.GetTextInputDisabledTheme(theme, modeCustom)}
      style={[styles.input, modeCustom && modeStyles[modeCustom], style]}
      contentStyle={[contentStyleFixed, variant && { ...theme.fonts[variant] }]}
      textAlign={contentStyleFixed.textAlign as any}
      textColor={textColor}
      underlineColor={underlineColor ?? styles.underlineColor.color}
      placeholderTextColor={styles.placeholderColor.color}
      label={label && <Text style={styles.label}>{label}</Text>}
      placeholder={placeholder}
      value={inputText}
      inputMode={inputMode}
      disabled={disabled}
      onFocus={(e) => {
        onFocus?.(e);
      }}
      onBlur={(e) => {
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
