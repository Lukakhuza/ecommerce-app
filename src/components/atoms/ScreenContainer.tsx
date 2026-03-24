import { useContext, type ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';

export type ScreenContainer = {
  children: ReactNode;
  style?: ViewStyle;
};

const ScreenContainer = ({ children, style }: ScreenContainer) => {
  const safeAreaInsets = useContext(SafeAreaInsetsContext);

  return (
    <View style={[safeAreaInsets, styles.container, style]}>{children}</View>
  );
};

export default ScreenContainer;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 30 },
});
