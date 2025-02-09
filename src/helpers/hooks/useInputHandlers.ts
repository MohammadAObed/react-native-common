import { DEFAULT_DECIMAL_PLACES } from "../../constants";
import { ParseDecimalParam, ParseIntegerParam } from "../../types/helpers";

export function parseIntegerForTextInput({ text, min = 0, max = Number.MAX_SAFE_INTEGER, defaultValue = min }: ParseIntegerParam) {
  let cleanedText = text.replace(/[^0-9-]/g, "");
  return parseForTextInputHelper(cleanedText, false, min, max, defaultValue);
}

export function parseDecimalForTextInput({
  text,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  defaultValue = min,
  decimalPlaces = DEFAULT_DECIMAL_PLACES,
}: ParseDecimalParam) {
  let cleanedText = text.replace(/[^0-9.-]/g, "");
  const dotIndex = cleanedText.indexOf(".");
  if (dotIndex >= 0) {
    // Keep only the first dot
    cleanedText = cleanedText.slice(0, dotIndex + 1) + cleanedText.slice(dotIndex + 1).replace(/\./g, "");
  }

  return parseForTextInputHelper(cleanedText, true, min, max, defaultValue, decimalPlaces);
}

function parseForTextInputHelper(
  cleanedText: string,
  isDecimal = false,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  defaultValue = min,
  decimalPlaces = 2
) {
  const originalText = cleanedText;
  cleanedText = parseDash(cleanedText);
  cleanedText = parseDot(cleanedText, decimalPlaces);

  let value = isDecimal ? parseFloat(cleanedText) : parseInt(cleanedText);
  if (isNaN(value)) {
    value = defaultValue;
    if (cleanedText.trim() !== "") cleanedText = defaultValue.toString();
  } else if (value < min) {
    value = min;
    cleanedText = min.toString();
  } else if (value > max) {
    value = max;
    cleanedText = max.toString();
  }

  return {
    value,
    cleanedText: checkAllowedExactText(originalText) ? originalText : cleanedText,
  };

  function parseDash(cleanedText: string) {
    if (cleanedText.startsWith("-")) {
      cleanedText = "-" + cleanedText.slice(1).replace(/-/g, "");
    } else {
      cleanedText = cleanedText.replace(/-/g, "");
    }
    return cleanedText;
  }

  function parseDot(cleanedText: string, decimalPlaces: number) {
    const decimalIndex = cleanedText.indexOf(".");
    if (decimalIndex !== -1) {
      const integerPart = cleanedText.slice(0, decimalIndex);
      const decimalPart = cleanedText.slice(decimalIndex + 1, decimalIndex + 1 + decimalPlaces);
      if (decimalPart.length > 0) cleanedText = integerPart + "." + decimalPart;
    }
    return cleanedText;
  }
}

export function checkAllowedExactText(text: string) {
  return text.trim() === "" || text.trim() === "-" || text.trim() === "." || text.trim() === "-.";
}
