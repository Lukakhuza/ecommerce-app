import FavoriteIcon from "../atoms/FavoriteIcon";
import { Pressable, Text, Image, StyleSheet, View } from "react-native";
import { ProductsContext } from "../../store/products-context";
import { useNavigation } from "@react-navigation/native";
import { FavoritesContext } from "../../store/favorites-context";

import { useContext } from "react";
import { FlatList } from "react-native";

import { Colors } from "../../constants/colors";
import ProductItem from "../molecules/ProductItem";
import { isEthereumAddress } from "validator";

const ProductList = ({ selection, headerTextStyle }: any) => {
  const navigation: any = useNavigation();
  const { products, updateSelectedCategory }: any = useContext(ProductsContext);
  const { favorites, addFavorite, removeFavorite }: any =
    useContext(FavoritesContext);

  const favoritesPressHandler = (id: String) => {
    if (!favorites.includes(id)) {
      addFavorite(id);
    } else {
      removeFavorite(id);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.headerText, headerTextStyle]}>{selection}</Text>
        <Pressable
          onPress={() => {
            updateSelectedCategory("All");
            navigation.navigate("Welcome");
          }}
        >
          <Text style={styles.seeAllText}>See All</Text>
        </Pressable>
      </View>
      <FlatList
        horizontal={true}
        data={products}
        renderItem={(itemData) => {
          const item = itemData.item;
          return (
            <ProductItem
              itemData={itemData}
              onPress={() => {
                navigation.navigate("ProductDetails", {
                  product: item,
                });
              }}
              onFavoritesPress={() => {
                favoritesPressHandler(item.id);
              }}
              favoritesIcon={
                favorites.includes(item.id) ? "heart" : "heart-outline"
              }
            />
          );
        }}
      />
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    flex: 5,
    marginHorizontal: 5,
    paddingHorizontal: 10,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-between",
  },
  headerText: { fontSize: 21, fontWeight: 700 },
  seeAllText: { fontSize: 17 },
});
