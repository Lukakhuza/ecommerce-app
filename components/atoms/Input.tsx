import { StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/colors";

type Props = {
  label: any;
  isValid?: boolean;
  style?: any;
  invalidInputMessage?: string;
  textInputConfig: any;
};

const Input = ({
  label,
  style,
  textInputConfig,
  isValid = true,
  invalidInputMessage = "Invalid Input",
}: Props) => {
  return (
    <View>
      {!isValid && (
        <Text style={styles.invalidInputMessage}>{invalidInputMessage}</Text>
      )}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          style={[styles.input, !isValid && styles.inputInvalid, style]}
          {...textInputConfig}
        ></TextInput>
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 12,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: Colors.purple100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: Colors.lightblue,
    color: Colors.darkblue,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputInvalid: {
    backgroundColor: Colors.pinkishRed,
  },
  invalidInputMessage: {
    color: Colors.red100,
    marginLeft: 10,
  },
});
