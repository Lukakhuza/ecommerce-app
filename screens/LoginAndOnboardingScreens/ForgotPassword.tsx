import { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import ContinueButton from "../../components/atoms/ContinueButton";
import DataInput from "../../components/atoms/DataInput";
import PageHeader from "../../components/atoms/PageHeader";
import { isValidEmail } from "../../util/validation";

type Props = {
  navigation?: any;
};

const ForgotPassword = ({ navigation }: Props) => {
  const [enteredEmail, setEnteredEmail] = useState({
    value: "",
    isValid: true,
  });
  const proceedHandler = () => {
    if (!isValidEmail(enteredEmail.value)) {
      setEnteredEmail({
        value: enteredEmail.value,
        isValid: false,
      });
      return;
    }
    // A password reset email generation function needs to be added here.
    navigation.replace("PasswordReset");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.outerContainer}>
        <PageHeader>Forgot Password?</PageHeader>
        <DataInput
          placeholder="Enter Email Address"
          onChangeText={(enteredText: string) => {
            setEnteredEmail({
              value: enteredText,
              isValid: true,
            });
          }}
          value={enteredEmail}
          isValid={enteredEmail.isValid}
        />
        <ContinueButton onPress={proceedHandler} />
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  outerContainer: {
    marginHorizontal: 30,
  },
});
