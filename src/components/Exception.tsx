import * as Application from "expo-application";
import { Text } from "react-native-paper";
import { useStyles } from "../hooks";
import { ErrorCommon } from "../models";
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
  const errorCommon: ErrorCommon = error as ErrorCommon;
  errorCommon._handled = true;
  ErrorCommon.logError(errorCommon, "Exception.tsx");
  const errorMessage = ErrorCommon.getErrorMessage(error);

  return (
    <>
      {mode === "simple" && (
        <FitContainer center={center}>
          <Text selectable>{errorMessage}</Text>
          {errorCommon.destination !== "boundary-alone" &&
            children &&
            (isValidComponent(children) ? (
              children
            ) : (
              <Text style={styles.simpleText} selectable>
                {children}
              </Text>
            ))}
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
          {errorCommon.destination !== "boundary-alone" && <Text variant="displayMedium">Oops!</Text>}
          {errorCommon.destination !== "boundary-alone" && <Text variant="headlineLarge">{"There's an error"}</Text>}
          {<Text variant="bodyLarge">{errorMessage}</Text>}
          {errorCommon.destination !== "boundary-alone" &&
            children &&
            (isValidComponent(children) ? children : <Text variant="bodyLarge">{children}</Text>)}
          <ButtonCustom textStyle={styles.buttonText} mode="contained" withRadius onPress={resetError}>
            Try Again
          </ButtonCustom>
          {SHOW_SEND_EMAIL && (
            <ButtonCustom textStyle={styles.buttonText} mode="contained" withRadius onPress={resetError}>
              Send Email
            </ButtonCustom>
          )}
          <Text style={styles.appVersion}>v {Application.nativeApplicationVersion}</Text>
          <Text style={styles.errorCode}>Error code: {errorCommon.errorCode ?? ErrorCommon.ErrorCode.UNKOWN}</Text>
        </SafeAreaViewCustom>
      )}
    </>
  );
};
