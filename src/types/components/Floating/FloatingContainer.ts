import type { SafeAreaViewProps } from "react-native-safe-area-context";

export type FloatingContainerProps = Omit<SafeAreaViewProps, "mode"> & {
  mode?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right"
    | "middle-left"
    | "middle-center"
    | "middle-right";
};
