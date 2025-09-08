import { useContext, useLayoutEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Input from "../../components/atoms/Input";
// import IconButton from "../components/ui/IconButton";
import Button from "../../components/atoms/Button";
import { UserInputContext } from "../../store/user-input-context";
import { AuthContext } from "../../store/auth-context";
import {
  isValidFirstName,
  isValidLastName,
  isValidPhoneNumber,
} from "../../util/validation";

type Props = {
  route: any;
  navigation: any;
};

const ManageUserData = ({ route, navigation }: Props) => {
  const userInputCtx: any = useContext(UserInputContext);
  // console.log("Test 3", userInputCtx.userInput.firstName.isValid);
  const [phone, setPhone] = useState("");
  const [inputValues, setInputValues] = useState({
    firstName: { value: userInputCtx.userInput.firstName.value, isValid: true },
    lastName: { value: userInputCtx.userInput.lastName.value, isValid: true },
    phoneNumber: {
      value: userInputCtx.userInput.phoneNumber.value,
      isValid: true,
    },
  });
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Edit Basic Info",
    });
  }, [navigation]);

  const handleTextChange = (inputIdentifier: any, enteredText: string) => {
    setInputValues((currInputs) => {
      return {
        ...currInputs,
        [inputIdentifier]: { value: enteredText, isValid: true },
      };
    });
  };

  const confirmHandler = () => {
    // Check if the inputs are valid:
    const firstNameIsValid = isValidFirstName(inputValues.firstName.value);
    const lastNameIsValid = isValidLastName(inputValues.lastName.value);
    const phoneNumberIsValid = isValidPhoneNumber(
      inputValues.phoneNumber.value
    );

    if (!firstNameIsValid || !lastNameIsValid || !phoneNumberIsValid) {
      if (!firstNameIsValid) {
        // need to create a function that will call this: (same logic is being repeated)
        setInputValues((currInputs) => {
          return {
            ...currInputs,
            firstName: { value: inputValues.firstName.value, isValid: false },
          };
        });
      }
      if (!lastNameIsValid) {
        // need to create a function that will call this: (same logic is being repeated)
        setInputValues((currInputs) => {
          return {
            ...currInputs,
            lastName: { value: inputValues.lastName.value, isValid: false },
          };
        });
      }
      if (!phoneNumberIsValid) {
        // need to create a function that will call this: (same logic is being repeated)
        setInputValues((currInputs) => {
          return {
            ...currInputs,
            phoneNumber: {
              value: inputValues.phoneNumber.value,
              isValid: false,
            },
          };
        });
      }
      return;
    }

    userInputCtx.updateUserInfo(inputValues);
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Input
          label="First Name"
          textInputConfig={{
            autoCapitalize: "sentences",
            autoCorrect: false,
            onChangeText: (enteredText: string) => {
              handleTextChange("firstName", enteredText);
            },
            value: inputValues.firstName.value,
          }}
          isValid={inputValues.firstName.isValid}
          invalidInputMessage="Please enter a valid first name"
        />
        <Input
          label="Last Name"
          textInputConfig={{
            autoCapitalize: "sentences",
            autoCorrect: false,
            onChangeText: (enteredText: string) => {
              handleTextChange("lastName", enteredText);
            },
            value: inputValues.lastName.value,
          }}
          isValid={inputValues.lastName.isValid}
          invalidInputMessage="Please enter a valid last name"
        />
        <Input
          label="Email Address"
          textInputConfig={{
            editable: false,
            placeholder: "Email Address",
            // maxLength: 20,
            value: userInputCtx.userInput.emailAddress.value,
            style: { color: "black", fontSize: 17, backgroundColor: "none" },
          }}
        />
        <Input
          label="Phone Number"
          textInputConfig={{
            autoCapitalize: "sentences",
            autoCorrect: false,
            onChangeText: (enteredText: string) => {
              handleTextChange("phoneNumber", enteredText);
            },
            value: inputValues.phoneNumber.value,
          }}
          isValid={inputValues.phoneNumber.isValid}
          invalidInputMessage="Please enter a valid phone number"
        />
      </View>
      <View style={styles.buttons}>
        <Button
          onPress={cancelHandler}
          mode="flat2"
          style={{
            minWidth: 120,
            marginHorizontal: 8,
            marginTop: 20,
            borderColor: "blue",
          }}
        >
          Cancel
        </Button>
        <Button mode="" onPress={confirmHandler} style={styles.button}>
          Confirm
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default ManageUserData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    color: "purple",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
    marginTop: 20,
    borderColor: "blue",
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: "lightpurple",
    alignItems: "center",
  },
});
