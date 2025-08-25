import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
  SafeAreaView,
} from "react-native";
import { useState, useContext } from "react";
// import { useNavigation } from "@react-navigation/native";
import PageHeader from "../../components/atoms/PageHeader";
import ButtonOAuth from "../../components/atoms/ButtonOAuth";
import validator from "validator";
import DataInput from "../../components/atoms/DataInput";
import ContinueButton from "../../components/atoms/ContinueButton";
import { Colors } from "../../constants/colors";
import SmallText from "../../components/atoms/SmallText";
import { UserInputContext } from "../../store/user-input";
// import { useNavigation } from "@react-navigation/native";
// import { addData, fetchProductsData } from "../../util/auth";
// import { UserInputContext } from "../../store/context/userInputContext";

type Props = {
  navigation?: any;
};

const CreateAccount = ({ navigation }: Props) => {
  const userInputCtx: any = useContext(UserInputContext);
  // const navigation = useNavigation();
  const proceedHandler = () => {
    // Check if inputs are valid:
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const passwordIsValid = regex.test(userInputCtx.userInput.password.value);
    const emailIsValid = validator.isEmail(
      userInputCtx.userInput.emailAddress.value
    );
    const firstNameIsValid =
      userInputCtx.userInput.firstName.value.trim().length > 0 ? true : false;
    const lastNameIsValid =
      userInputCtx.userInput.lastName.value.trim().length > 0 ? true : false;

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
    <SafeAreaView>
      <ScrollView>
        <View style={styles.outerContainer}>
          <PageHeader>Create Account</PageHeader>
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
            style={styles.endOfInputs}
          />
          <ContinueButton
            style={styles.endOfContinueButton}
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  outerContainer: {
    paddingHorizontal: 30,
  },
  oAuthButtonsContainer: {
    marginTop: 100,
  },
  endOfInputs: {
    marginBottom: 20,
  },
  endOfContinueButton: {
    marginBottom: 25,
  },
});
