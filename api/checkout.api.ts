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

export const fetchPaymentMethods = async (stripeCustomerId: string) => {
  const response = await fetch(
    url + "/checkout/payment-methods/" + stripeCustomerId,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const resData = await response.json();
  return resData;
};
