import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  FlatList,
} from "react-native";
import PurpleButtonSmall from "../../../components/atoms/PurpleButtonSmall";
import { AuthContext } from "../../../store/auth-context";
import { useContext, useEffect, useState } from "react";
import { fetchProductsData } from "../../../api/products.api";
import { UserInputContext } from "../../../store/user-input-context";
import { Colors } from "../../../constants/colors";
import { FavoritesContext } from "../../../store/favorites-context";
import { ProductsContext } from "../../../store/products-context";
import LoadingOverlay from "../../../components/atoms/LoadingOverlay";
import { filter } from "lodash";
import { wait } from "../../../util/helpers";

type Props = {
  navigation: any;
};

const Favorites = ({ navigation }: Props) => {
  const authCtx: any = useContext(AuthContext);
  const userInputCtx: any = useContext(UserInputContext);
  const { favorites }: any = useContext(FavoritesContext);
  const [filteredProds, setFilteredProds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProductsData = async () => {
      const productsData = await fetchProductsData();
      const filteredProducts = productsData.filter((productData: any) => {
        if (favorites.includes(productData.id)) {
          return true;
        } else {
          return false;
        }
      });
      setFilteredProds(filteredProducts);
      await wait(500);
      setIsLoading(false);
    };
    getProductsData();
  }, []);

  if (isLoading) {
    return <LoadingOverlay message="Loading Favorites..." />;
  }

  let content = <View></View>;

  if (filteredProds.length === 0) {
    content = <Text style={styles.noFavorites}>No Favorites Selected</Text>;
  }

  return (
    <View
      style={{
        backgroundColor: Colors.primary100,
        // alignItems: "center",
        // justifyContent: "center",
      }}
    >
      <View style={styles.fl}>
        <View style={styles.header}></View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {content}
        </View>
        <FlatList
          data={filteredProds}
          renderItem={(itemData: any) => {
            return (
              <Pressable
                style={styles.productContainer}
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
            );
          }}
          keyExtractor={(item: any, index) => {
            return item.id;
          }}
          numColumns={2}
          contentContainerStyle={{
            padding: 15,
          }}
        />
      </View>
      <View>
        <PurpleButtonSmall
          onPress={() => {
            userInputCtx.resetInputs();
            authCtx.logout();
          }}
          disabled={false}
        >
          Log Out
        </PurpleButtonSmall>
      </View>
    </View>
  );
};

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    height: 400,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: Colors.bgLight2,
  },
  favIcon: {
    position: "absolute",
    right: 15,
    top: 15,
    zIndex: 1,
  },
  noFavorites: {
    // flex: 1,
    // marginTop: 100,
    color: Colors.white100,
    // textDecorationLine: "",
    justifyContent: "center",
    textAlign: "center",
    marginHorizontal: 30,
    marginBottom: 10,
    fontSize: 21,
    fontWeight: 700,
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
    flex: 1,
    backgroundColor: Colors.white100,
    margin: 10,
    padding: 10,
    borderRadius: 20,
  },
  flatlistContainer: {
    // marginBottom: 30,
  },
  fl: {
    // flex: 2,
    // flexGrow: 600,
    height: 840,
  },
});

export default Favorites;
