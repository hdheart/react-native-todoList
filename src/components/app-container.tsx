import * as React from "react";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import theme from "../theme";

type Props = {
  children: React.ReactNode;
};

export default function AppContainer(props: Props) {
  const navigationRef = useNavigationContainerRef();
  return (
    <NavigationContainer ref={navigationRef}>
      <NativeBaseProvider theme={theme}>{props.children}</NativeBaseProvider>
    </NavigationContainer>
  );
}
