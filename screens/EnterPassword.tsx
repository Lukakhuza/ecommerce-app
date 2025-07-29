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
// import { useNavigation } from "@react-navigation/native";
// import { addData, fetchProductsData } from "../../util/auth";
// import { UserInputContext } from "../../store/context/userInputContext";

type Props = {
  navigation?: any;
};

const EnterPassword = ({ navigation }: Props) => {
  const authCtx: any = useContext(AuthContext);
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <PageHeader>Sign In</PageHeader>
          <DataInput
            placeholder="Password"
            onChangeText={(enteredText: string) => {
              authCtx.updateEnteredUserInfo("password", enteredText);
            }}
            value={authCtx.enteredPassword}
            secureTextEntry={true}
          />
          <ContinueButton
            onPress={() => {
              // For testing only
              // navigation.navigate("CreateAccount");
              authCtx.loginHandler(
                authCtx.enteredEmail,
                authCtx.enteredPassword
              );
            }}
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

export default EnterPassword;

const styles = StyleSheet.create({
  oAuthButtonsContainer: {
    marginTop: 100,
  },
});
