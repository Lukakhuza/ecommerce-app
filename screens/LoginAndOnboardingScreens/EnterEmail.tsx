import { View, StyleSheet, SafeAreaView } from "react-native";
import { useContext } from "react";
import validator from "validator";
import PageHeader from "../../components/atoms/PageHeader";
import ButtonOAuth from "../../components/atoms/ButtonOAuth";
import DataInput from "../../components/atoms/DataInput";
import ContinueButton from "../../components/atoms/ContinueButton";
import SmallText from "../../components/atoms/SmallText";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../store/auth-context";

type Props = {
  navigation?: any;
};

const EnterEmail = () => {
  const authCtx: any = useContext(AuthContext);
  const navigation: any = useNavigation();

  const proceedHandler = () => {
    const emailIsValid = validator.isEmail(authCtx.enteredEmail.value);
    if (!emailIsValid) {
      authCtx.updateEnteredUserInfo("email", authCtx.enteredEmail.value, false);
      return;
    }
    navigation.navigate("EnterPassword");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.outerContainer}>
        <PageHeader>Sign In</PageHeader>
        <DataInput
          placeholder="Email Address"
          onChangeText={(enteredText: string) => {
            authCtx.updateEnteredUserInfo("email", enteredText, true);
          }}
          value={authCtx.enteredEmail.value}
          isValid={authCtx.enteredEmail.isValid}
          invalidInputMessage="Please enter a valid email"
        />
        <ContinueButton onPress={proceedHandler} />
        <SmallText
          primaryText="Don't have an account?"
          secondaryText="Create One"
          onPress={() => {
            navigation.navigate("CreateAccount");
          }}
        />
        <View style={styles.oAuthButtonsContainer}>
          <ButtonOAuth
            onPress={() => {
              console.log("Log in with your Apple account.");
            }}
            imageSource={require("../../assets/OAuth/apple-logo.png")}
          >
            Continue with Apple
          </ButtonOAuth>
          <ButtonOAuth
            onPress={() => {
              console.log("Log in with your Google account.");
            }}
            imageSource={require("../../assets/OAuth/google-logo.png")}
          >
            Continue with Google
          </ButtonOAuth>
          <ButtonOAuth
            onPress={() => {
              console.log("Log in with your Facebook account.");
            }}
            imageSource={require("../../assets/OAuth/facebook-logo.png")}
          >
            Continue with Facebook
          </ButtonOAuth>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EnterEmail;

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  outerContainer: {
    marginHorizontal: 30,
  },
  oAuthButtonsContainer: {
    marginTop: 75,
  },
});
