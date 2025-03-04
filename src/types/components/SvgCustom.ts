import type { ColorValue } from 'react-native';
import type { SvgShapeValues } from '../constants';

export type SvgCustomProps = {
  shape: SvgShapeValues;
  strokeWidth?: number;
  color?: ColorValue;
  isSmall?: boolean;
};
