import { useEffect, useRef, useState } from "react";
import { Modal, View } from "react-native";
import { Text } from "react-native-paper";
import { HideModes, ShadeLongPressTimeout } from "../constants";
import { useStyles, useTimeout } from "../hooks";
import { getPopupStyles } from "../styles";
import type { CancelButtonProps, ContainerProps, PopupPressType, PopupProps, ShadeProps } from "../types/components";
import { ButtonCustom } from "./ButtonCustom";
import { PressableIcon } from "./PressableIcon";
import Shadow from "./Shadow";

export const Popup = ({
  titleStyle,
  buttonStyle,
  containerStyle,
  children,
  visible,
  title,
  text,
  buttonText,
  centerContent,
  hideMode = "onAnyClick",
  onHide,
  onButtonClick,
  mode = "normal",
  animationType = "fade",
  ...rest
}: PopupProps) => {
  const { styles } = useStyles(getPopupStyles);
  const [modalVisible, setModalVisible] = useState(visible);
  const [contentVisible, setContentVisible] = useState(true);

  const hideModal = (pressType: PopupPressType, isLongPress = false) => {
    if (isLongPress && pressType === "Out") setContentVisible(false);
    if (!isLongPress && HideModes[pressType]?.includes(hideMode)) {
      onHide?.();
      setModalVisible(false);
    }
  };

  const onButtonPress = () => {
    hideModal("Button");
    onButtonClick?.();
  };

  useEffect(() => {
    setModalVisible(() => visible);
    setContentVisible(() => visible);
  }, [visible]);

  return (
    <>
      <Modal transparent statusBarTranslucent visible={modalVisible} animationType={animationType} {...rest}>
        <Shade hideModal={hideModal} showContent={() => setContentVisible(() => true)} />
        {contentVisible && (
          <Container
            mode={mode}
            hideMode={hideMode}
            hideModal={hideModal}
            style={[centerContent ? styles.centeredContainer : {}, containerStyle]}
          >
            {title && (
              <Text variant="headlineLarge" style={[title && children ? styles.title : {}, titleStyle]}>
                {title}
              </Text>
            )}
            {children}
            {text && <Text>{text}</Text>}
            {buttonText && (
              <ButtonCustom mode="button" style={[styles.Button, buttonStyle]} onPress={onButtonPress}>
                {buttonText}
              </ButtonCustom>
            )}
          </Container>
        )}
      </Modal>
    </>
  );
};

const Shade = ({ hideModal, showContent }: ShadeProps) => {
  const { styles } = useStyles(getPopupStyles);
  const { createTimeout, removeTimeout } = useTimeout();
  const shouldHideRef = useRef(false);

  const handlePress = () => {
    removeTimeout();
    createTimeout(() => (shouldHideRef.current = false), ShadeLongPressTimeout);
  };

  return (
    <ButtonCustom
      style={[styles.shade]}
      onPressIn={() => {
        shouldHideRef.current = true;
        hideModal("Out", true);
        handlePress();
      }}
      onPressOut={() => {
        if (shouldHideRef.current === true) {
          hideModal("Out");
        }
        shouldHideRef.current = false;
        showContent();
        removeTimeout();
      }}
    />
  );
};

const Container = ({ children, style, hideMode, hideModal, mode }: ContainerProps) => {
  const { styles } = useStyles(getPopupStyles);
  return (
    <View style={styles.invisibleContainer}>
      {mode === "bare" && children}
      {mode === "normal" && (
        <Shadow offset={[0, 5]} borderRadius={10} opacity={0.12} blur={[3, 1, 0.98]}>
          <View style={[styles.contentContainer, style]}>
            {HideModes["Cancel"].includes(hideMode!) && <CancelButton hideModal={hideModal} />}
            {children}
          </View>
        </Shadow>
      )}
    </View>
  );
};

const CancelButton = ({ hideModal }: CancelButtonProps) => {
  const { styles } = useStyles(getPopupStyles);
  return (
    <PressableIcon color={styles.cancelButton.color} style={styles.cancelButton} size={35} name="xmark" onPress={() => hideModal("Cancel")} />
  );
};
