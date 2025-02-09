export type ParseIntegerParam = { text: string; min?: number; max?: number; defaultValue?: number };
export type ParseDecimalParam = ParseIntegerParam & { decimalPlaces?: number };
