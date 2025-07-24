import { createContext, useEffect, useState, type ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  useEffect(() => {
    const fetchToken = async () => {
      const storedToken: any = await AsyncStorage.getItem("token");
      if (storedToken) {
        setAuthToken(storedToken);
      }
    };

    const fetchEmail = async () => {
      const storedEmail: any = await AsyncStorage.getItem("authEmail");
      if (storedEmail) {
        setAuthEmail(storedEmail);
      }
    };

    fetchToken();
    fetchEmail();
  }, []);

  const authenticate = (token: any, email: any) => {
    setAuthToken(token);
    setAuthEmail(email);
    AsyncStorage.setItem("token", token);
    AsyncStorage.setItem("authEmail", email);
  };

  const logout = () => {
    // setAuthEmail(null);
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("authEmail");
  };

  const value = {
    token: authToken,
    authEmail: authEmail,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
