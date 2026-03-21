import * as Keychain from 'react-native-keychain';
import { createContext, useEffect, ReactNode, useState } from 'react';
import { Alert } from 'react-native';
import { fetchToken } from '../api/users.api';
import { isTokenExpired } from '../utils/helpers';
import { UserCredentials, setGenericPassword } from 'react-native-keychain';
import { wait } from '../utils/helpers';

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  // authenticate: (token: string) => void;
  loginHandler: (email: string, password: string) => void;
};

export const AuthContext = createContext<AuthContextType>({
  isLoading: false,
  isAuthenticated: false,
  // authenticate: () => {},
  loginHandler: () => {},
});

type Props = {
  children: ReactNode;
};

const AuthContextProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState<UserCredentials | false>(false);

  // Check for token at app startup
  const loadToken = async () => {
    try {
      setIsLoading(true);
      const { password: storedToken }: any =
        await Keychain.getGenericPassword();
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

  // If there is an auth token, get auth data based on it:
  // useEffect(() => {
  //   if (authToken) {
  //     const decoded: any = jwtDecode(authToken);
  //     setAuthData({
  //       email: decoded.email,
  //       userId: decoded.userId,
  //       exp: decoded.exp,
  //       iat: decoded.iat,
  //     });
  //   }
  // }, [authToken]);

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

  // const authenticate = (token: any) => {
  //   setAuthToken(token);
  // };

  const value = {
    isLoading,
    isAuthenticated,
    // authenticate,
    loginHandler,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
