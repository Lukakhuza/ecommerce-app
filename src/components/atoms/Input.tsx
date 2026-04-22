import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from 'react-native';
import { Colors } from '../../theme/colors';

type Props = {
  label: string;
  isValid?: boolean;
  style?: TextStyle;
  invalidInputMessage?: string;
  textInputConfig: TextInputProps;
};

const Input = ({
  label,
  style,
  textInputConfig,
  isValid = true,
  invalidInputMessage = 'Invalid Input',
}: Props) => {
  console.log('TIC: ', textInputConfig);
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
