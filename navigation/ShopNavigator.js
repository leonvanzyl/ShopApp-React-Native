import React from "react";
import { Platform, SafeAreaView, View, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Redux
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";

// Navigators
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";

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

// Default screenOptions
const defaultScreenOptions = {
  headerStyle: { backgroundColor: Colors.primary },
  headerTintColor: "white",
  headerTitleStyle: { fontFamily: "open-sans-bold" },
  headerBackTitleStyle: { fontFamily: "open-sans" },
};

// Orders Stack Navigator
const OrdersStack = createStackNavigator();
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
const AuthStack = createStackNavigator();
export function AuthNavigator() {
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
const UserProductsStack = createStackNavigator();
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
const ProductStack = createStackNavigator();
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
const MainDrawer = createDrawerNavigator();
export function ShopNavigator() {
  const dispatch = useDispatch();

  return (
    <MainDrawer.Navigator
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 80 }}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <DrawerItemList {...props} />
              <Button
                title="Logout"
                color={Colors.primary}
                onPress={() => {
                  dispatch(authActions.logout());
                  // props.navigation.navigate("Auth");
                }}
              ></Button>
            </SafeAreaView>
          </View>
        );
      }}
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
          drawerIcon: (props) => {
            return (
              <Ionicons
                name={Platform.OS === "android" ? "md-list" : "ios-list"}
                size={23}
                color={props.color}
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
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <MainDrawer.Screen
        name="Admin"
        component={UserProductsNavigator}
        options={{
          title: "Admin",
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
    </MainDrawer.Navigator>
  );
}
