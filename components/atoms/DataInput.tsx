import { View, Text, StyleSheet, TextInput, TextStyle } from "react-native";
import { Colors } from "../../constants/colors";

type Props = {
  placeholder: string;
  style?: TextStyle;
  secureTextEntry?: boolean;
  isValid?: boolean;
  invalidInputMessage?: string;
};

const DataInput = ({
  style,
  secureTextEntry = false,
  isValid = true,
  invalidInputMessage = "Invalid Input",
  ...props
}: Props) => {
  return (
    <View>
      {!isValid && (
        <Text style={styles.invalidInputMessage}>{invalidInputMessage}</Text>
      )}
      <TextInput
        autoCorrect={false}
        style={[styles.text, !isValid && styles.textInvalid, style]}
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
    backgroundColor: Colors.bgLight2,
    // backgroundColor: Colors.orange100,
    paddingLeft: 10,
  },
  textInvalid: {
    backgroundColor: Colors.pinkishRed,
  },
  invalidInputMessage: {
    color: Colors.red100,
  },
});
