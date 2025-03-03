import { Loading } from "@mohammad_obed/react-native-common/src/components/Loading";
import { Suspense } from "react";

const withSuspense = <P,>(Component: React.FC<P>, fallback = <Loading />) => {
  return (props: P) => (
    <Suspense fallback={fallback}>
      <Component {...(props as any)} />
    </Suspense>
  );
};

export default withSuspense;
