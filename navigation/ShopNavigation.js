import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../constants/Colors";

import ProductOverviewScreen, {
  productOverviewScreenOptions,
} from "../screens/shop/ProductOverviewScreen";
import ProductDetailScreen, {
  productDetailScreenOptions,
} from "../screens/shop/ProductDetailScreen";

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
        options={productOverviewScreenOptions}
      />
      <ProductStack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={productDetailScreenOptions}
      />
    </ProductStack.Navigator>
  );
}
