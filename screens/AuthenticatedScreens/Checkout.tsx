import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import LoadingOverlay from "../../components/atoms/LoadingOverlay";
import PurpleButtonSmall from "../../components/atoms/PurpleButtonSmall";
import { UserInputContext } from "../../store/user-input-context";
import { ProductsContext } from "../../store/products-context";
import { useContext, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { CartContext } from "../../store/cart-context";
import { Colors } from "../../constants/colors";
import { openPaymentSheet } from "../../api/products.api";

type Props = {
  navigation: any;
};

const Checkout = ({ navigation }: Props) => {
  const userInputCtx: any = useContext(UserInputContext);
  const productsCtx: any = useContext(ProductsContext);
  const [shippingAddress, setShippingAddress] = useState(
    userInputCtx.userInput.address
  );
  const cartCtx: any = useContext(CartContext);

  let subtotal = 0;
  for (let i = 0; i < cartCtx.cartItems.length; i++) {
    subtotal +=
      cartCtx.cartItems[i].product.price * cartCtx.cartItems[i].quantity;
  }

  let shippingCost = 8;
  let taxAmount = 0;
  let total = subtotal + shippingCost + taxAmount;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          alignItems: "stretch",
          marginHorizontal: 30,
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              fontWeight: 700,
              marginBottom: 20,
            }}
          >
            Checkout
          </Text>
          <View style={styles.root}>
            <View>
              <View
                style={{
                  height: 650,
                }}
              >
                <View style={{ height: 440 }}>
                  <Pressable
                    onPress={() => {
                      // productsCtx.updateSelectedCategory("Jackets");
                      navigation.navigate("Payment");
                    }}
                    style={styles.category}
                  >
                    <View style={{ maxWidth: 180 }}>
                      <Text style={styles.label2}>Shipping Address</Text>
                      <Text style={styles.label1} numberOfLines={1}>
                        {`${shippingAddress.addressLine1.value}, ${shippingAddress.city.value}, ${shippingAddress.state.value} ${shippingAddress.zipcode.value}`}
                      </Text>
                    </View>
                    <View>
                      <Ionicons name="chevron-forward-outline" size={35} />
                    </View>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      // productsCtx.updateSelectedCategory("Jackets");
                      navigation.navigate("Payment");
                    }}
                    style={styles.category}
                  >
                    <View>
                      <Text style={styles.label2}>Payment Method</Text>
                      <Text style={styles.label1}>Add Payment Method</Text>
                    </View>
                    <View>
                      <Ionicons name="chevron-forward-outline" size={35} />
                    </View>
                  </Pressable>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                  }}
                >
                  <View
                    style={{
                      marginVertical: 8,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{ fontSize: 17, color: "gray", marginLeft: 8 }}
                    >
                      Subtotal
                    </Text>
                    <Text
                      style={{
                        color: "black",
                        fontWeight: 700,
                        marginRight: 10,
                      }}
                    >
                      ${subtotal.toFixed(2)}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginVertical: 8,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{ fontSize: 17, color: "gray", marginLeft: 8 }}
                    >
                      Shipping Cost
                    </Text>
                    <Text
                      style={{
                        color: "black",
                        fontWeight: 700,
                        marginRight: 10,
                      }}
                    >
                      ${shippingCost}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginVertical: 8,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{ fontSize: 17, color: "gray", marginLeft: 8 }}
                    >
                      Tax
                    </Text>
                    <Text
                      style={{
                        color: "black",
                        fontWeight: 700,
                        marginRight: 10,
                      }}
                    >
                      ${taxAmount}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginVertical: 20,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: 700,
                        color: "gray",
                        marginLeft: 8,
                      }}
                    >
                      Total
                    </Text>
                    <Text
                      style={{
                        color: "black",
                        fontWeight: 700,
                        marginRight: 10,
                      }}
                    >
                      ${total.toFixed(2)}
                    </Text>
                  </View>
                </View>
                <PurpleButtonSmall onPress={openPaymentSheet}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginHorizontal: 45,
                        }}
                      >
                        <Text
                          style={{
                            color: Colors.white100,
                            fontWeight: 700,
                            marginRight: 20,
                          }}
                        >
                          ${total.toFixed(2)}
                        </Text>
                        <Text
                          style={{
                            color: Colors.white100,
                            fontWeight: 700,
                            marginLeft: 20,
                          }}
                        >
                          Place Order
                        </Text>
                      </View>
                    </View>
                  </View>
                </PurpleButtonSmall>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  safeArea: {
    height: "100%",
  },
  header: {
    fontSize: 17,
    textAlign: "center",
  },
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 40,
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
  cartItem: {
    marginVertical: 0,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.white100,
    height: 100,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 17,
    marginLeft: 10,
  },
  category: {
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.bgLight2,
    height: 80,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  label1: {
    fontSize: 20,
    marginLeft: 10,
    marginVertical: 4,
    fontWeight: 700,
  },
  label2: {
    color: Colors.gray100,
    fontSize: 17,
    marginLeft: 10,
    marginVertical: 4,
  },
  basicInfo: {
    marginBottom: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.bgLight2,
    height: 110,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  pressed: {
    opacity: 0.75,
  },
});
