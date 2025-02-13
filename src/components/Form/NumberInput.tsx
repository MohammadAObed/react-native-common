import type { NumberInputProps } from '../../types/components';
import { TextInputCustom } from './TextInputCustom';

export const NumberInput = ({
  value,
  minValue = 0,
  maxValue = 100,
  inputMode,
  decimalPlaces,
  onChangeValue,
  ...rest
}: NumberInputProps) => {
  const inputProps = {
    value,
    minValue,
    maxValue,
    ...rest,
  };
  return (
    <>
      {inputMode === 'numeric' && (
        <TextInputCustom
          inputMode="numeric"
          onChangeNumber={onChangeValue}
          {...inputProps}
        />
      )}
      {inputMode === 'decimal' && (
        <TextInputCustom
          inputMode="decimal"
          onChangeDecimal={onChangeValue}
          decimalPlaces={decimalPlaces}
          {...inputProps}
        />
      )}
    </>
  );
};
