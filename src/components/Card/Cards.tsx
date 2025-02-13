import { View } from "react-native";
import { useStyles } from "../../hooks";
import getCardsStyles from "../../styles/Card/Cards";
import { ScrollContainer } from "../ScrollContainer";
import CardCustom from "./CardCustom";

const Cards = () => {
  const { styles } = useStyles(getCardsStyles);
  return (
    <ScrollContainer>
      <View style={styles.cardsContainer}>
        <CardCustom title="Member Cards" description="Starbucks, Gramedia, Binus">
        </CardCustom>
        <CardCustom title="Member Cards" description="Starbucks, Gramedia, Binus">
        </CardCustom>
        <CardCustom title="Member Cards" description="Starbucks, Gramedia, Binus">
        </CardCustom>
        <CardCustom title="Member Cards" description="Starbucks, Gramedia, Binus">
        </CardCustom>
        <CardCustom title="Member Cards" description="Starbucks, Gramedia, Binus">
        </CardCustom>
        <CardCustom title="Member Cards" description="Starbucks, Gramedia, Binus">
        </CardCustom>
        <CardCustom title="Member Cards" description="Starbucks, Gramedia, Binus">
        </CardCustom>
        <CardCustom title="Member Cards" description="Starbucks, Gramedia, Binus">
        </CardCustom>
        <CardCustom title="Member Cards" description="Starbucks, Gramedia, Binus">
        </CardCustom>
      </View>
    </ScrollContainer>
  );
};

export default Cards;
