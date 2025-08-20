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
import PageHeader from "../components/atoms/PageHeader";
import ButtonOAuth from "../components/atoms/ButtonOAuth";
import DataInput from "../components/atoms/DataInput";
import ContinueButton from "../components/atoms/ContinueButton";
import { Colors } from "../constants/colors";
import SmallText from "../components/atoms/SmallText";
import { AuthContext } from "../store/auth-context";
import LoadingOverlay from "../components/atoms/LoadingOverlay";
import ErrorOverlay from "../components/atoms/ErrorOverlay";
// import { useNavigation } from "@react-navigation/native";
// import { addData, fetchProductsData } from "../../util/auth";
// import { UserInputContext } from "../../store/context/userInputContext";

type Props = {
  navigation?: any;
};

const EnterPassword = ({ navigation }: Props) => {
  const {
    loginHandler,
    updateEnteredUserInfo,
    enteredEmail,
    enteredPassword,
    hasError,
    isLoading,
    clearEnteredUserInfo,
  }: any = useContext(AuthContext);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  const proceedHandler = () => {
    // For testing only
    // navigation.navigate("CreateAccount");

    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const passwordIsValid = regex.test(enteredPassword.value);

    if (!passwordIsValid) {
      updateEnteredUserInfo("password", enteredPassword.value, false);
      return;
    }
    loginHandler(enteredEmail.value, enteredPassword.value);
  };

  if (isLoading) {
    // if (hasError && !isLoading) {
    //   return (
    //     <ErrorOverlay
    //       message="There is an error"
    //       onConfirm={() => {
    //         console.log("Error button");
    //       }}
    //     />
    //   );
    // }
    return <LoadingOverlay message="Signing In" />;
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default EnterPassword;

const styles = StyleSheet.create({
  oAuthButtonsContainer: {
    marginTop: 100,
  },
});
