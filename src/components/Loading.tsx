import { ActivityIndicator, Modal, View } from 'react-native';
import { useStyles } from '../hooks';
import { getLoadingStyles } from '../styles';
import type { LoadingProps } from '../types/components';

export const Loading = ({ loading = true }: LoadingProps) => {
  const { styles } = useStyles(getLoadingStyles);

  return (
    <Modal transparent={true} animationType="fade" visible={loading}>
      <View style={styles.modalBackground}>
        <ActivityIndicator
          style={styles.indicator}
          animating={loading}
          size="large"
          color={styles.indicator.color}
        />
      </View>
    </Modal>
  );
};
