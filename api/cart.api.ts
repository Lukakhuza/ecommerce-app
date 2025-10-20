import { url } from "./client";
import { debounce } from "lodash";

export const addToCartInDatabase = async (data: Object) => {
  const response = await fetch(url + "/product/add-to-cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const resData = await response.json();
  return resData;
};

export const updateCartInDatabase = debounce(async (data: Object) => {
  const response = await fetch(url + "/product/update-cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const resData = await response.json();
  return resData;
}, 3000);
