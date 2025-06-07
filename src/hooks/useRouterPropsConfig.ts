import { useMemo } from 'react';
import { RouterProps } from '../constants/Router';
import type { RouterPropsParam } from '../types/constants';
import { mergeDeepPreferTarget } from '../utils';

export const useRouterPropsConfig = <
  T extends keyof RouterPropsParam,
  R extends RouterPropsParam[T],
>(
  navigatorKey: T,
  props: R
) => {
  RouterProps[navigatorKey] = useMemo(
    () => mergeDeepPreferTarget(props, RouterProps[navigatorKey] as R),
    [props, navigatorKey]
  );
};
