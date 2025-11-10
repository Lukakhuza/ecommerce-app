import { Pressable, Text, Image, StyleSheet, View } from "react-native";

const CategoryItem = ({
  onPress,
  imageUri,
  categoryName,
  containerStyle,
}: any) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.imageContainer,
          pressed && styles.pressed,
        ]}
      >
        <Image source={{ uri: imageUri }} style={styles.image} />
      </Pressable>
      <View style={styles.textContainer}>
        <Text>{categoryName}</Text>
      </View>
    </View>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: { flex: 1 },
  imageContainer: {
    height: 63,
    width: 63,
  },
  image: {
    flex: 1,
    overflow: "hidden",
    resizeMode: "contain",
    borderRadius: 40,
  },
  textContainer: {
    alignItems: "center",
  },
  pressed: {
    opacity: 0.5,
  },
});
