import { DefaultError, QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from "@tanstack/react-query";

export type UseSuspenseQueryCustomOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
> = Omit<UseSuspenseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, "data"> &
  ({ enabled?: true; data?: TData } | { enabled: false; data?: null });

export type UseSuspenseQueryCustomResult<TData = unknown, TError = DefaultError> = Omit<UseSuspenseQueryResult<TData, TError>, "data"> &
  ({ enabled?: true; data: TData } | { enabled: false; data: null });
