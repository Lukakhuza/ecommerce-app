import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

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
    // borderColor: "blue",
    backgroundColor: "white",
    width: 50,
    height: 50,
    // borderWidth: 3,
  },
  pressed: {
    opacity: 0.5,
  },
});
