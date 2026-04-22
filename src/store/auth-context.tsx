import { ReactNode, createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import * as Keychain from 'react-native-keychain';
import {
  resetGenericPassword,
  setGenericPassword,
} from 'react-native-keychain';
import { fetchToken } from '../api/users.api';
import { isTokenExpired, wait } from '../utils/helpers';

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  authToken: string | false;
  logout: () => void;
  loginHandler: (email: string, password: string) => void;
};

export const AuthContext = createContext<AuthContextType>({
  isLoading: false,
  isAuthenticated: false,
  authToken: false,
  logout: () => {},
  loginHandler: () => {},
});

type Props = {
  children: ReactNode;
};

const AuthContextProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState<string | false>(false);

  // Check for token at app startup
  const loadToken = async () => {
    try {
      setIsLoading(true);
      const result = await Keychain.getGenericPassword();
      if (result === false) return;
      const { password: storedToken } = result;
      if (!isTokenExpired(storedToken)) {
        setAuthToken(storedToken);
        setIsAuthenticated(true);
      } else {
        Keychain.resetGenericPassword();
        setAuthToken(false);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log('Error loading token', error);
    } finally {
      await wait(500);
      setIsLoading(false);
      // SplashScreen.hideAsync();
    }
  };

  useEffect(() => {
    loadToken();
  }, []);

  const loginHandler = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      const token = await fetchToken({ email, password });

      if (!token) {
        throw new Error('Authentication Failed');
      }
      setAuthToken(token);
      setIsAuthenticated(true);
      setGenericPassword('token', token);
    } catch (error) {
      console.log(error);
      Alert.alert(
        'Authentication Failed',
        'Please check your credentials and try again!',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setAuthToken(false);
    setIsAuthenticated(false);
    resetGenericPassword();
  };

  const value = {
    isLoading,
    isAuthenticated,
    logout,
    authToken,
    loginHandler,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
