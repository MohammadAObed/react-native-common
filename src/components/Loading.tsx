import { ActivityIndicator } from "react-native";
import { Text } from "react-native-paper";
import { useStyles } from "../hooks";
import { getLoadingStyles } from "../styles";
import type { LoadingProps } from "../types/components";
import { FitContainer } from "./FitContainer";
import { Popup } from "./Popup";

export const Loading = ({ loading = true, center, mode = "simple", ...rest }: LoadingProps) => {
  return (
    <>
      {mode === "detailed" && (
        <Popup visible={loading} mode="bare" hideMode="onCustom">
          <LoadingContent loading={loading} {...rest} />
        </Popup>
      )}
      {mode === "simple" && (
        <FitContainer center={center}>
          <LoadingContent loading={loading} {...rest} />
        </FitContainer>
      )}
    </>
  );
};

const LoadingContent = ({ loading, text: loadingText }: LoadingProps) => {
  const { styles } = useStyles(getLoadingStyles);
  return (
    <>
      <ActivityIndicator animating={loading} size="large" color={styles.indicator.color} />
      {loadingText && <Text style={styles.loadingText}>{loadingText}</Text>}
    </>
  );
};
