import type { ModalProps, ViewProps } from "react-native";
import type { TextProps } from "react-native-paper";
import type { ButtonCustomProps } from "./ButtonCustom";
import type { OptionalChildren } from "./Common";

export type PopupPressType = "Button" | "Out" | "Cancel";

export type HideModal = (pressType: PopupPressType, isLongPress?: boolean) => void;

export type CommonProps = {
  mode?: "dialog" | "plain";
  hideModal: HideModal;
};

export type PopupProps = OptionalChildren<Omit<ModalProps, "visible" | "onDismiss" | "dismissable">> & {
  visible: boolean;
  mode?: "dialog" | "plain";
  containerStyle?: ViewProps["style"];
  titleStyle?: TextProps<any>["style"];
  buttonStyle?: ButtonCustomProps["style"];
  title?: string;
  text?: string;
  buttonText?: string;
  centerContent?: boolean;
  onHide?: () => void;
  onButtonClick?: () => void;
  hideMode?:
    | "on-button-click"
    | "on-cancel-click"
    | "on-out-click"
    | "on-button-or-cancel-click"
    | "on-button-or-out-click"
    | "on-cancel-or-out-click"
    | "on-any-click"
    | "on-custom";
};

export type ShadeProps = CommonProps & {
  showContent: () => void;
};

export type ContainerProps = CommonProps & {
  children?: ViewProps["children"];
  style?: ViewProps["style"];
  hideMode: PopupProps["hideMode"];
};

export type CancelButtonProps = CommonProps & {};
