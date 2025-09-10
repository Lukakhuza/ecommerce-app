import { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  SafeAreaView,
} from "react-native";
import { ProductsContext } from "../../store/products-context";
import { Colors } from "../../constants/colors";

type Props = {
  navigation: any;
};

const Categories = ({ navigation }: Props) => {
  const productsCtx: any = useContext(ProductsContext);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Shop by Categories</Text>
        <ScrollView style={styles.categoriesContainer}>
          <Pressable
            onPress={() => {
              productsCtx.updateSelectedCategory("Jackets");
              navigation.navigate("Welcome");
            }}
            style={styles.category}
          >
            <View style={styles.imageContainer}>
              {productsCtx.products.length > 0 && (
                <Image
                  source={{ uri: productsCtx.products[2]?.image }}
                  style={styles.image}
                />
              )}
            </View>
            <View>
              <Text style={styles.label}>Jackets</Text>
            </View>
          </Pressable>
          <Pressable
            style={styles.category}
            onPress={() => {
              productsCtx.updateSelectedCategory("Tops");
              navigation.navigate("Welcome");
            }}
          >
            <View style={styles.imageContainer}>
              {productsCtx.products.length > 0 && (
                <Image
                  source={{ uri: productsCtx.products[1].image }}
                  style={styles.image}
                />
              )}
            </View>
            <Text style={styles.label}>Tops</Text>
          </Pressable>
          <Pressable
            style={styles.category}
            onPress={() => {
              productsCtx.updateSelectedCategory("Tech");
              navigation.navigate("Welcome");
            }}
          >
            <View style={styles.imageContainer}>
              {productsCtx.products.length > 0 && (
                <Image
                  source={{ uri: productsCtx.products[8].image }}
                  style={styles.image}
                />
              )}
            </View>
            <Text style={styles.label}>Tech</Text>
          </Pressable>
          <Pressable
            style={styles.category}
            onPress={() => {
              productsCtx.updateSelectedCategory("Jewelry");
              navigation.navigate("Welcome");
            }}
          >
            <View style={styles.imageContainer}>
              {productsCtx.products.length > 0 && (
                <Image
                  source={{ uri: productsCtx.products[6].image }}
                  style={styles.image}
                />
              )}
            </View>
            <Text style={styles.label}>Jewelry</Text>
          </Pressable>
          <Pressable
            style={styles.category}
            onPress={() => {
              productsCtx.updateSelectedCategory("Other");
              navigation.navigate("Welcome");
            }}
          >
            <View style={styles.imageContainer}>
              {productsCtx.products.length > 0 && (
                <Image
                  source={{ uri: productsCtx.products[0].image }}
                  style={styles.image}
                />
              )}
            </View>
            <Text style={styles.label}>Other</Text>
          </Pressable>
        </ScrollView>
      </View>
      <View></View>
    </SafeAreaView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {},
  categories: {
    height: 840,
  },
  title: {
    marginLeft: 30,
    marginTop: 40,
    fontSize: 25,
    fontWeight: 500,
  },
  label: {
    fontSize: 17,
    marginLeft: 10,
  },
  categoriesContainer: {
    display: "flex",
    flexDirection: "column",
    marginHorizontal: 20,
    paddingVertical: 10,
  },
  category: {
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    // backgroundColor: Colors.white100,
    height: 80,
    borderRadius: 20,
  },
  image: {
    flex: 1,
    overflow: "hidden",
    resizeMode: "contain",
  },
  imageContainer: {
    height: 40,
    width: 40,
    marginLeft: 20,
    marginRight: 10,
    marginVertical: 5,
  },
});
