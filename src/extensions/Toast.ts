import Toast, { type ToastShowParams } from 'react-native-toast-message';
import { ToastQueue } from '../constants';

export {}; // To ensure the file is treated as a module

const originalShow = Toast.show;
Toast.show = function (params: ToastShowParams) {
  const showToast = () => {
    originalShow(params);
    return;
  };
  if (ToastQueue.queue.length === 0) {
    showToast();
  }
  ToastQueue.queue.push({ showToast });
};
