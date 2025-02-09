import { getColorPickerCustomStyles } from '../../styles';
// import React from "react";
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ColorPicker from 'react-native-wheel-color-picker';
import { useStyles } from '../../hooks';
import { ColorPickerBugHelper } from '../../libs/Bugs';
import type { ColorPickerCustomProps } from '../../types/components';

export const ColorPickerCustom = ({
  value,
  onColorChange,
  ...rest
}: ColorPickerCustomProps) => {
  const { styles } = useStyles(getColorPickerCustomStyles);

  let correctValue = ColorPickerBugHelper.HandleTransparentColor(value);

  return (
    <SafeAreaView>
      <View style={styles.sectionContainer}>
        <ColorPicker
          swatches={false}
          gapSize={-10}
          color={correctValue ?? value}
          onColorChangeComplete={(val) =>
            val !== correctValue && onColorChange?.(val)
          }
          thumbSize={30}
          sliderSize={30}
          noSnap={true}
          row={false}
          {...rest}
        />
      </View>
    </SafeAreaView>
  );
};
