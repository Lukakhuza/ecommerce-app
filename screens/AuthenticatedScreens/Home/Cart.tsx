import {
  FlatList,
  Image,
  SafeAreaView,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import LoadingOverlay from "../../../components/atoms/LoadingOverlay";
import PurpleButtonSmall from "../../../components/atoms/PurpleButtonSmall";
import { ProductsContext } from "../../../store/products-context";
import { useContext } from "react";
import CartItem from "../../../components/molecules/CartItem";
import { CartContext } from "../../../store/cart-context";
import { Colors } from "../../../constants/colors";
const parcelImage = require("../../../assets/parcel.png");

type Props = {
  navigation: any;
};

const Cart = ({ navigation }: Props) => {
  const productsCtx: any = useContext(ProductsContext);
  const { cartItems, addItem, removeItem, clearCart, isLoading }: any =
    useContext(CartContext);

  let subtotal = 0;
  for (let i = 0; i < cartItems.length; i++) {
    subtotal += cartItems[i].product.price * cartItems[i].quantity;
  }

  let shippingCost = 8;
  let taxAmount = 0;
  let total = subtotal + shippingCost + taxAmount;

  if (isLoading) {
    return <LoadingOverlay message="Loading Cart..." />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {cartItems.length > 0 && (
        <View style={styles.outerContainer1}>
          <View style={styles.topSection}>
            <Pressable style={styles.removeAll} onPress={clearCart}>
              <Text style={styles.removeAllText}>Remove All</Text>
            </Pressable>
            <FlatList
              horizontal={false}
              data={cartItems}
              overScrollMode="never"
              renderItem={(itemData) => {
                return (
                  <CartItem
                    itemData={itemData}
                    imageUri={
                      productsCtx.products[itemData.item.product.id - 1]?.image
                    }
                    onAddItem={() => {
                      addItem(itemData.item);
                    }}
                    onRemoveItem={() => {
                      removeItem(itemData.item._id);
                    }}
                  />
                );
              }}
            />
          </View>
          <View style={styles.bottomSection}>
            <View>
              <View style={styles.costItemContainer}>
                <Text style={styles.costItemLabel}>Subtotal</Text>
                <Text style={styles.costItemValue}>${subtotal.toFixed(2)}</Text>
              </View>
              <View style={styles.costItemContainer}>
                <Text style={styles.costItemLabel}>Shipping Cost</Text>
                <Text style={styles.costItemValue}>${shippingCost}</Text>
              </View>
              <View style={styles.costItemContainer}>
                <Text style={styles.costItemLabel}>Tax</Text>
                <Text style={styles.costItemValue}>${taxAmount}</Text>
              </View>
              <View style={styles.costItemTotalContainer}>
                <Text style={styles.costItemTotalLabel}>Total</Text>
                <Text style={styles.costItemValue}>${total.toFixed(2)}</Text>
              </View>
            </View>
            <View>
              <PurpleButtonSmall
                onPress={() => {
                  navigation.navigate("Checkout");
                }}
              >
                <View style={styles.checkoutButtonContainer}>
                  <View>
                    <Text style={styles.checkoutButtonText}>Checkout</Text>
                  </View>
                </View>
              </PurpleButtonSmall>
            </View>
          </View>
        </View>
      )}
      {cartItems.length === 0 && (
        <View style={styles.outerContainer2}>
          <View style={styles.innerContainer}>
            <Image style={styles.image} source={parcelImage} />
            <View>
              <Text style={styles.emptyCartText}>Your Cart is Empty</Text>
            </View>
            <View>
              <PurpleButtonSmall
                onPress={() => {
                  navigation.navigate("HomeTab", { screen: "Categories" });
                }}
              >
                Explore Categories
              </PurpleButtonSmall>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  imageContainer: {
    justifyContent: "center",
    width: 200,
    height: 200,
    borderColor: Colors.yellow100,
    borderWidth: 4,
  },
  image: {
    width: 40,
    height: 40,
  },
  removeAll: {
    alignItems: "flex-end",
  },
  removeAllText: {
    fontSize: 16,
    fontWeight: 500,
  },
  outerContainer1: {
    flex: 1,
    marginHorizontal: 11,
  },
  outerContainer2: {
    flex: 1,
    marginHorizontal: 11,
    marginBottom: 150,
    justifyContent: "center",
  },
  topSection: {
    flex: 1,
    marginTop: 10,
  },
  bottomSection: {
    paddingBottom: 20,
  },
  checkoutButtonText: {
    color: Colors.white100,
    fontWeight: 700,
  },
  innerContainer: {
    alignItems: "center",
  },
  costItemContainer: {
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  costItemLabel: { fontSize: 17, color: "gray", marginLeft: 8 },
  costItemValue: {
    color: "black",
    fontWeight: 700,
    marginRight: 10,
  },
  costItemTotalContainer: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  costItemTotalLabel: {
    fontSize: 17,
    fontWeight: 700,
    color: "gray",
    marginLeft: 8,
  },
  checkoutButtonContainer: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
  emptyCartText: { fontSize: 20, marginVertical: 20 },
});
