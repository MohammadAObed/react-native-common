import * as Application from "expo-application";
import { Text } from "react-native-paper";
import { ErrorCode } from "../constants";
import { useStyles } from "../hooks";
import type { ErrorCommon } from "../models";
import { getErrorStyles } from "../styles";
import type { ExceptionProps } from "../types/components";
import { isValidComponent } from "../utils";
import { ButtonCustom } from "./ButtonCustom";
import { FitContainer } from "./FitContainer";
import { SafeAreaViewCustom } from "./SafeAreaViewCustom";

let failCount = 0;
const SHOW_SEND_EMAIL = failCount >= 2;

export const Exception = ({ children, mode, center, error, resetError }: ExceptionProps) => {
  const { styles } = useStyles(getErrorStyles);
  const errorCommon = error as ErrorCommon;

  if (!children && !errorCommon.showToScreen && !errorCommon.showOnly) {
    children = "Something went wrong...";
  }

  return (
    <>
      {mode === "simple" && (
        <FitContainer center={center}>
          {(errorCommon.showToScreen || errorCommon.showOnly) && <Text>{errorCommon.message}</Text>}
          {!errorCommon.showOnly && children && (isValidComponent(children) ? children : <Text style={styles.simpleText}>{children}</Text>)}
          <ButtonCustom mode="text-shadow" onPress={resetError}>
            Try Again
          </ButtonCustom>
          {SHOW_SEND_EMAIL && (
            <ButtonCustom mode="text-shadow" onPress={resetError}>
              Send Email
            </ButtonCustom>
          )}
        </FitContainer>
      )}
      {mode === "detailed" && (
        <SafeAreaViewCustom style={styles.container}>
          {!errorCommon.showOnly && <Text variant="displayMedium">Oops!</Text>}
          {!errorCommon.showOnly && <Text variant="headlineLarge">{"There's an error"}</Text>}
          {(errorCommon.showToScreen || errorCommon.showOnly) && <Text variant="bodyLarge">{errorCommon.message}</Text>}
          {!errorCommon.showOnly && children && (isValidComponent(children) ? children : <Text variant="bodyLarge">{children}</Text>)}
          <ButtonCustom textStyle={styles.buttonText} mode="button" withRadius onPress={resetError}>
            Try Again
          </ButtonCustom>
          {SHOW_SEND_EMAIL && (
            <ButtonCustom textStyle={styles.buttonText} mode="button" withRadius onPress={resetError}>
              Send Email
            </ButtonCustom>
          )}
          <Text style={styles.appVersion}>v {Application.nativeApplicationVersion}</Text>
          <Text style={styles.errorCode}>Error code: {errorCommon.errorCode ?? ErrorCode.UNKOWN}</Text>
        </SafeAreaViewCustom>
      )}
    </>
  );
};
