import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import { AuthContext } from '../store/auth-context';
import { useContext } from 'react';
import LoadingOverlay from '../components/atoms/LoadingOverlay';

const RootNavigator = () => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <LoadingOverlay message="Loading..." />;
  }

  return isAuthenticated ? <AppNavigator /> : <AuthNavigator />;
};

export default RootNavigator;
