import { Text } from "react-native-paper";
import { useStyles } from "../../hooks";
import { getCardCustomStyles } from "../../styles";
import type { CardCustomProps } from "../../types/components/Card/CardCustom";
import { ButtonCustom } from "../ButtonCustom";
import Shadow from "../Shadow";

const CardCustom = ({ children, style, title, description, ...rest }: CardCustomProps) => {
  const { styles } = useStyles(getCardCustomStyles);
  
  return (
    <Shadow offset={[0,15]} opacity={0.2} borderRadius={15} blur={5}>
      <ButtonCustom onPress={rest.onPress} style={[styles.container, style]}{...rest}>
        {title && <Text style={styles.title} variant="titleLarge">{title}</Text>}
        {description && <Text style={styles.description} variant="titleSmall" numberOfLines={1}>{description} asd a sda wasd asd  asd a</Text>}
      {children}
      </ButtonCustom>
    </Shadow>

  );
};

export default CardCustom;
