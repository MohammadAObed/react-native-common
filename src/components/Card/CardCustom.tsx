import { forwardRef } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { useStyles } from "../../hooks";
import { getCardCustomStyles } from "../../styles";
import type { CardCustomProps } from "../../types/components/Card/CardCustom";
import { ButtonCustom } from "../ButtonCustom";
import { Shadow } from "../Shadow";

export const CardCustom = forwardRef(({ children, style, title, description, ...rest }: CardCustomProps, ref: React.ForwardedRef<View>) => {
  const { styles } = useStyles(getCardCustomStyles);

  return (
    <Shadow offset={[4, 5]} opacity={0.2} blur={[2, 0.97, 0.8]}>
      <ButtonCustom ref={ref} style={[styles.container, style]} {...rest}>
        {title && (
          <Text style={styles.title} variant="titleLarge">
            {title}
          </Text>
        )}
        {description && (
          <Text style={styles.description} variant="titleSmall" numberOfLines={1}>
            {description}
          </Text>
        )}
        {children}
      </ButtonCustom>
    </Shadow>
  );
});
