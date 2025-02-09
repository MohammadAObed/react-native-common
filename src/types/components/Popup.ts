import { ViewProps } from "react-native";
import { ModalProps, TextProps } from "react-native-paper";
import { ButtonCustomProps } from "./ButtonCustom";
import { OptionalChildren } from "./Common";

export type PopupPressType = "Button" | "Out" | "Cancel";

export type HideModal = (pressType: PopupPressType, isLongPress?: boolean) => void;

export type CommonProps = {
  hideModal: HideModal;
};

export type PopupProps = OptionalChildren<Omit<ModalProps, "onDismiss" | "dismissable">> & {
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
    | "onButtonClick"
    | "onCancelClick"
    | "onOutClick"
    | "onButtonOrCancelClick"
    | "onButtonOrOutClick"
    | "onCancelOrOutClick"
    | "onAnyClick"
    | "onCustom";
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
