import { Stack as StackExpo } from 'expo-router';
import { forwardRef, useMemo } from 'react';
import { RouterProps } from '../../constants/Router';
import type { Params } from '../../types/models';
import { mergeDeepPreferTarget } from '../../utils';

export const StackCommon: typeof StackExpo = Object.assign(
  forwardRef(
    (
      props: Params<typeof StackExpo>,
      ref: React.ForwardedRef<typeof StackExpo>
    ) => {
      const mergedProps = useMemo(
        () => mergeDeepPreferTarget(props, RouterProps.StackProps),
        [props]
      );
      return <StackExpo ref={ref} {...mergedProps} />;
    }
  ),
  {
    Screen: StackExpo.Screen,
    Protected: StackExpo.Protected,
  }
) as typeof StackExpo;
