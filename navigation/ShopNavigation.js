import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../constants/Colors";

import ProductOverviewScreen, {
  screenOptions,
} from "../screens/shop/ProductOverviewScreen";

const ProductStack = createStackNavigator();

export function ShopNavigator() {
  return (
    <ProductStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: "white",
      }}
    >
      <ProductStack.Screen
        name="ProductOverview"
        component={ProductOverviewScreen}
        options={screenOptions}
      />
    </ProductStack.Navigator>
  );
}
