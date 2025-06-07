import {
  type DefaultError,
  type QueryClient,
  type QueryKey,
  useSuspenseQuery,
} from '@tanstack/react-query';
import type {
  UseSuspenseQueryCustomOptions,
  UseSuspenseQueryCustomResult,
} from '../types/hooks';

export function useSuspenseQueryCustom<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  {
    queryKey,
    queryFn,
    enabled,
    ...rest
  }: UseSuspenseQueryCustomOptions<TQueryFnData, TError, TData, TQueryKey>,
  queryClient?: QueryClient
): UseSuspenseQueryCustomResult<TData, TError> {
  if (!enabled) {
    queryKey = ['!enabled'] as any;
    queryFn = async () => null as any;
  }
  const query = useSuspenseQuery({ ...rest, queryKey, queryFn }, queryClient);
  return { ...query, enabled } as any;
}
