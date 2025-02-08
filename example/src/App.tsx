import { StyleSheet, Text, View } from 'react-native';
import { getRandomNumber } from 'react-native-common';

const result = getRandomNumber(1, 10) + ([1, 2].vMax((x) => x) ?? 0);

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
