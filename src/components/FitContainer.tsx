import { View } from "react-native";
import { Text } from "react-native-paper";
import { commonStyles } from "../styles";
import type { FitContainerProps } from "../types/components";
import { isValidComponent } from "../utils";

export const FitContainer = ({ children, style, center = false }: FitContainerProps) => {
  if (!isValidComponent(children)) {
    children = <Text>{children}</Text>;
  }

  return <View style={[commonStyles.fitContainer, center && commonStyles.centerContainerContent, style]}>{children}</View>;
};
