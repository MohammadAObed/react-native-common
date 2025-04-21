import { ToastConfigParams, ToastType } from "react-native-toast-message";
import { ErrorType } from "../../types/models";

export type ToastCommonProps = Omit<
  ToastConfigParams<{
    Id: number;
    visibilityTime: number;
    autoHide?: boolean;
  }>,
  "type"
> & {
  type: ToastType | ErrorType;
};
export type ToastIconProps = Pick<ToastCommonProps, "type">;
