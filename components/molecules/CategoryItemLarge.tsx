import { Pressable, Text, Image, StyleSheet, View } from "react-native";
import { Colors } from "../../constants/colors";

const CategoryItemLarge = ({ category, onPress, imageUri }: any) => {
  return (
    <View>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      >
        <View style={styles.imageContainer}>
          {imageUri !== undefined && (
            <Image source={{ uri: imageUri }} style={styles.image} />
          )}
        </View>
        <View style={{}}>
          <Text style={styles.label}>{category}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default CategoryItemLarge;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: Colors.bgLight2,
    height: 80,
  },
  imageContainer: {
    height: 40,
    width: 40,
    marginLeft: 20,
    marginRight: 10,
    marginVertical: 5,
  },
  image: {
    flex: 1,
    overflow: "hidden",
    resizeMode: "contain",
  },
  label: {
    fontSize: 17,
    marginLeft: 10,
  },
  pressed: {
    opacity: 0.5,
  },
});
