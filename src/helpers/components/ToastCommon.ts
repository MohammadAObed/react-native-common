import Toast, { ToastShowParams } from "react-native-toast-message";

export const showToast = ({ ...rest }: ToastShowParams) => {
  Toast.show({
    ...rest,
  });
};
