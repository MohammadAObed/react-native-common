// import React from "react";
import { Text } from 'react-native-paper';
import { useStyles } from '../hooks';
import { getErrorStyles } from '../styles';
import type { ExceptionProps } from '../types/components';
import { isValidComponent } from '../utils';
import { ButtonCustom } from './ButtonCustom';
import { SafeAreaViewCustom } from './SafeAreaViewCustom';

export const Exception = ({ children, error, resetError }: ExceptionProps) => {
  const { styles } = useStyles(getErrorStyles);
  return (
    <SafeAreaViewCustom style={styles.container}>
      <Text variant="displayMedium">Oops!</Text>
      <Text variant="headlineLarge">{"There's an error"}</Text>
      {children &&
        (isValidComponent(children) ? (
          children
        ) : (
          <Text variant="bodyLarge">{children}</Text>
        ))}
      <ButtonCustom
        textStyle={styles.buttonText}
        mode="button"
        withRadius
        onPress={resetError}
      >
        Try Again
      </ButtonCustom>
    </SafeAreaViewCustom>
  );
};
