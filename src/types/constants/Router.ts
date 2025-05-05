import { Stack, Tabs } from "expo-router";
import { Params } from "../../types/models";

export type RouterPropsParam = {
  StackProps: Params<typeof Stack>;
  TabsProps: Params<typeof Tabs>;
};
