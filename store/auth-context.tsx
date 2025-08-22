import { createContext, useEffect, useState, type ReactNode } from "react";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";

export const AuthContext: any = createContext({
  token: "",
  // email: "",
  isAuthenticated: false,
  isLoading: false,
  hasError: false,
  enteredEmail: { value: "", isValid: true },
  enteredPassword: { value: "", isValid: true },
  loginHandler: (email: string, password: string) => {},
  fetchToken: (userData: object) => {},
  logout: () => {},
  clearEnteredUserInfo: () => {},
});

const emptyEmailAndPassword = {
  email: { value: "", isValid: true },
  password: { value: "", isValid: true },
};

type Props = {
  children: ReactNode;
};

const AuthContextProvider = ({ children }: Props) => {
  const [authToken, setAuthToken] = useState(null);
  const [enteredUserInfo, setEnteredUserInfo] = useState(emptyEmailAndPassword);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);

  const url = "https://backend-ecommerce-mobile-app.onrender.com";

  const updateEnteredUserInfo = (
    inputIdentifier: any,
    enteredText: string,
    inputValid: boolean
  ) => {
    setEnteredUserInfo((currInputValues) => {
      return {
        ...currInputValues,
        [inputIdentifier]: {
          value: enteredText,
          isValid: inputValid,
        },
      };
    });
  };

  // Fetch token from backend.
  const fetchToken = async (userData: object) => {
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

  const loginHandler = async (email: string, password: string) => {
    setIsLoading(true);
    clearEnteredUserInfo();
    try {
      const token = await fetchToken({ email, password });
      if (!token) {
        throw new Error("Authentication Failed - 1");
      }
      authenticate(token);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Authentication Failed - 3",
        "Please check your credentials and try again!"
      );
    }
    setIsLoading(false);
  };

  const authenticate = (token: any) => {
    setAuthToken(token);
  };

  const logout = () => {
    setAuthToken(null);
    // SecureStore.deleteItemAsync("token");Se
    // SecureStore.deleteItemAsync("authEmail");
  };

  const clearEnteredUserInfo = () => {
    setEnteredUserInfo(emptyEmailAndPassword);
  };

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    isLoading: isLoading,
    hasError: hasError,
    enteredEmail: enteredUserInfo.email,
    enteredPassword: enteredUserInfo.password,
    fetchToken: fetchToken,
    updateEnteredUserInfo: updateEnteredUserInfo,
    loginHandler: loginHandler,
    authenticate: authenticate,
    logout: logout,
    clearEnteredUserInfo: clearEnteredUserInfo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

// useEffect(() => {
//   // Check if there is a saved token on the device. Fetch token from device's secure store.
//   const fetchToken = async () => {
//     setIsLoading(true);
//     const storedToken: any = await SecureStore.getItemAsync("token");
//     console.log("Test 10: stored token: ", storedToken);
//     // Check if the token is valid.
//     // If there is a valid token, update authToken with it:
//     if (storedToken) {
//       setAuthToken(storedToken);
//     }
//     setIsLoading(false);
//   };
//   fetchToken();
// }, []);

//

// const validateToken = async (token: string) => {
//   setIsLoading(true);
//   const tokenData = {
//     token: token,
//   };
//   const result = await fetch(url + "/user/authenticate/", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(tokenData),
//   });
//   const resData = await result.json();
//   console.log("data 1", resData);
//   console.log("Status 1: ", result.status);
//   console.log("Status 2: ", resData.status);
//   if (resData.decodedToken) {
//     // save the token to SecureStore
//     SecureStore.setItemAsync("token", resData.token);
//     // update the state to authenticated.
//     setAuthToken(resData.decodedToken);
//     // extract user email and set it as authEmail in state.
//   }

//   setIsLoading(false);
//   return resData;
//   // SecureStore.setItemAsync("token", token);
//   // setAuthToken(token);
// };

//

// const createUserHandler = async (email: string, password: string) => {
//   const userData = {
//     email: enteredUserInfo.email,
//     password: enteredUserInfo.password,
//   };
//   setIsLoading(true);
//   fetchToken(userData);
//   setIsLoading(false);
// };

//

// console.log("Test 0", token);
// If we were able to fetch the token, try to authenticate it:
// let decodedTokenData;
// if (token) {
// If authentication function returned a response, save it in decodedTokenData variable.
// decodedTokenData = await authenticate(token);
// } else {
// console.log("Authentication Failed here.");
// }

// if (decodedTokenData) {
//   return decodedTokenData;
// } else {
//   console.log("Token failed to decode.");
//   return null;
// }
