import { createContext, useEffect, useState, type ReactNode } from "react";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import { Alert } from "react-native";
import { validateToken, fetchToken } from "../api/users.api";
import { wait } from "../util/helpers";
import { jwtDecode } from "jwt-decode";

export const AuthContext: any = createContext({
  token: "",
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
  const [authData, setAuthData] = useState({
    email: "",
    userId: "",
    exp: "",
    iat: "",
  });
  const [enteredUserInfo, setEnteredUserInfo] = useState(emptyEmailAndPassword);
  const [isLoading, setIsLoading] = useState(false);
  // const [loading, setLoading] = useState(true);
  // const [hasError, setHasError] = useState(null);

  useEffect(() => {
    // Check for token at app startup
    const loadToken = async () => {
      try {
        const storedToken: any = await SecureStore.getItemAsync("token");
        if (storedToken) {
          setAuthToken(storedToken);
        }
      } catch (error) {
        console.log("Error loading token", error);
      } finally {
        await wait(500);
        SplashScreen.hideAsync();
      }
    };
    loadToken();
  }, []);

  // If there is an auth token, get auth data based on it:
  useEffect(() => {
    if (authToken) {
      const decoded: any = jwtDecode(authToken);
      setAuthData({
        email: decoded.email,
        userId: decoded.userId,
        exp: decoded.exp,
        iat: decoded.iat,
      });
    }
  }, [authToken]);

  const getEmailFromToken = (token: string) => {
    try {
      const decoded: any = jwtDecode(token);
      console.log(decoded);
      return decoded.email;
    } catch (error) {
      return null;
    }
  };

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

  const loginHandler = async (email: string, password: string) => {
    console.log("Email: ", email, "Password: ", password);

    setIsLoading(true);
    clearEnteredUserInfo();
    try {
      const token = await fetchToken({ email, password });
      if (!token) {
        throw new Error("Authentication Failed - 1");
      }
      authenticate(token);
      SecureStore.setItemAsync("token", token);
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
    // Clear authentication token state
    setAuthToken(null);
    // Remove the token from device secure store
    SecureStore.deleteItemAsync("token");
  };

  const clearEnteredUserInfo = () => {
    // Clear user input email and password
    setEnteredUserInfo(emptyEmailAndPassword);
  };

  const value = {
    token: authToken,
    authData: authData,
    isAuthenticated: !!authToken,
    isLoading: isLoading,
    // hasError: hasError,
    enteredEmail: enteredUserInfo.email,
    enteredPassword: enteredUserInfo.password,
    fetchToken: fetchToken,
    updateEnteredUserInfo: updateEnteredUserInfo,
    getEmailFromToken: getEmailFromToken,
    loginHandler: loginHandler,
    authenticate: authenticate,
    logout: logout,
    clearEnteredUserInfo: clearEnteredUserInfo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
