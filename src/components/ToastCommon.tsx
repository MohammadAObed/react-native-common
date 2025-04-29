// components/CustomToast.tsx
import { useEffect, useState } from "react";
import { Text } from "react-native";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  PencilSquareIcon,
} from "react-native-heroicons/solid";
import Toast from "react-native-toast-message";
import { ButtonCustom } from "../components/ButtonCustom";
import Shadow from "../components/Shadow";
import { ToastDefaultPosition, ToastHideDelay, ToastManagerConfig, ToastQueue, ToastVisibilityTime } from "../constants";
import { useStyles, useTimeout } from "../hooks";
import { getToastCommonStyles } from "../styles/ToastCommon";
import { ToastCommonProps, ToastIconProps } from "../types/components";

export const ToastCommon = ({ text1, text2, type, isVisible, props: { visibilityTime, Id, autoHide }, hide }: ToastCommonProps) => {
  const { styles } = useStyles(getToastCommonStyles);
  const [expanded, setExpanded] = useState(false);
  const [shouldHide, setShouldHide] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const { createTimeout, removeTimeout } = useTimeout({ shouldHide });
  const notManualHide = autoHide || autoHide === false;
  const createHideTimeout = () => {
    if (notManualHide) return;
    createTimeout(({ shouldHide }) => {
      if (!shouldHide) hide();
    }, visibilityTime);
  };
  const onPress = () => {
    if (!isVisible || !isOverflowing) return;
    setExpanded((prevExpanded) => {
      if (prevExpanded) createHideTimeout();
      setShouldHide(() => !prevExpanded);
      return !prevExpanded;
    });
  };
  useEffect(() => {
    if (!Id || notManualHide) return;
    if (expanded) setExpanded((prev) => false);
    if (shouldHide) setShouldHide((prev) => false);
    createHideTimeout();
    return () => removeTimeout();
  }, [Id]);

  return (
    <Shadow offset={[3, 3]} borderRadius={styles.container.borderRadius} opacity={0.5} blur={[3, 0.1, 0.1]}>
      <ButtonCustom onPress={onPress} activeOpacity={0.8} style={styles.container}>
        <ToastIcon type={type} />
        <Text
          style={styles.text}
          numberOfLines={expanded ? undefined : 2}
          ellipsizeMode="tail"
          onTextLayout={(e) => setIsOverflowing(e.nativeEvent.lines.length > 2)}
        >
          <Text style={text2 ? styles.bold : null}>{text1}</Text>
          {text2 ? <Text>{` ${text2}`}</Text> : null}
        </Text>
        {autoHide === false && (
          <ButtonCustom mode="text-shadow" textStyle={styles.closeBtnText} onPress={() => hide()}>
            CLOSE
          </ButtonCustom>
        )}
      </ButtonCustom>
    </Shadow>
  );
};

export const ToastIcon = ({ type }: ToastIconProps) => {
  const { styles } = useStyles(getToastCommonStyles);
  const iconSize = 20;
  switch (type) {
    case "success":
      return <CheckCircleIcon size={iconSize} color={styles.successIconColor.color} style={styles.icon} />;
    case "error":
      return <ExclamationCircleIcon size={iconSize} color={styles.errorIconColor.color} style={styles.icon} />;
    case "info":
      return <InformationCircleIcon size={iconSize} color={styles.infoIconColor.color} style={styles.icon} />;
    case "warning":
      return <ExclamationTriangleIcon size={iconSize} color={styles.warningIconColor.color} style={styles.icon} />;
    case "validation":
      return <PencilSquareIcon size={iconSize} color={styles.validationIconColor.color} style={styles.icon} />;
    default:
      return <></>;
  }
};

export const ToastManager = () => {
  const onHide = () => {
    ToastQueue.queue.shift();
    const queueItem = ToastQueue.queue[0];
    if (!queueItem) return;
    setTimeout(() => {
      queueItem.showToast();
    }, ToastHideDelay);
  };
  return (
    <Toast
      autoHide={false}
      visibilityTime={ToastVisibilityTime.DEFAULT}
      config={ToastManagerConfig}
      position={ToastDefaultPosition}
      onHide={onHide}
    />
  );
};
