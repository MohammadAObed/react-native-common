import Slider from "@react-native-community/slider";
import { useState } from "react";
import { View } from "react-native";
import { useStyles } from "../../hooks";
import { getSliderCustomStyles } from "../../styles";
import type { SliderCustomProps } from "../../types/components";
import { NumberInput } from "./NumberInput";

export const SliderCustom = ({
  style,
  children,
  value,
  minimumValue = 0,
  maximumValue = 100,
  inputMode,
  decimalPlaces,
  onValueChange,
  ...rest
}: SliderCustomProps) => {
  const { styles } = useStyles(getSliderCustomStyles);
  const [_value, _setValue] = useState(value);

  return (
    <View style={styles.container}>
      <Slider
        style={[styles.slider, style]}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        minimumTrackTintColor={styles.thumb.color}
        maximumTrackTintColor={styles.MaximumTrackThumb.color}
        thumbTintColor={styles.thumb.color}
        value={_value}
        onValueChange={onValueChange}
        {...rest}
      />
      {inputMode && (
        <View style={styles.numberInputContainer}>
          <NumberInput
            contentStyle={styles.numberInput}
            inputMode={inputMode}
            minValue={minimumValue}
            maxValue={maximumValue}
            decimalPlaces={decimalPlaces}
            value={_value}
            onChangeValue={onValueChange}
          />
        </View>
      )}
      {children}
    </View>
  );
};
