import { useRef } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export const useScrollTo = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollToRef = useRef<View>(null);

  const scrollTo = (scrollToComponent?: React.RefObject<View | null>) => {
    if (!scrollToComponent) scrollToComponent = scrollToRef;
    if (scrollViewRef.current && scrollToComponent?.current) {
      scrollToComponent.current.measure((_x, y) => {
        scrollViewRef.current?.scrollTo({ y: y + 30, animated: true });
      });
    }
  };

  return { scrollToRef, scrollViewRef, scrollTo };
};
