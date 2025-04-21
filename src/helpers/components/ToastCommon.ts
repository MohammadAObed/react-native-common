import Toast, { ToastShowParams } from "react-native-toast-message";
import { ToastVisibilityTime } from "../../constants";
import { getRandomNumber } from "../../utils";

export const showToast = ({ visibilityTime, autoHide, ...rest }: ToastShowParams) => {
  visibilityTime = visibilityTime ?? ToastVisibilityTime.DEFAULT;
  Toast.show({
    ...rest,
    visibilityTime,
    autoHide,
    props: { Id: getRandomNumber(1, Number.MAX_SAFE_INTEGER), visibilityTime, autoHide },
  });
};
