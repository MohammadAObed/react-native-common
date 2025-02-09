import { useState } from "react";
import { LayoutRectangle, ViewProps } from "react-native";

export const useLayout = () => {
  const [layout, setLayout] = useState<LayoutRectangle>();

  const onLayout: ViewProps["onLayout"] = (event) => {
    setLayout(event.nativeEvent.layout);
  };

  return {
    layout,
    onLayout,
  };
};
