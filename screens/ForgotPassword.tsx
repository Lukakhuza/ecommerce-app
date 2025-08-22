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

const ForgotPassword = ({ navigation }: Props) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.outerContainer}>
          <PageHeader>Forgot Password?</PageHeader>
          <DataInput placeholder="Enter Email Address" />
          <ContinueButton
            onPress={() => {
              // For testing only
              navigation.replace("PasswordReset");
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  outerContainer: {
    paddingHorizontal: 30,
  },
  oAuthButtonsContainer: {
    marginTop: 100,
  },
});
