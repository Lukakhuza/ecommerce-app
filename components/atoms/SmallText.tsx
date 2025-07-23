import { View, Text, StyleSheet, Pressable } from "react-native";

type Props = {
  primaryText: string;
  secondaryText: string;
  onPress: any;
  style: any;
};

const SmallText = ({ primaryText, secondaryText, onPress, style }: Props) => {
  return (
    <View style={styles.textContainer}>
      <Text>{primaryText}</Text>
      <Text> </Text>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [style, pressed && styles.pressed]}
      >
        <Text style={styles.secondaryText}>{secondaryText}</Text>
      </Pressable>
    </View>
  );
};

export default SmallText;

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: "row",
    marginLeft: 5,
  },
  secondaryText: {
    fontWeight: "600",
  },
  pressed: {
    opacity: 0.7,
  },
});
