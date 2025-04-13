/**
 * this wrapper is used so any async function can be caught by 'extensions/Promise.ts' promise rejection
 */
export const awaitAsync = <T extends (...args: any[]) => Promise<any>>(fn: T): T =>
  (async (...args: Parameters<T>): Promise<ReturnType<T>> => await fn(...args)) as T;
