import React from "react";
import History from "./components/history.js";
import Calculator from "./components/calculator.js";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

export default function App() {
  const AppNavigator = createStackNavigator({
    Calculator: { screen: Calculator },
    History: { screen: History }
  });

  const AppContainer = createAppContainer(AppNavigator);

  return <AppContainer />;
}
