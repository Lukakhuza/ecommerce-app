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
// import { useNavigation } from "@react-navigation/native";
// import { addData, fetchProductsData } from "../../util/auth";
// import { UserInputContext } from "../../store/context/userInputContext";

type Props = {
  navigation?: any;
};

const CreateAccount = ({ navigation }: Props) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <PageHeader>Create Account</PageHeader>
          <DataInput placeholder="First Name" />
          <DataInput placeholder="Last Name" />
          <DataInput placeholder="Email Address" />
          <DataInput placeholder="Password" style={styles.endOfInputs} />
          <ContinueButton
            style={styles.endOfContinueButton}
            onPress={() => {
              navigation.replace("ForgotPassword");
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

export default CreateAccount;

const styles = StyleSheet.create({
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
