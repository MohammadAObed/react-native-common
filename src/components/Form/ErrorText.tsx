import { /* React, */ useState } from 'react';
import { Text, type TextProps } from 'react-native-paper';
import { useStyles } from '../../hooks';
import { getErrorTextStyles } from '../../styles';
import { ButtonCustom } from '../ButtonCustom';
import { PressableIcon } from '../PressableIcon';

export const ErrorText = <T,>({ children }: TextProps<T>) => {
  const { styles } = useStyles(getErrorTextStyles);
  const [visible, SetVisible] = useState(true);

  return (
    <>
      {visible && (
        <ButtonCustom
          style={styles.container}
          onPress={() => SetVisible(false)}
        >
          <Text style={styles.errorText}>{children}</Text>
          <PressableIcon
            name="xmark"
            onPress={() => SetVisible(false)}
            size={styles.errorText.fontSize * 1.9}
            color={styles.errorText.color}
          />
        </ButtonCustom>
      )}
    </>
  );
};
