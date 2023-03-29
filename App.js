import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./src/components/Navigator";

export default function App() {
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
}