import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  children: any;
  onPress: any;
  mode: string;
  style: object;
};

const Button = ({ children, onPress, mode, style }: Props) => {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View
          style={[
            styles.button,
            mode === "flat" && styles.flat,
            mode === "flat2" && styles.flat2,
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              mode === "flat" && styles.flatText,
              mode === "flat2" && styles.flat2Text,
            ]}
          >
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: "darkblue",
  },
  flat: {
    backgroundColor: "transparent",
  },
  flat2: {
    backgroundColor: "white",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  flatText: {
    color: "lightpurple",
  },
  flat2Text: {
    color: "darkblue",
    fontWeight: 500,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: "white",
    borderRadius: 4,
  },
});
