import { url } from "./client";

export const addPaymentMethod = async (paymentMethodData: Object) => {
  const response = await fetch(url + "/checkout/add-payment-method", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paymentMethodData),
  });
  const resData = await response.json();
  return resData;
};
