import { /* React, */ useState } from 'react';
import { View } from 'react-native';
import { useStyles } from '../../hooks';
import { getColorStyles } from '../../styles';
import type { ColorProps } from '../../types/components';
import { ButtonCustom } from '../ButtonCustom';
import { ColorPickerCustom } from './ColorPickerCustom';

export const Color = ({
  value,
  onColorChange,
  onVisibilityChange,
  isVisible,
  ...rest
}: ColorProps) => {
  const { styles } = useStyles(getColorStyles);
  const [pickerVisible, setPickerVisible] = useState(isVisible);

  return (
    <>
      <ButtonCustom
        mode="text"
        style={[styles.colorIndicator, { backgroundColor: value }]}
        textStyle={styles.colorIndicatorText}
        onPress={() => {
          setPickerVisible((prev) => !prev);
          onVisibilityChange?.(!pickerVisible);
        }}
      >
        {pickerVisible ? 'Hide' : 'Show'}
      </ButtonCustom>
      {pickerVisible && (
        <View style={[styles.colorPickerContainer]}>
          <ColorPickerCustom
            onColorChange={onColorChange}
            value={value}
            {...rest}
          />
        </View>
      )}
    </>
  );
};
