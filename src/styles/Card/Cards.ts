import { StyleSheet } from "react-native";
import type { MD3Theme } from "react-native-paper";

const getCardsStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    cardsContainer: {
      gap: 15,
      marginTop: 15,
      paddingVertical:15,
    },
  });

export default getCardsStyles;
