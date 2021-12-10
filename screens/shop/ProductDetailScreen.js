import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

const ProductDetailScreen = (props) => {
  const productId = props.route.params.productId;
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId)
  );
  return (
    <View>
      <Text>{selectedProduct.title}</Text>
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({});

export const productDetailScreenOptions = (data) => {
  const title = data.route.params.productTitle;

  return {
    title: title,
  };
};
