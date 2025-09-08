import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = { style?: any; onChangeText?: any; value?: any };

const SearchComponent = ({ style, onChangeText, value }: Props) => {
  return (
    <View style={[styles.searchBarContainer, style]}>
      <Ionicons name="search-outline" size={25} style={styles.searchIcon} />
      <TextInput
        autoCorrect={false}
        placeholder="Search"
        placeholderTextColor="gray"
        style={styles.searchBar}
        clearButtonMode="while-editing"
        onChangeText={onChangeText}
        value={value}
      ></TextInput>
    </View>
  );
};

export default SearchComponent;

const styles = StyleSheet.create({
  searchBarContainer: {
    marginHorizontal: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // borderColor: "red",
    // borderWidth: 4,
    // height: 40,
  },
  searchBar: {
    backgroundColor: "white",
    // borderColor: "black",
    flex: 1,
    height: 50,
    paddingLeft: 40,
    // borderWidth: 2,
    borderRadius: 30,
  },
  searchIcon: {
    position: "absolute",
    left: 10,
    zIndex: 1,
    // borderColor: "yellow",
    // borderWidth: 3,
  },
});
