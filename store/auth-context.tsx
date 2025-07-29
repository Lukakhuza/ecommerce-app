import { createContext, useEffect, useState, type ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import EnterEmail from "../screens/EnterEmail";

export const AuthContext: any = createContext({
  token: "",
  // email: "",
  isAuthenticated: false,
  enteredEmail: "",
  enteredPassword: "",
  loginHandler: (email: string, password: string) => {},
  authenticate: (token: string) => {},
  logout: () => {},
});

type Props = {
  children: ReactNode;
};

const AuthContextProvider = ({ children }: Props) => {
  const [authToken, setAuthToken] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  // const [authEmail, setAuthEmail] = useState(null);
  const [enteredUserInfo, setEnteredUserInfo] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    // Check if there is a saved token on the device. Fetch token from device's secure store.
    const fetchToken = async () => {
      const storedToken: any = await SecureStore.getItemAsync("token");
      // Check if the token is valid.

      // If the token is valid, update the state to isAuthenticated = true.

      // If there is a token, update authToken with it:
      if (storedToken) {
        setAuthToken(storedToken);
      }
    };

    fetchToken();
  }, []);

  const updateEnteredUserInfo = (inputIdentifier: any, enteredText: string) => {
    setEnteredUserInfo((currInputValues) => {
      return {
        ...currInputValues,
        [inputIdentifier]: enteredText,
      };
    });
  };

  const authenticate = (token: any) => {
    SecureStore.setItemAsync("token", token);
    setAuthToken(token);
  };

  // Fetch token from backend.
  const fetchToken = (userData: object) => {
    fetch("https://backend-ecommerce-mobile-app.onrender.com/user/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((result) => {
        return result.json();
      })
      .then((resData) => {
        return resData.token;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loginHandler = async (email: string, password: string) => {
    setIsAuthenticating(true);
    const userData = {
      email: enteredUserInfo.email,
      password: enteredUserInfo.password,
    };
    // Fetch token from backend.
    const token = fetchToken(userData);
    // Validate token

    // const token = "secrettoken";
    return token;
  };

  const logout = () => {
    SecureStore.deleteItemAsync("token");
    // SecureStore.deleteItemAsync("authEmail");
  };

  const value = {
    token: authToken,
    // authEmail: authEmail,
    isAuthenticated: !!authToken,
    enteredEmail: enteredUserInfo.email,
    enteredPassword: enteredUserInfo.password,
    authenticate: authenticate,
    updateEnteredUserInfo: updateEnteredUserInfo,
    loginHandler: loginHandler,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
