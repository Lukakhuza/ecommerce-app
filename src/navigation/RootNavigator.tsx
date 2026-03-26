import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import { AuthContext } from '../store/auth-context';
import { useContext } from 'react';
import LoadingOverlay from '../components/atoms/LoadingOverlay';
import { View } from 'react-native';

const RootNavigator = () => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  if (isLoading)
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <LoadingOverlay message="Loading..." />
      </View>
    );

  return (
    <View style={{ flex: 1 }}>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </View>
  );
};

export default RootNavigator;
