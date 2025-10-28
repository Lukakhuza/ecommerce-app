import { useContext } from "react";
import { UserInputContext } from "../store/user-input-context";
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

export const createPaymentSheet = async (
  stripeCustomerId: string,
  totalAmount: Number,
  currency: string
) => {
  const response = await fetch(url + "/product/create-payment-sheet/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      customerId: stripeCustomerId,
      totalAmount: totalAmount,
      currency: currency,
    }),
  });
  const resData = response.json();
  return resData;
};

export const openPaymentSheet = async (stripeData: any) => {
  const response = await initPaymentSheet({
    merchantDisplayName: "LK Store",
    customerId: stripeData.customerId,
    customerEphemeralKeySecret: stripeData.ephemeralKey,
    paymentIntentClientSecret: stripeData.paymentIntent,
  });
  const { error } = await presentPaymentSheet();

  if (error) {
    console.log("Payment failed:", error);
    return { success: false, message: error.message };
  } else {
    return { success: true, message: "Payment Completed!" };
  }
};
