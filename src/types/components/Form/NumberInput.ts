import type { TextInputProps } from 'react-native-paper';
import type { TextInputCustomProps } from './TextInputCustom';

export type NumberInputProps = Omit<
  TextInputCustomProps,
  'onChangeDecimal' | 'onChangeNumber'
> & {
  value?: number;
  minValue?: number;
  maxValue?: number;
  onChangeValue?: (value: number) => void;
  decimalPlaces?: number;
};

export type NumberInputModeProps =
  | {
      inputMode?: Extract<TextInputProps['inputMode'], 'numeric'>;
      decimalPlaces?: undefined;
    }
  | {
      inputMode?: Extract<TextInputProps['inputMode'], 'decimal'>;
      decimalPlaces?: number;
    };
