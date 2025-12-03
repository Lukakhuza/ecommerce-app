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
import PurpleButtonSmall from "../../../components/atoms/PurpleButtonSmall";
import { UserInputContext } from "../../../store/user-input-context";
import { ProductsContext } from "../../../store/products-context";
import { useContext, useState } from "react";
import { CartContext } from "../../../store/cart-context";
import { Colors } from "../../../constants/colors";
import {
  createPaymentSheet,
  openPaymentSheet,
} from "../../../api/products.api";
import { createOrder } from "../../../api/orders.api";
import CostItems from "../../../components/organisms/CostItems";
import PressableComponent from "../../../components/organisms/PressableComponent";
import { CheckoutContext } from "../../../store/checkout-context";

type Props = {
  navigation: any;
};

const Checkout = ({ navigation }: Props) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const userInputCtx: any = useContext(UserInputContext);
  const { shippingAddress, paymentMethod }: any = useContext(CheckoutContext);
  const cartCtx: any = useContext(CartContext);

  const cardImages: any = {
    visa: require("../../../assets/visa.png"),
    mastercard: require("../../../assets/mastercard.png"),
    amex: require("../../../assets/amex.png"),
    discover: require("../../../assets/discover.png"),
  };

  const cardBrand = paymentMethod?.card?.brand;

  let subtotal = 0;
  for (let i = 0; i < cartCtx.cartItems.length; i++) {
    subtotal +=
      cartCtx.cartItems[i].product.price * cartCtx.cartItems[i].quantity;
  }

  let shippingCost = 8;
  let taxAmount = 0;
  let total = subtotal + shippingCost + taxAmount;

  const placeOrderHandler = async () => {
    setIsButtonDisabled(true);
    const stripeCustomerId = userInputCtx.userInput.stripeCustomerId;
    const totalAmount = Math.trunc(total * 100);
    const currency = "usd";
    const stripeData = await createPaymentSheet(
      stripeCustomerId,
      totalAmount,
      currency
    );

    const response = await openPaymentSheet(stripeData);
    if (response.success === true) {
      const orderItems = cartCtx.cartItems;
      const orderData = {
        userId: userInputCtx.userInput.id.value,
        items: orderItems,
        total: total,
        shippingAddress: {
          addressLine1: shippingAddress.addressLine1.value,
          city: shippingAddress.city.value,
          state: shippingAddress.state.value,
          zipcode: shippingAddress.zipcode.value,
        },
        paymentMethod: paymentMethod,
      };
      await createOrder(orderData);
      cartCtx.clearCart();
      navigation.navigate("Home");
      setIsButtonDisabled(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.outerContainer}>
        <View style={styles.topSection}>
          <PressableComponent
            label="Shipping Address"
            onPress={() => {
              navigation.navigate("ManageShippingAddress");
            }}
            textContainerStyle={styles.shippingAddressTextContainerStyle}
          >
            <Text style={styles.label2} numberOfLines={1}>
              {shippingAddress.addressLine1.value
                ? `${shippingAddress.addressLine1.value}, ${shippingAddress.city.value}, ${shippingAddress.state.value} ${shippingAddress.zipcode.value}`
                : "Add Shipping Address"}
            </Text>
          </PressableComponent>
          <PressableComponent
            label="Payment Method"
            onPress={() => {
              navigation.navigate("ManagePaymentMethod");
            }}
          >
            {paymentMethod ? (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.label2} numberOfLines={1}>
                  {`****${paymentMethod.card.last4}`}
                </Text>
                <View>
                  {cardImages[cardBrand] && (
                    <Image
                      style={styles.image}
                      source={cardImages[cardBrand]}
                    />
                  )}
                </View>
              </View>
            ) : (
              <Text style={styles.label2} numberOfLines={1}>
                Add Payment Method
              </Text>
            )}
          </PressableComponent>
        </View>
        <View style={styles.bottomSection}>
          <CostItems
            subtotal={`${subtotal.toFixed(2)}`}
            shippingCost={shippingCost}
            tax={taxAmount}
            total={total.toFixed(2)}
          />
          <View>
            <PurpleButtonSmall
              onPress={placeOrderHandler}
              disabled={isButtonDisabled}
            >
              <View style={styles.purpleButtonTextContainer}>
                <Text style={styles.purpleButtonText}>${total.toFixed(2)}</Text>
                <Text style={styles.purpleButtonText}>
                  {isButtonDisabled ? "Submitting..." : "Place Order"}
                </Text>
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
    // borderColor: "red",
    // borderWidth: 3,
  },
  topSection: {
    flex: 1,
    marginTop: 10,
    // borderColor: "green",
    // borderWidth: 3,
  },
  bottomSection: {
    paddingBottom: 20,
    // borderColor: "blue",
    // borderWidth: 3,
  },
  label2: {
    fontSize: 20,
    marginLeft: 10,
    marginVertical: 4,
    fontWeight: 700,
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
  shippingAddressTextContainerStyle: { maxWidth: 220 },
  image: {
    width: 80,
    height: 40,
    marginLeft: 10,
  },
});
