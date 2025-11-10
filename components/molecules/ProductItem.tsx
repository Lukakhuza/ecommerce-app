import FavoriteIcon from "../atoms/FavoriteIcon";
import { Pressable, Text, Image, StyleSheet, View } from "react-native";
import { Colors } from "../../constants/colors";

const ProductItem = ({
  itemData,
  onPress,
  onFavoritesPress,
  favoritesIcon,
}: any) => {
  return (
    <View style={styles.productContainer}>
      <View style={styles.favIcon}>
        <FavoriteIcon
          name={favoritesIcon}
          size={30}
          color={Colors.black}
          onPress={onFavoritesPress}
        />
      </View>
      <Pressable onPress={onPress}>
        <Image source={{ uri: itemData.item.image }} style={styles.image1} />
        <Text numberOfLines={1}>{itemData.item.title}</Text>
        <Text style={{ fontWeight: 700 }}>{`$${itemData.item.price}`}</Text>
      </Pressable>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  productContainer: {
    flex: 1,
    backgroundColor: Colors.bgLight2,
    height: "auto",
    width: 150,
    margin: 10,
    padding: 20,
    borderRadius: 20,
  },
  favIcon: { position: "absolute", right: 15, top: 15, zIndex: 1 },
  image1: {
    width: "100%",
    marginTop: 25,
    marginBottom: 10,
    height: 120,
    zIndex: 0,
    overflow: "hidden",
    resizeMode: "contain",
  },
});
