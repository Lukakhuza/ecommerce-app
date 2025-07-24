import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
  // Input,
  SafeAreaView,
} from "react-native";
import { useState, useContext } from "react";
// import PurpleButton from "../../components/ui/PurpleButton";
import PageHeader from "../components/atoms/PageHeader";
import ButtonOAuth from "../components/atoms/ButtonOAuth";
import DataInput from "../components/atoms/DataInput";
import ContinueButton from "../components/atoms/ContinueButton";
// import Button3 from "../../components/ui/Button3";
import { Colors } from "../constants/colors";
import SmallText from "../components/atoms/SmallText";
// import { useNavigation } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
// import { addData, fetchProductsData } from "../../util/auth";
// import { UserInputContext } from "../../store/context/userInputContext";
import EnterPassword from "./EnterPassword";

type Props = {
  navigation?: any;
};

const EnterEmail = () => {
  const navigation: any = useNavigation();
  //   const userInputCtx: any = useContext(UserInputContext);
  //   const userData = {
  //     email: userInputCtx.email,
  //     passwordPlaceholder: userInputCtx.passwordPlaceHolder,
  //     firstName: userInputCtx.firstName,
  //     lastName: userInputCtx.lastName,
  //     phoneNumber: userInputCtx.phoneNumber,
  //     shopFor: userInputCtx.shopFor,
  //     ageRange: userInputCtx.ageRange,
  //   };

  //   const handleInputUpdate = (inputIdentifier: any, enteredText: string) => {
  //     userInputCtx.updateInputs(inputIdentifier, enteredText);
  //   };

  return (
    <SafeAreaView
    // style={styles.safeAreaView}
    >
      <ScrollView
      // style={styles.container}
      >
        <View style={styles.outerContainer}>
          <PageHeader>Sign In</PageHeader>
          <DataInput placeholder="Email Address" />
          <ContinueButton
            onPress={() => {
              navigation.navigate("EnterPassword");
            }}
          />
          <SmallText
            primaryText="Don't have an account?"
            secondaryText="Create One"
            onPress={() => {
              navigation.navigate("CreateAccount");
            }}
            style={{}}
          />
          <View style={styles.oAuthButtonsContainer}>
            <ButtonOAuth
              onPress={() => {
                console.log("Log in with your Apple account.");
              }}
              imageSource={require("../assets/OAuth/apple-logo.png")}
            >
              Continue with Apple
            </ButtonOAuth>
            <ButtonOAuth
              onPress={() => {
                console.log("Log in with your Google account.");
              }}
              imageSource={require("../assets/OAuth/google-logo.png")}
            >
              Continue with Google
            </ButtonOAuth>
            <ButtonOAuth
              onPress={() => {
                console.log("Log in with your Facebook account.");
              }}
              imageSource={require("../assets/OAuth/facebook-logo.png")}
            >
              Continue with Facebook
            </ButtonOAuth>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EnterEmail;

const styles = StyleSheet.create({
  oAuthButtonsContainer: {
    marginTop: 75,
  },
  outerContainer: {
    // borderWidth: 5,
    // borderColor: "brown",
  },
  // safeAreaView: {
  //   backgroundColor: "white",
  // },
  // container: {
  //   // flex: 1,
  //   height: "100%",
  //   flexDirection: "column",
  //   backgroundColor: "white",
  // },
  // inputsOuterContainer: {
  //   alignItems: "center",
  // },
  // title: {
  //   fontFamily: "Circular-Std",
  //   fontWeight: 700,
  //   fontSize: 32,
  //   lineHeight: 34.5,
  //   letterSpacing: -0.41,
  // },
  // titleContainer: {
  //   top: 173,
  //   left: 35,
  // },
  // signInInputContainer: {
  //   marginTop: 6,
  //   marginHorizontal: 6,
  //   marginBottom: 250,
  //   height: 152,
  //   top: 190,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // textInput: {
  //   width: 360,
  //   height: 56,
  //   borderRadius: 4,
  //   backgroundColor: "#F4F4F4",
  //   paddingLeft: 10,
  // },
  // redirectText: {
  //   flexDirection: "row",
  //   marginLeft: 5,
  // },
  // buttons2: {
  //   flex: 1,
  //   flexDirection: "column",
  //   width: "80%",
  // },
  // button1: {
  //   // backgroundColor: "blue",
  // },
});
