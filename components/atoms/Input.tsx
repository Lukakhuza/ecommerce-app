import { StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  label: any;
  textInputConfig: any;
};

const Input = ({ label, textInputConfig }: Props) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} {...textInputConfig}></TextInput>
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
    color: "purple",
    marginBottom: 4,
  },
  input: {
    backgroundColor: "lightblue",
    color: "darkblue",
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
});
