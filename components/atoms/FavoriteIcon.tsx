import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

type Props = {
  name?: any;
  color?: any;
  onPress?: any;
  size?: any;
  style?: any;
};

const FavoriteIcon = ({ name, color, onPress, size, style }: Props) => {
  return (
    <Pressable onPress={onPress}>
      <Ionicons name={name} color={color} size={size} style={style} />
    </Pressable>
  );
};

export default FavoriteIcon;

const styles = StyleSheet.create({});
