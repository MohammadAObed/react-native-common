import { Theme } from "@react-navigation/native";
import { PropsWithChildren } from "react";
import { View } from "react-native";

export class ExpoRouterBugHelper {
  /** Fixes White flicker occurs navigating between screens, its most noticeable in dark mode/colors. It occured on: navigating from a TabScreen To StackScreen outside the TabScreen  */
  static NavigatingScreenWhiteFlicker = ({ children, NavigationTheme }: PropsWithChildren & { NavigationTheme: Theme }) => {
    return <View style={{ flex: 1, backgroundColor: NavigationTheme.colors.background }}>{children}</View>;
  };
}
