import { Pressable, Text, Image, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";

const CartItem = ({ itemData, imageUri, onAddItem, onRemoveItem }: any) => {
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.image}
          source={{
            uri: imageUri,
          }}
        />
      </View>
      <View style={styles.itemInfoContainer}>
        <View>
          <View style={styles.titleContainer}>
            <Text numberOfLines={1}>{itemData.item.product.title}</Text>
          </View>
          <View style={styles.itemDescContainer}>
            <View style={styles.itemDesc}>
              <Text style={styles.itemDescLabel}>Id: </Text>
              <Text>{itemData.item.product.id}</Text>
            </View>
            <View style={styles.itemDesc}>
              <Text style={styles.itemDescLabel}>Price: </Text>
              <Text>${itemData.item.product.price.toFixed(2)}</Text>
            </View>
            <View style={styles.itemDesc}>
              <Text style={styles.itemDescLabel}>Qty: </Text>
              <Text>{itemData.item.quantity}</Text>
            </View>
          </View>
        </View>
        <View>
          <View style={styles.priceContainer}>
            <Text>
              $
              {(itemData.item.product.price * itemData.item.quantity).toFixed(
                2
              )}
            </Text>
          </View>
          <View style={styles.buttonsContainer}>
            <Ionicons
              name="remove-circle"
              size={35}
              color={Colors.blue100}
              onPress={onRemoveItem}
            />
            <Ionicons
              name="add-circle"
              size={35}
              color={Colors.blue100}
              onPress={onAddItem}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.bgLight2,
    height: 80,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  image: {
    width: 40,
    height: 40,
  },
  itemInfoContainer: {
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  titleContainer: { width: 190 },
  itemDescContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 10,
  },
  itemDesc: {
    flexDirection: "row",
  },
  itemDescLabel: {
    fontWeight: 800,
  },
  buttonsContainer: { flexDirection: "row" },
  priceContainer: { marginLeft: 5 },
});
