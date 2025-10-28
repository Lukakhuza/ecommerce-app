import { Alert } from "react-native";
import { url } from "./client";

export const createOrder = async (orderData: object) => {
  const response = await fetch(url + "/order/create-order/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });
  const resData = await response.json();
  console.log("Order Res Data:", resData);
  return resData;
};

export const fetchOrders = async (userId: string) => {
  const response = await fetch(url + "/order/fetch-orders/" + userId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const resData = await response.json();
  return resData;
};
