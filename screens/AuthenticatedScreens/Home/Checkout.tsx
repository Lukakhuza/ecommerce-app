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
import LoadingOverlay from "../../../components/atoms/LoadingOverlay";
import PurpleButtonSmall from "../../../components/atoms/PurpleButtonSmall";
import { UserInputContext } from "../../../store/user-input-context";
import { ProductsContext } from "../../../store/products-context";
import { useContext, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { CartContext } from "../../../store/cart-context";
import { Colors } from "../../../constants/colors";
import {
  createPaymentSheet,
  openPaymentSheet,
} from "../../../api/products.api";
import { CustomPaymentMethodResultStatus } from "@stripe/stripe-react-native";
import { createOrder } from "../../../api/orders.api";

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

  const placeOrderHandler = async () => {
    const stripeCustomerId = userInputCtx.userInput.stripeCustomerId;
    const totalAmount = Math.trunc(total * 100);
    const currency = "usd";
    const stripeData = await createPaymentSheet(
      stripeCustomerId,
      totalAmount,
      currency
    );
    // const paymentIntentId = stripeData.paymentIntentId;
    const response = await openPaymentSheet(stripeData);
    console.log("resp:", response);
    if (response.success === true) {
      const orderItems = cartCtx.cartItems;
      const orderData = {
        userId: userInputCtx.userInput.id.value,
        items: orderItems,
        total: total,
        shippingAddress: {
          addressLine1: userInputCtx.userInput.address.addressLine1.value,
          city: userInputCtx.userInput.address.city.value,
          state: userInputCtx.userInput.address.state.value,
          zipcode: userInputCtx.userInput.address.zipcode.value,
        },
      };
      await createOrder(orderData);
      cartCtx.clearCart();
      navigation.navigate("Home");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.outerContainer}>
        <View style={styles.topSection}>
          <Pressable
            onPress={() => {
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
        <View style={styles.bottomSection}>
          <View style={styles.costItemsContainer}>
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
            <View style={styles.costItemContainerTotal}>
              <Text style={styles.costItemLabelTotal}>Total</Text>
              <Text style={styles.costItemValue}>${total.toFixed(2)}</Text>
            </View>
          </View>
          <View>
            <PurpleButtonSmall onPress={placeOrderHandler}>
              <View style={styles.purpleButtonTextContainer}>
                <Text style={styles.purpleButtonText}>${total.toFixed(2)}</Text>
                <Text style={styles.purpleButtonText}>Place Order</Text>
              </View>
            </PurpleButtonSmall>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  outerContainer: {
    flex: 1,
    marginHorizontal: 11,
  },
  topSection: {
    flex: 1,
    marginTop: 10,
  },
  bottomSection: {
    paddingBottom: 20,
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
  costItemLabelTotal: {
    fontSize: 17,
    fontWeight: 700,
    color: "gray",
    marginLeft: 8,
  },
  costItemContainerTotal: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  costItemsContainer: {
    flexDirection: "column",
  },
  purpleButtonTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 180,
  },
  purpleButtonText: {
    color: Colors.white100,
    fontWeight: 700,
  },
});
