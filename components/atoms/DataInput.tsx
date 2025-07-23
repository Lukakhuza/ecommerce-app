import { View, Text, StyleSheet, TextInput } from "react-native";

type Props = {
  placeholder: string;
  style?: any;
};

const DataInput = ({ placeholder, style }: Props) => {
  return (
    <View>
      <TextInput
        autoCorrect={false}
        placeholder={placeholder}
        style={[styles.text, style]}
        // onChangeText={
        //   // handleInputUpdate.bind("email")
        //   () => {}
        // }
        // value="Hello"
      ></TextInput>
    </View>
  );
};

export default DataInput;

const styles = StyleSheet.create({
  text: {
    // width: 250,
    marginVertical: 7,
    height: 56,
    borderRadius: 4,
    backgroundColor: "#F4F4F4",
    paddingLeft: 10,
  },
});
