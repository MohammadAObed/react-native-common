import { Stack as StackExpo } from "expo-router";
import { forwardRef, useMemo } from "react";
import { RouterProps } from "../../constants/Router";
import { Params } from "../../types/models";
import { mergeDeepPreferTarget } from "../../utils";

export const StackCommon: typeof StackExpo = forwardRef((props: Params<typeof StackExpo>, ref: React.ForwardedRef<typeof StackExpo>) => {
  const mergedProps = useMemo(() => mergeDeepPreferTarget(props, RouterProps.StackProps), [props]);
  return <StackExpo ref={ref} {...mergedProps}></StackExpo>;
}) as typeof StackExpo;

StackCommon.Screen = StackExpo.Screen;
