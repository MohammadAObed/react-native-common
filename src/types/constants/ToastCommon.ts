export type ToastQueueType = {
  queue: ToastQueueOnHold[];
};
type ToastQueueOnHold = { showToast: () => void };
