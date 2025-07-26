import { createContext, useEffect, useState, type ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

export const AuthContext: any = createContext({
  token: "",
  email: "",
  isAuthenticated: false,
  authenticate: (token: string, email: string) => {},
  logout: () => {},
});

type Props = {
  children: ReactNode;
};

const AuthContextProvider = ({ children }: Props) => {
  const [authToken, setAuthToken] = useState(null);
  const [authEmail, setAuthEmail] = useState(null);
  const [enteredUserInfo, setEnteredUserInfo] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    // Check if there is a saved token on the device.
    const fetchToken = async () => {
      const storedToken: any = await SecureStore.getItemAsync("token");
      // If there is a token, update authToken with it:
      if (storedToken) {
        setAuthToken(storedToken);
      }
    };

    fetchToken();
  }, []);

  const updateEnteredUserInfo = (inputIdentifier: any, enteredText: string) => {
    console.log(enteredUserInfo);
    setEnteredUserInfo((currInputValues) => {
      return {
        ...currInputValues,
        [inputIdentifier]: enteredText,
      };
    });
  };

  const authenticate = (token: any, email: any) => {
    setAuthToken(token);
    setAuthEmail(email);
    SecureStore.setItemAsync("token", token);
    SecureStore.setItemAsync("authEmail", email);
  };

  const enterLoginInfo = (email: string, password: string) => {};

  const logout = () => {
    SecureStore.deleteItemAsync("token");
    SecureStore.deleteItemAsync("authEmail");
  };

  const value = {
    token: authToken,
    authEmail: authEmail,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    updateEnteredUserInfo: updateEnteredUserInfo,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
