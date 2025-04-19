// components/CustomToast.tsx
import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import Shadow from "../components/Shadow";
import { ToastDefaultPosition, ToastManagerConfig, ToastVisibilityTime } from "../constants";
import { useStyles } from "../hooks";
import { getToastCommonStyles } from "../styles/ToastCommon";
import { ToastCommonProps } from "../types/components";

export const ToastCommon = ({ text1, text2, type, hide }: ToastCommonProps) => {
  const { styles } = useStyles(getToastCommonStyles);
  const [expanded, setExpanded] = useState(false);
  return (
    <Shadow offset={[3, 3]} borderRadius={styles.container.borderRadius} opacity={0.5} blur={[3, 0.1, 0.1]}>
      <TouchableOpacity onPress={() => (expanded ? hide?.() : setExpanded(true))} activeOpacity={0.8} style={styles.container}>
        <Text style={styles.text} numberOfLines={expanded ? undefined : 2} ellipsizeMode="tail">
          {text1}
        </Text>
      </TouchableOpacity>
    </Shadow>
  );
};

export const ToastManager = () => {
  return <Toast visibilityTime={ToastVisibilityTime.DEFAULT} config={ToastManagerConfig} position={ToastDefaultPosition} />;
};
