import Icon from '@react-native-vector-icons/ionicons';
import { Pressable, StyleSheet } from 'react-native';
import { Colors } from '../../theme/colors';

type Props = {
  onPress: () => void;
  style?: object;
};

const CartButton = ({ onPress, style }: Props) => {
  return (
    <Pressable
      style={({ pressed }) => [style, styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Icon name="cart-outline" size={30} />
    </Pressable>
  );
};

export default CartButton;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: Colors.primary100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  text: {
    fontSize: 16,
    fontWeight: 500,
    color: Colors.white100,
    textAlign: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.5,
  },
  white: {
    backgroundColor: Colors.bgLight2,
  },
  selected: {
    color: Colors.black,
  },
});
