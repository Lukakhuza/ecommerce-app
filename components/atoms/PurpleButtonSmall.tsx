import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/colors";

type Props = { children: any; onPress: any; style: any; mode: string };

const PurpleButtonSmall = ({ children, onPress, style, mode }: any) => {
  return (
    <Pressable
      style={({ pressed }) => [
        style,
        styles.button,
        pressed && styles.pressed,
        mode === "selected" && styles.white,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, mode === "selected" && styles.selected]}>
        {children}
      </Text>
    </Pressable>
  );
};

export default PurpleButtonSmall;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary100,
    height: 49,
    borderRadius: 100,
    marginTop: 12.15,
    marginBottom: 12.15,
    paddingVertical: 11,
    paddingHorizontal: 48.6,
    justifyContent: "center",
    alignItems: "center",
    // alignContent: "flex-end",
  },
  text: {
    fontSize: 16,
    // fontFamily: "Circular-Std",
    fontWeight: 500,
    // lineHeight: 26.73,
    color: Colors.white100,
    textAlign: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.5,
  },
  white: {
    backgroundColor: Colors.bgLight2,
  },
  selected: {
    color: "black",
  },
});
