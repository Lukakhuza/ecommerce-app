import { View, StyleSheet, SafeAreaView } from "react-native";
import { useContext } from "react";
import PageHeader from "../../components/atoms/PageHeader";
import DataInput from "../../components/atoms/DataInput";
import ContinueButton from "../../components/atoms/ContinueButton";
import SmallText from "../../components/atoms/SmallText";
import { UserInputContext } from "../../store/user-input-context";
import {
  isValidFirstName,
  isValidEmail,
  isValidPassword,
  isValidLastName,
} from "../../util/validation";

type Props = {
  navigation?: any;
};

const CreateAccount = ({ navigation }: Props) => {
  const userInputCtx: any = useContext(UserInputContext);
  const proceedHandler = () => {
    const emailIsValid = isValidEmail(
      userInputCtx.userInput.emailAddress.value
    );

    const passwordIsValid = isValidPassword(
      userInputCtx.userInput.password.value
    );

    const firstNameIsValid = isValidFirstName(
      userInputCtx.userInput.firstName.value
    );

    const lastNameIsValid = isValidLastName(
      userInputCtx.userInput.lastName.value
    );

    if (
      !emailIsValid ||
      !passwordIsValid ||
      !firstNameIsValid ||
      !lastNameIsValid
    ) {
      if (!emailIsValid) {
        userInputCtx.updateUserInput(
          "emailAddress",
          userInputCtx.userInput.emailAddress.value,
          false
        );
      }
      if (!passwordIsValid) {
        userInputCtx.updateUserInput(
          "password",
          userInputCtx.userInput.password.value,
          false
        );
      }
      if (!firstNameIsValid) {
        userInputCtx.updateUserInput(
          "firstName",
          userInputCtx.userInput.firstName.value,
          false
        );
      }
      if (!lastNameIsValid) {
        userInputCtx.updateUserInput(
          "lastName",
          userInputCtx.userInput.lastName.value,
          false
        );
      }
      return;
    }
    navigation.navigate("TellUsAboutYourself");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.outerContainer}>
        <PageHeader>Create Account</PageHeader>
        <View style={styles.inputsContainer}>
          <DataInput
            placeholder="First Name"
            onChangeText={(enteredText: string) => {
              userInputCtx.updateUserInput("firstName", enteredText, true);
            }}
            value={userInputCtx.userInput.firstName.value}
            isValid={userInputCtx.userInput.firstName.isValid}
            invalidInputMessage="Please enter your first name."
          />
          <DataInput
            placeholder="Last Name"
            onChangeText={(enteredText: string) => {
              userInputCtx.updateUserInput("lastName", enteredText, true);
            }}
            value={userInputCtx.userInput.lastName.value}
            isValid={userInputCtx.userInput.lastName.isValid}
            invalidInputMessage="Please enter your last name."
          />
          <DataInput
            placeholder="Email Address"
            onChangeText={(enteredText: string) => {
              userInputCtx.updateUserInput("emailAddress", enteredText, true);
            }}
            value={userInputCtx.userInput.emailAddress.value}
            isValid={userInputCtx.userInput.emailAddress.isValid}
            invalidInputMessage="Please enter a valid email address."
          />
          <DataInput
            placeholder="Password"
            onChangeText={(enteredText: string) => {
              userInputCtx.updateUserInput("password", enteredText, true);
            }}
            value={userInputCtx.userInput.password.value}
            isValid={userInputCtx.userInput.password.isValid}
            invalidInputMessage="Make sure the password is at least 8 characters long, is alphanumeric and contains special character(s)."
            secureTextEntry={true}
          />
        </View>
        <ContinueButton
          style={styles.continueButton}
          onPress={proceedHandler}
        />
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

export default CreateAccount;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  outerContainer: {
    flex: 1,
    marginHorizontal: 30,
  },
  inputsContainer: {
    marginBottom: 10,
  },
  continueButton: {
    marginBottom: 25,
  },
});
