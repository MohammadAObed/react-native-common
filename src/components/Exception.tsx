// import React from "react";
import * as Application from 'expo-application';
import { Text } from 'react-native-paper';
import { ErrorCode } from '../constants';
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
      {error.showToScreen && <Text variant="bodyLarge">{error.message}</Text>}
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
      <Text selectable>or send an email with the screenshot of this screen if this error still occurs to: <Text style={styles.buttonText}>mohammadahmadobed@gmail.com</Text></Text>
      <Text style={styles.appVersion}>v {Application.nativeApplicationVersion}</Text>
      <Text style={styles.errorCode}>Error code: {error.errorCode ?? ErrorCode.UNKOWN}</Text>
    </SafeAreaViewCustom>
  );
};
