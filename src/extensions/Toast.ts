import Toast, { ToastShowParams } from "react-native-toast-message";
import { ToastDelay, ToastVisibilityTime } from "../constants";

export {}; // To ensure the file is treated as a module

let nextAvailableTime = Date.now();
const originalShow = Toast.show;
Toast.show = function (params: ToastShowParams) {
  const duration = params.visibilityTime ?? ToastVisibilityTime.DEFAULT;
  const now = Date.now();
  const showToast = () => {
    originalShow(params);
  };
  if (now >= nextAvailableTime) {
    nextAvailableTime = now;
    showToast();
  } else {
    const delay = nextAvailableTime - now;
    setTimeout(showToast, delay);
  }
  nextAvailableTime += duration + ToastDelay;
};
