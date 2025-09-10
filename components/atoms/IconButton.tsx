import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

type Props = {
  icon: any;
  size: any;
  color: any;
  onPress: any;
  style?: any;
};

const IconButton = ({ icon, size, color, onPress, style }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed, style]}
    >
      <Ionicons name={icon} size={size} color={color} />
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: Colors.white100,
    width: 50,
    height: 50,
  },
  pressed: {
    opacity: 0.5,
  },
});
