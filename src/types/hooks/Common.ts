export type QueryFnResult<T> = { isNew: true; result: null } | { isNew: false; result: T };
