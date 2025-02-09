import { useEffect, useState } from 'react';
import {
  parseDecimalForTextInput,
  parseIntegerForTextInput,
} from '../../helpers';
import type { useInputHandlersProps } from '../../types/hooks';

export const useInputHandlers = ({
  value,
  minValue = 0,
  maxValue = Number.MAX_SAFE_INTEGER,
  decimalPlaces = 2,
  onChangeText,
  onChangeNumber,
  onChangeDecimal,
}: useInputHandlersProps) => {
  const [inputText, setInputText] = useState<string>();
  const [isFromInput, setIsFromInput] = useState(false);

  const handleOnChangeDecimal = (text: string, isFromTextInput = true) => {
    let { cleanedText, value: decimalValue } = parseDecimalForTextInput({
      text,
      min: minValue,
      max: maxValue,
      decimalPlaces,
    });
    setInputText(cleanedText);
    setIsFromInput(isFromTextInput);
    if (isFromTextInput) onChangeDecimal?.(decimalValue);
  };

  const handleOnChangeNumber = (text: string, isFromTextInput = true) => {
    let { cleanedText, value: numberValue } = parseIntegerForTextInput({
      text,
      min: minValue,
      max: maxValue,
    });
    setInputText(cleanedText);
    setIsFromInput(isFromTextInput);
    if (isFromTextInput) onChangeNumber?.(numberValue);
  };

  const handleOnChangeText = (text: string, isFromTextInput = true) => {
    setIsFromInput(isFromTextInput);
    setInputText(text);
    if (isFromTextInput) {
      const newText = onChangeText?.(text);
      setInputText(newText ?? text);
    }
  };

  useEffect(() => {
    if (isFromInput) {
      setIsFromInput(false);
    } else {
      const text = value?.toString() ?? '';
      if (onChangeText) handleOnChangeText(text, false);
      else if (onChangeNumber) handleOnChangeNumber(text, false);
      else if (onChangeDecimal) handleOnChangeDecimal(text, false);
    }
  }, [value]);

  useEffect(() => {
    if (onChangeText) setInputText(`${value ?? ''}`);
  });

  return {
    inputText,
    setInputText,
    handleOnChangeDecimal,
    handleOnChangeNumber,
    handleOnChangeText,
  };
};
