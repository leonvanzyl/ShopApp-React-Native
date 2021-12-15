import React from "react";
// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { ShopNavigator, AuthNavigator } from "./ShopNavigator";
// Redux
import { useSelector } from "react-redux";

// Screens
import StartupScreen from "../screens/StartupScreen";

function AppNavigator(props) {
  const isAuth = useSelector((state) => !!state.auth.token);
  const didTryAutoLogin = useSelector((state) => !!state.auth.didTryAutoLogin);
  return (
    <NavigationContainer>
      {isAuth && <ShopNavigator />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
}

export default AppNavigator;
