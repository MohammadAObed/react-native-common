import { ActivityIndicator, View } from "react-native";
import { Text } from "react-native-paper";
import { useStyles } from "../hooks";
import { commonStyles, getLoadingStyles } from "../styles";
import type { LoadingProps } from "../types/components";
import { Popup } from "./Popup";

export const Loading = ({ loading = true, mode = "full-screen", ...rest }: LoadingProps) => {
  return (
    <>
      {mode === "full-screen" && (
        <Popup visible={loading} mode="bare" hideMode="onCustom">
          <LoadingContent loading={loading} {...rest} />
        </Popup>
      )}
      {mode === "fit-container" && (
        <View style={commonStyles.fitContainer}>
          <LoadingContent loading={loading} {...rest} />
        </View>
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
