import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

// Custom Components
import ProductItem from "../../components/shop/ProductItem";

// Redux
import { useSelector } from "react-redux";

const ProductOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          title={itemData.item.title}
          image={itemData.item.imageUrl}
          price={itemData.item.price}
          onViewDetail={() => {
            props.navigation.navigate("ProductDetail", {
              productId: itemData.item.id,
              productTitle: itemData.item.title,
            });
          }}
          onAddToCart={() => {}}
        />
      )}
    />
  );
};

export default ProductOverviewScreen;

const styles = StyleSheet.create({});

export const productOverviewScreenOptions = {
  title: "Product Overview",
};
