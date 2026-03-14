import { useContext } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import ContinueButton from "../../components/atoms/ContinueButton";
import DataInput from "../../components/atoms/DataInput";
import LoadingOverlay from "../../components/atoms/LoadingOverlay";
import PageHeader from "../../components/atoms/PageHeader";
import SmallText from "../../components/atoms/SmallText";
import { AuthContext } from "../../store/auth-context";
import { isValidPassword } from "../../util/validation";

type Props = {
  navigation?: any;
};

const EnterPassword = ({ navigation }: Props) => {
  const {
    loginHandler,
    updateEnteredUserInfo,
    enteredEmail,
    enteredPassword,
    isLoading,
  }: any = useContext(AuthContext);

  const proceedHandler = () => {
    if (!isValidPassword(enteredPassword.value)) {
      updateEnteredUserInfo("password", enteredPassword.value, false);
      return;
    }

    loginHandler(enteredEmail.value, enteredPassword.value);
  };

  if (isLoading) {
    return <LoadingOverlay message="Signing In" />;
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.outerContainer}>
        <PageHeader>Sign In</PageHeader>
        <DataInput
          placeholder="Password"
          onChangeText={(enteredText: string) => {
            updateEnteredUserInfo("password", enteredText, true);
          }}
          value={enteredPassword}
          isValid={enteredPassword.isValid}
          invalidInputMessage="Make sure the password is at least 8 characters long, is alphanumeric and contains special character(s)."
          secureTextEntry={true}
        />
        <ContinueButton onPress={proceedHandler} />
        <SmallText
          primaryText="Forgot Password?"
          secondaryText="Reset"
          onPress={() => {
            navigation.navigate("ForgotPassword");
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default EnterPassword;

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  outerContainer: {
    marginHorizontal: 30,
  },
});
