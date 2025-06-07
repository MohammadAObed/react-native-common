import { forwardRef } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { useStyles } from "../../hooks";
import { getFormRowModeStyles, getFormRowStyles } from "../../styles";
import type { FormRowProps } from "../../types/components";
import { isValidComponent } from "../../utils";

export const FormRow = forwardRef(({ children, label, style, mode = "filled", ...rest }: FormRowProps, ref: React.ForwardedRef<View>) => {
  const { styles } = useStyles(getFormRowStyles);
  const { styles: modeStyles } = useStyles(getFormRowModeStyles);

  return (
    <View ref={ref} style={[styles.formRowContainer, style, modeStyles[mode]]} {...rest}>
      {!isValidComponent(label) && label !== undefined && <FormRowText>{label}:</FormRowText>}
      {isValidComponent(label) && label !== undefined && <View style={styles.label}>{label}</View>}
      {children}
    </View>
  );
});

export const FormRowText = ({ children }: FormRowProps) => {
  const { styles } = useStyles(getFormRowStyles);
  return <Text style={styles.label}>{children}</Text>;
};
