import * as Application from "expo-application";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { ErrorCode } from "../constants";
import { useStyles } from "../hooks";
import type { ErrorCustom } from "../models";
import { commonStyles, getErrorStyles } from "../styles";
import type { ExceptionProps } from "../types/components";
import { isValidComponent } from "../utils";
import { ButtonCustom } from "./ButtonCustom";
import { SafeAreaViewCustom } from "./SafeAreaViewCustom";

export const Exception = ({ children, mode, error, resetError }: ExceptionProps) => {
  const errorCustom = error as ErrorCustom;
  const { styles } = useStyles(getErrorStyles);
  return (
    <>
      {mode === "fit-container" && (
        <View style={commonStyles.fitContainer}>
          {children && (isValidComponent(children) ? children : <Text>{children}</Text>)}
          <ButtonCustom mode="text-shadow" onPress={resetError}>
            Try Again
          </ButtonCustom>
        </View>
      )}
      {mode === "full-screen" && (
        <SafeAreaViewCustom style={styles.container}>
          <Text variant="displayMedium">Oops!</Text>
          <Text variant="headlineLarge">{"There's an error"}</Text>
          {errorCustom.showToScreen && <Text variant="bodyLarge">{errorCustom.message}</Text>}
          {children && (isValidComponent(children) ? children : <Text variant="bodyLarge">{children}</Text>)}
          <ButtonCustom textStyle={styles.buttonText} mode="button" withRadius onPress={resetError}>
            Try Again
          </ButtonCustom>
          <Text selectable>
            or send an email with the screenshot of this screen if this error still occurs to:{" "}
            <Text style={styles.buttonText}>mohammadahmadobed@gmail.com</Text>
          </Text>
          <Text style={styles.appVersion}>v {Application.nativeApplicationVersion}</Text>
          <Text style={styles.errorCode}>Error code: {errorCustom.errorCode ?? ErrorCode.UNKOWN}</Text>
        </SafeAreaViewCustom>
      )}
    </>
  );
};
