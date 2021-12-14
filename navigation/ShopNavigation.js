import React from "react";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Navigators
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Constants
import Colors from "../constants/Colors";

// Custom Screens and Components
import ProductOverviewScreen, {
  productOverviewScreenOptions,
} from "../screens/shop/ProductOverviewScreen";
import ProductDetailScreen, {
  productDetailScreenOptions,
} from "../screens/shop/ProductDetailScreen";
import CartScreen, { cartScreenOptions } from "../screens/shop/CartScreen";
import OrdersScreen, {
  ordersScreenOptions,
} from "../screens/shop/OrdersScreen";
import UserProductsScreen, {
  userProductsScreenOptions,
} from "../screens/user/UserProductsScreen";
import EditProductScreen, {
  editProductScreenOptions,
} from "../screens/user/EditProductScreen";
import AuthScreen, { authScreenOptions } from "../screens/user/AuthScreen";

const OrdersStack = createStackNavigator();
const ProductStack = createStackNavigator();
const UserProductsStack = createStackNavigator();
const AuthStack = createStackNavigator();
const MainDrawer = createDrawerNavigator();

// Default screenOptions
const defaultScreenOptions = {
  headerStyle: { backgroundColor: Colors.primary },
  headerTintColor: "white",
  headerTitleStyle: { fontFamily: "open-sans-bold" },
  headerBackTitleStyle: { fontFamily: "open-sans" },
};

// Orders Stack Navigator
function OrdersNavigator() {
  return (
    <OrdersStack.Navigator screenOptions={defaultScreenOptions}>
      <OrdersStack.Screen
        name="Orders"
        component={OrdersScreen}
        options={ordersScreenOptions}
      />
    </OrdersStack.Navigator>
  );
}

// Auth Navigator
function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={defaultScreenOptions}>
      <AuthStack.Screen
        name="Auth"
        component={AuthScreen}
        options={authScreenOptions}
      />
    </AuthStack.Navigator>
  );
}

// User Stack Navigator
function UserProductsNavigator() {
  return (
    <UserProductsStack.Navigator screenOptions={defaultScreenOptions}>
      <UserProductsStack.Screen
        name="UserProducts"
        component={UserProductsScreen}
        options={userProductsScreenOptions}
      />
      <UserProductsStack.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={editProductScreenOptions}
      />
    </UserProductsStack.Navigator>
  );
}

// Product Stack Navigator
function ProductNavigator() {
  return (
    <ProductStack.Navigator screenOptions={defaultScreenOptions}>
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
      <ProductStack.Screen
        name="Cart"
        component={CartScreen}
        options={cartScreenOptions}
      />
    </ProductStack.Navigator>
  );
}

// Main Drawer Navigator
function MainDrawerNavigator() {
  return (
    <MainDrawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: Colors.primary,
      }}
    >
      <MainDrawer.Screen
        name="ProductsDrawer"
        component={ProductNavigator}
        options={{
          title: "Products",
          drawerIcon: (drawerConfig) => {
            return (
              <Ionicons
                name={Platform.OS === "android" ? "md-list" : "ios-list"}
                size={23}
                color={drawerConfig.color}
              />
            );
          },
        }}
      />
      <MainDrawer.Screen
        name="OrdersDrawer"
        component={OrdersNavigator}
        options={{
          title: "Your Orders",
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              size={23}
              color={drawerConfig.color}
            />
          ),
        }}
      />
      <MainDrawer.Screen
        name="Admin"
        component={UserProductsNavigator}
        options={{
          title: "Admin",
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={23}
              color={drawerConfig.color}
            />
          ),
        }}
      />
    </MainDrawer.Navigator>
  );
}

const ShopStackNavigator = createStackNavigator();

export function ShopNavigator() {
  return (
    <ShopStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <ShopStackNavigator.Screen name="auth" component={AuthNavigator} />
      <ShopStackNavigator.Screen name="shop" component={MainDrawerNavigator} />
    </ShopStackNavigator.Navigator>
  );
}

// export function ShopNavigator() {
//   // return <MainDrawerNavigator />;
//   return <AuthNavigator />;
// }

// export function ShopNavigator() {
//   return (
//     <ProductStack.Navigator
//       screenOptions={{
//         headerStyle: { backgroundColor: Colors.primary },
//         headerTintColor: "white",
//         headerTitleStyle: { fontFamily: "open-sans-bold" },
//         headerBackTitleStyle: { fontFamily: "open-sans" },
//       }}
//     >
//       <ProductStack.Screen
//         name="ProductOverview"
//         component={ProductOverviewScreen}
//         options={productOverviewScreenOptions}
//       />
//       <ProductStack.Screen
//         name="ProductDetail"
//         component={ProductDetailScreen}
//         options={productDetailScreenOptions}
//       />
//       <ProductStack.Screen
//         name="Cart"
//         component={CartScreen}
//         options={cartScreenOptions}
//       />
//     </ProductStack.Navigator>
//   );
// }
