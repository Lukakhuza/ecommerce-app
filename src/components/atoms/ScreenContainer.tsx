import { type ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

export type ScreenContainer = {
  children: ReactNode;
  style?: ViewStyle;
};

const ScreenContainer = ({ children, style }: ScreenContainer) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

export default ScreenContainer;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 30 },
});
