import { useContext } from "react";
import { Pressable, Image, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ProductsContext } from "../../store/products-context";

type Props = {
  category: string;
  imageId: string;
};

const CategoryButton = ({ category, imageId }: Props) => {
  const productsCtx: any = useContext(ProductsContext);
  const navigation: any = useNavigation();
  return (
    <Pressable
      onPress={() => {
        productsCtx.updateSelectedCategory(category);
        navigation.navigate("Welcome");
      }}
      style={styles.category}
    >
      <View style={styles.imageContainer}>
        {productsCtx.products.length > 0 && (
          <Image
            source={{ uri: productsCtx.products[imageId].image }}
            style={styles.image}
          />
        )}
      </View>
      <View>
        <Text style={styles.label}>{category}</Text>
      </View>
    </Pressable>
  );
};

export default CategoryButton;

const styles = StyleSheet.create({
  label: {
    fontSize: 17,
    marginLeft: 10,
  },
  image: {
    // width: "100%",
    // height: 50,
    flex: 1,
    // zIndex: 10,
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
  category: {
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    // justifyContent: "flex-start",
    // borderColor: Colors.orange100,
    // borderWidth: 5,
    // alignItems: "flex-start",
    // alignContent: "flex-start",
    // alignItems: "ce?nter",
    // justifyContent: "center",
    // backgroundColor: Colors.white100,
    height: 80,
    // width:
    borderRadius: 20,
  },
});
