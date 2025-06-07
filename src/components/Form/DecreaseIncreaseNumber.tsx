import { View } from "react-native";
import { Text } from "react-native-paper";
import { useStyles } from "../../hooks";
import { getDecreaseIncreaseNumberStyles } from "../../styles";
import type { DecreaseIncreaseNumberProps } from "../../types/components";
import { PressableIcon } from "../PressableIcon";
import { NumberInput } from "./NumberInput";

export const DecreaseIncreaseNumber = ({
  children,
  value,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  visible = true,
  inputMode,
  decimalPlaces,
  onChangeValue,
}: DecreaseIncreaseNumberProps) => {
  const { styles, theme } = useStyles(getDecreaseIncreaseNumberStyles);

  return (
    <>
      {visible && (
        <View style={[styles.container, inputMode && styles.containerWithInput]}>
          <PressableIcon
            name="minus"
            onPress={() => onChangeValue(value - 1)}
            disabled={value <= min}
            size={theme.fonts.displaySmall.fontSize}
          />
          {!inputMode && (
            <Text variant="bodyLarge" style={styles.label}>
              {children ?? value}
            </Text>
          )}
          {inputMode && (
            <NumberInput
              contentStyle={styles.inputContentStyle}
              variant="bodyLarge"
              inputMode={inputMode as any}
              minValue={min}
              maxValue={max}
              decimalPlaces={decimalPlaces}
              value={value}
              onChangeValue={onChangeValue}
            />
          )}

          <PressableIcon name="plus" onPress={() => onChangeValue(value + 1)} disabled={value >= max} size={theme.fonts.displaySmall.fontSize} />
        </View>
      )}
    </>
  );
};
