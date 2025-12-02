import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";

const PressableComponent = ({
  children,
  label,
  onPress,
  textContainerStyle,
  disabled,
}: any) => {
  return (
    <Pressable onPress={onPress} style={styles.container} disabled={disabled}>
      <View style={textContainerStyle}>
        <Text style={styles.label1}>{label}</Text>
        <View>{children}</View>
      </View>
      <View>
        <Ionicons name="chevron-forward-outline" size={35} />
      </View>
    </Pressable>
  );
};

export default PressableComponent;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.bgLight2,
    height: 80,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  label1: {
    color: Colors.gray100,
    fontSize: 17,
    marginLeft: 10,
    marginVertical: 4,
  },
  label2: {
    fontSize: 20,
    marginLeft: 10,
    marginVertical: 4,
    fontWeight: 700,
  },
});
