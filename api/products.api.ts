import { url } from "./client";
import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";

export const fetchProductsData = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  const resData = await response.json();
  return resData;
};

export const createPaymentSheet = async () => {
  const response = await fetch(url + "/product/create-payment-sheet/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ customerId: "cus_TGOthq8MXMd6tm" }),
  });
  const resData = response.json();
  return resData;
};

export const openPaymentSheet = async () => {
  const { customerId, ephemeralKey, paymentIntent } =
    await createPaymentSheet();

  await initPaymentSheet({
    merchantDisplayName: "LK Store",
    customerId,
    customerEphemeralKeySecret: ephemeralKey,
    paymentIntentClientSecret: paymentIntent,
  });
  const { error } = await presentPaymentSheet();
  if (error) alert(`Error: ${error.message}`);
  else alert("Payment complete!");
};
