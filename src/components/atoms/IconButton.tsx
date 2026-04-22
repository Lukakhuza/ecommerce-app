import Icon, { IoniconsIconName } from '@react-native-vector-icons/ionicons';
import { Pressable, StyleSheet, TextStyle } from 'react-native';
import { Colors } from '../../theme/colors';

type Props = {
  icon: IoniconsIconName;
  size: number;
  color: string;
  onPress: () => void;
  style?: TextStyle;
};

const IconButton = ({ icon, size, color, onPress, style }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed, style]}
    >
      <Icon name={icon} size={size} color={color} />
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: Colors.white100,
    width: 50,
    height: 50,
  },
  pressed: {
    opacity: 0.5,
  },
});
