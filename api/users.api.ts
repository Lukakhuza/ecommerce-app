import { Alert } from "react-native";
import { url } from "./client";

export const createUser = async (user: any) => {
  const response = await fetch(url + "/user/create-user/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const resData = await response.json();
  console.log("ResData: ", resData);
  return resData;
};

export const createCustomerInStripe = async (user: any) => {
  const response = await fetch(url + "/user/create-customer-in-stripe/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const resData = await response.json();
  console.log("Test 456", resData);
  return resData;
};

export const validateToken = async (token: string) => {
  const tokenData = {
    token: token,
  };
  const result = await fetch(url + "/user/authenticate/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tokenData),
  });
  const resData = await result.json();
  // setIsLoading(false);
  return resData;
  // SecureStore.setItemAsync("token", token);
  // setAuthToken(token);
};

export const fetchToken = async (userData: object) => {
  try {
    const response = await fetch(url + "/user/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const resData = await response.json();
    if (!response.ok) {
      throw new Error(resData.message);
    }
    const token = await resData.token;
    return token;
  } catch (error) {
    Alert.alert("Authentication Failed - 2", "Error 2");
  }
};

export const getUserByEmail = async (email: string) => {
  const userData = {
    email: email,
  };
  const response = await fetch(url + "/user/get-user-by-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const resData = await response.json();
  return resData;
};

export const saveUserDataToDatabase = async (userData: any) => {
  try {
    const userId = userData.id;

    const result = await fetch(url + "/user/update-user/" + userId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const resData = await result.json();
    return resData;
  } catch (error) {
    Alert.alert("User could not be saved. Try again later.");
  }
};

export const saveUserDataToContext = async (userData: any) => {
  try {
    const userId = userData.id;
    const result = await fetch(url + "/user/update-user/" + userId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const resData = await result.json();
    return resData;
  } catch (error) {
    Alert.alert("User could not be saved. Try again later.");
  }
};

export const saveFavoritesToDatabase = async (
  userId: string,
  updatedFavorites: Number[]
) => {
  const data = {
    userId: userId,
    updatedFavorites: updatedFavorites,
  };
  const result = await fetch(url + "/product/save-updated-favorites/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const resData = await result.json();
};

export const clearCartInDatabase = async (userId: string) => {
  await fetch(url + "/user/clear-cart" + userId);
};
