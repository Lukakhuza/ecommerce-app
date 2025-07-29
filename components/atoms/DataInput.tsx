import { View, Text, StyleSheet, TextInput } from "react-native";

type Props = {
  placeholder: string;
  style?: any;
  secureTextEntry?: boolean;
  onChangeText?: any;
  value?: any;
};

const DataInput = ({ style, secureTextEntry = false, ...props }: Props) => {
  return (
    <View>
      <TextInput
        autoCorrect={false}
        style={[styles.text, style]}
        secureTextEntry={secureTextEntry}
        {...props}
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
    // backgroundColor: "orange",
    paddingLeft: 10,
  },
});
