import { url } from "./client";

export const addProductToCart = async (data: object) => {
  const response = await fetch(url + "/product/add-to-cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const resData = await response.json();
  console.log(resData.user.cart.items);
};
