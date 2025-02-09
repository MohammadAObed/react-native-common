import { View, type ViewStyle } from 'react-native';
import { DEFAULT_ZINDEX } from '../constants';
import type { StaticProps } from '../types/components';

export const Static = ({
  children,
  initialTranslateX,
  initialTranslateY,
  zIndex,
  keyboardVisibleTranslateY,
}: StaticProps) => {
  const style: ViewStyle = {
    zIndex: zIndex ?? DEFAULT_ZINDEX,
    transform: [
      { translateX: initialTranslateX },
      { translateY: keyboardVisibleTranslateY ?? initialTranslateY },
    ],
  };

  return <View style={[style]}>{children}</View>;
};
