import { ErrorCommon } from "../models";

export {}; // To ensure the file is treated as a module

declare global {
  interface Promise<T> {
    then<U>(onFulfilled?: ((value: T) => U | PromiseLike<U>) | null, onRejected?: (reason: any) => any): Promise<U>;
  }
}

const originalThen = Promise.prototype.then;
Promise.prototype.then = function (onFulfilled: any, onRejected: any) {
  return originalThen.call(this, onFulfilled, (err: unknown) => {
    if (err instanceof ErrorCommon) ErrorCommon.exceptionhandler(err, false);
    if (onRejected) return onRejected(err);
    throw err;
  });
};
