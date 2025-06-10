import { Suspense } from "react";
import { Loading } from "../Loading";

export const withSuspense = <P,>(Component: React.FC<P>, fallback = <Loading />) => {
  return (props: P) => (
    <Suspense fallback={fallback}>
      <Component {...(props as any)} />
    </Suspense>
  );
};
