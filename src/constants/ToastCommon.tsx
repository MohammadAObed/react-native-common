import { ToastConfig, ToastConfigParams, ToastPosition } from "react-native-toast-message";
import { ToastCommon } from "../components";
import { ToastCommonProps } from "../types/components";
import { ToastQueueType } from "../types/constants";

export const ToastHideDelay = 300;

export const ToastManagerConfig: ToastConfig = {
  custom: (param: ToastConfigParams<ToastCommonProps>) => <ToastCommon {...param} {...param.props} />,
  success: (param: ToastConfigParams<ToastCommonProps>) => <ToastCommon {...param} {...param.props} />,
  error: (param: ToastConfigParams<ToastCommonProps>) => <ToastCommon {...param} {...param.props} />,
  validation: (param: ToastConfigParams<ToastCommonProps>) => <ToastCommon {...param} {...param.props} />,
  warning: (param: ToastConfigParams<ToastCommonProps>) => <ToastCommon {...param} {...param.props} />,
  info: (param: ToastConfigParams<ToastCommonProps>) => <ToastCommon {...param} {...param.props} />,
} as const;

export const ToastVisibilityTime = {
  SHORT: 2000,
  NORMAL: 3000,
  LONG: 4000,
  DEFAULT: 3000,
} as const;
export const ToastDefaultPosition: ToastPosition = "bottom";

export let ToastQueue: ToastQueueType = { queue: [] };
