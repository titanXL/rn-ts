import * as React from "react";
import { AuthStackParamList } from "./App";
import { NavigationContainerRef } from "@react-navigation/native";

export const navigationRef = React.createRef<NavigationContainerRef>();

export function navigate(
  name: keyof AuthStackParamList,
  params?: AuthStackParamList[typeof name]
) {
  navigationRef.current?.navigate(name, params);
}
