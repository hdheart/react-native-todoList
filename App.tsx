import React from "react";
import AppContainer from "./src/components/app-container";
import Navigator from "./src/index";
import 'react-native-gesture-handler'

export default function App() {
  return (
    <AppContainer>
      <Navigator />
    </AppContainer>
  );
}
