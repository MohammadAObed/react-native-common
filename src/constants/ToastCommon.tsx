import { ToastConfig, ToastConfigParams, ToastPosition } from "react-native-toast-message";
import { ToastCommon } from "../components";
import { ToastCommonProps } from "../types/components";

export const ToastDelay = 600;

export const ToastManagerConfig: ToastConfig = {
  custom: (param: ToastConfigParams<ToastCommonProps>) => <ToastCommon {...param} {...param.props} />,
  success: (param: ToastConfigParams<ToastCommonProps>) => <ToastCommon {...param} {...param.props} />,
  error: (param: ToastConfigParams<ToastCommonProps>) => <ToastCommon {...param} {...param.props} />,
  info: (param: ToastConfigParams<ToastCommonProps>) => <ToastCommon {...param} {...param.props} />,
} as const;

export const ToastVisibilityTime = {
  SHORT: 2000,
  NORMAL: 3000,
  LONG: 4000,
  DEFAULT: 3000,
} as const;
export const ToastDefaultPosition: ToastPosition = "bottom";
