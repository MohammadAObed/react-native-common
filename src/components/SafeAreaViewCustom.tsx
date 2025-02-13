import {
  SafeAreaView,
  type SafeAreaViewProps,
} from 'react-native-safe-area-context';
import { useStyles } from '../hooks';
import { getSafeAreaViewCustomStyles } from '../styles';

export const SafeAreaViewCustom = ({ children, style }: SafeAreaViewProps) => {
  const { styles } = useStyles(getSafeAreaViewCustomStyles);
  return (
    <SafeAreaView style={[styles.safeAreaView, style]}>{children}</SafeAreaView>
  );
};
