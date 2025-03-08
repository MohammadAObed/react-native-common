import type { TextInputProps } from "react-native-paper";

export type TextInputCustomProps = Omit<TextInputProps, "value" | "ref"> & {
  modeCustom?: "text" | "form";
  textForceUpdateCounter?: number;
} & (
    | {
        inputMode?: Extract<TextInputProps["inputMode"], "numeric">;
        value?: number;
        minValue?: number;
        maxValue?: number;
        onChangeNumber?: (value: number) => void;
        onChangeDecimal?: undefined;
        decimalPlaces?: undefined;
      }
    | {
        inputMode?: Extract<TextInputProps["inputMode"], "decimal">;
        value?: number;
        minValue?: number;
        maxValue?: number;
        onChangeDecimal?: (value: number) => void;
        onChangeNumber?: undefined;
        decimalPlaces?: number;
      }
    | {
        inputMode?: TextInputProps["inputMode"];
        value?: string;
        onChangeNumber?: undefined;
        onChangeDecimal?: undefined;
        minValue?: undefined;
        maxValue?: undefined;
        decimalPlaces?: undefined;
      }
  );
