import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import PurpleButtonSmall from "../../../components/atoms/PurpleButtonSmall";
import { AuthContext } from "../../../store/auth-context";
import { useContext, useEffect, useState } from "react";
import { fetchProductsData } from "../../../api/products.api";
import { UserInputContext } from "../../../store/user-input-context";
import { Colors } from "../../../constants/colors";
import FavoriteIcon from "../../../components/atoms/FavoriteIcon";
import { Ionicons } from "@expo/vector-icons";
import { FavoritesContext } from "../../../store/favorites-context";
import { ProductsContext } from "../../../store/products-context";
import { jsx } from "react/jsx-runtime";

type Props = {
  navigation: any;
};

const Welcome = ({ navigation }: Props) => {
  const authCtx: any = useContext(AuthContext);
  const userInputCtx: any = useContext(UserInputContext);
  const favoritesCtx: any = useContext(FavoritesContext);
  const productsCtx: any = useContext(ProductsContext);
  const [fetchedUserData, setFetchedUserData] = useState([]);
  const [fetchedProductsData, setFetchedProductsData] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      //   const userData = await fetchData();
      //   setFetchedUserData(userData);
    };

    getUserData();
  }, []);

  useEffect(() => {
    const getProductsData = async () => {
      const productsData = await fetchProductsData();
      setFetchedProductsData(productsData);
    };
    getProductsData();
  }, []);

  const filteredProducts = fetchedProductsData.filter((productData: any) => {
    let categoryProductIds: Number[] = [];
    if (productsCtx.selectedCategory === "Jackets") {
      categoryProductIds = [3, 15, 16, 17];
    } else if (productsCtx.selectedCategory === "Tops") {
      categoryProductIds = [2, 4, 18, 19, 20];
    } else if (productsCtx.selectedCategory === "Tech") {
      categoryProductIds = [9, 10, 11, 12, 13, 14];
    } else if (productsCtx.selectedCategory === "Jewelry") {
      categoryProductIds = [5, 6, 7, 8];
    } else if (productsCtx.selectedCategory === "Other") {
      categoryProductIds = [1];
    }

    if (
      categoryProductIds.includes(productData.id) ||
      productsCtx.selectedCategory === "All"
    ) {
      return true;
    } else {
      return false;
    }
  });

  return (
    <View
    //  style={{ backgroundColor }}
    >
      <View style={styles.fl}>
        <Text style={styles.category}>
          {" "}
          {productsCtx.selectedCategory} ({filteredProducts.length})
        </Text>
        <FlatList
          data={filteredProducts}
          renderItem={(itemData: any) => {
            return (
              <View style={styles.productContainer}>
                <View style={styles.favIcon}>
                  <FavoriteIcon
                    name={
                      favoritesCtx.favorites.includes(itemData.item.id)
                        ? "heart"
                        : "heart-outline"
                    }
                    size={30}
                    color={Colors.black}
                    onPress={() => {
                      if (!favoritesCtx.favorites.includes(itemData.item.id)) {
                        favoritesCtx.addFavorite(itemData.item.id);
                      } else {
                        favoritesCtx.removeFavorite(itemData.item.id);
                      }
                    }}
                  />
                </View>
                <Pressable
                  onPress={() => {
                    navigation.navigate("ProductDetails", {
                      product: itemData.item,
                    });
                  }}
                >
                  <Image
                    source={{ uri: itemData.item.image }}
                    style={styles.image}
                  />
                  <Text numberOfLines={1}>{itemData.item.title}</Text>
                  <Text>{`$${itemData.item.price}`}</Text>
                </Pressable>
              </View>
            );
          }}
          keyExtractor={(item: any, index) => {
            return item.id;
          }}
          numColumns={2}
          contentContainerStyle={{
            // alignItems: "stretch",
            padding: 15,
            // rowGap: 10,
            // columnGap: 0,
            // alignContent: "flex-end",
          }}
        />
      </View>
      <View>
        <PurpleButtonSmall
          onPress={() => {
            userInputCtx.resetInputs();
            authCtx.logout();
          }}
        >
          Log Out
        </PurpleButtonSmall>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 400,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: Colors.bgLight2,
    // marginBottom: 30,
  },
  favIcon: {
    position: "absolute",
    right: 15,
    top: 15,
    zIndex: 1,
    // top: 10,
  },
  category: {
    marginLeft: 30,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 500,
  },
  header: {
    height: 100,
  },
  test: {
    color: Colors.black,
    fontSize: 30,
  },
  image: {
    width: "100%",
    height: 300,
    zIndex: 0,
    overflow: "hidden",
    resizeMode: "contain",
  },
  productContainer: {
    // width: "30%",
    flex: 1,
    backgroundColor: Colors.bgLight2,
    margin: 10,
    padding: 10,
    borderRadius: 20,
  },
  flatlistContainer: {
    // marginBottom: 30,
  },
  fl: {
    // borderWidth: 3,
    paddingTop: 10,
    marginTop: 30,
    // flex: 2,
    // flexGrow: 600,
    height: 665,
  },
});

export default Welcome;
