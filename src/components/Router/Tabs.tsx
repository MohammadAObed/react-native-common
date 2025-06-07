import { Tabs as TabsExpo } from 'expo-router';
import { forwardRef, useMemo } from 'react';
import { RouterProps } from '../../constants/Router';
import type { Params } from '../../types/models';
import { mergeDeepPreferTarget } from '../../utils';

export const Tabs: typeof TabsExpo = Object.assign(
  forwardRef(
    (
      props: Params<typeof TabsExpo>,
      ref: React.ForwardedRef<typeof TabsExpo>
    ) => {
      const mergedProps = useMemo(
        () => mergeDeepPreferTarget(props, RouterProps.TabsProps),
        [props]
      );
      return <TabsExpo ref={ref} {...mergedProps} />;
    }
  ),
  {
    Screen: TabsExpo.Screen,
  }
) as typeof TabsExpo;
