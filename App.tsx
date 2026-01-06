import React from "react";

import { createStaticNavigation } from "@react-navigation/native";
import { RootStack } from "./src/navigation/rootNavigation";
import { PaperProvider } from "react-native-paper";

export default function App() {
  const Navigation = createStaticNavigation(RootStack);

  return (
    <PaperProvider>
      <Navigation />
    </PaperProvider>
  );
}
