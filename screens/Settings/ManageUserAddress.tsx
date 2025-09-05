import { useContext, useLayoutEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Input from "../../components/atoms/Input";
import Button from "../../components/atoms/Button";
import { UserInputContext } from "../../store/user-input";
import {
  isValidAddressLine1,
  isValidCityName,
  isValidUSState,
  isValidUSZipCode,
} from "../../util/validation";

type Props = {
  route: any;
  navigation: any;
};

const ManageUserAddress = ({ route, navigation }: Props) => {
  const userInputCtx: any = useContext(UserInputContext);
  const [addressInputValues, setAddressInputValues] = useState({
    addressLine1: {
      value: userInputCtx.userInput.address.addressLine1.value,
      isValid: true,
    },
    city: {
      value: userInputCtx.userInput.address.city.value,
      isValid: true,
    },
    state: {
      value: userInputCtx.userInput.address.state.value,
      isValid: true,
    },
    zipcode: {
      value: userInputCtx.userInput.address.zipcode.value,
      isValid: true,
    },
  });

  const handleTextChange = (inputIdentifier: any, enteredText: string) => {
    setAddressInputValues((currAddress) => {
      return {
        ...currAddress,
        [inputIdentifier]: { value: enteredText, isValid: true },
      };
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Edit Address",
    });
  }, [navigation]);

  const cancelHandler = () => {
    navigation.goBack();
  };
  const confirmHandler = () => {
    // Validate the address inputs
    const addressLine1IsValid = isValidAddressLine1(
      addressInputValues.addressLine1.value
    );
    const cityIsValid = isValidCityName(addressInputValues.city.value);
    const stateIsValid = isValidUSState(addressInputValues.state.value);
    const zipcodeIsValid = isValidUSZipCode(addressInputValues.zipcode.value);

    console.log(
      "TT11",
      addressLine1IsValid,
      cityIsValid,
      stateIsValid,
      zipcodeIsValid
    );
    if (
      !addressLine1IsValid ||
      !cityIsValid ||
      !stateIsValid ||
      !zipcodeIsValid
    ) {
      if (!addressLine1IsValid) {
        setAddressInputValues((currAddressInputs) => {
          return {
            ...currAddressInputs,
            firstName: {
              value: addressInputValues.addressLine1.value,
              isValid: false,
            },
          };
        });
      }
      if (!cityIsValid) {
        setAddressInputValues((currAddressInputs) => {
          return {
            ...currAddressInputs,
            city: {
              value: addressInputValues.city.value,
              isValid: false,
            },
          };
        });
      }
      if (!stateIsValid) {
        setAddressInputValues((currAddressInputs) => {
          return {
            ...currAddressInputs,
            state: {
              value: addressInputValues.state.value,
              isValid: false,
            },
          };
        });
      }
      if (!zipcodeIsValid) {
        setAddressInputValues((currAddressInputs) => {
          return {
            ...currAddressInputs,
            zipcode: {
              value: addressInputValues.zipcode.value,
              isValid: false,
            },
          };
        });
        return;
      }
    }

    userInputCtx.updateAddress(addressInputValues);
    navigation.goBack();
  };
  return (
    <SafeAreaView>
      <View>
        <Input
          label="Address Line 1"
          textInputConfig={{
            autoCapitalize: "sentences",
            autoCorrect: false,
            onChangeText: (enteredText: string) => {
              handleTextChange("addressLine1", enteredText);
            },
            value: addressInputValues.addressLine1.value,
          }}
          isValid={addressInputValues.addressLine1.isValid}
          invalidInputMessage="Please enter a valid street name and number"
        />
        <Input
          label="City"
          textInputConfig={{
            autoCapitalize: "words",
            autoCorrect: false,
            onChangeText: (enteredText: string) => {
              handleTextChange("city", enteredText);
            },
            value: addressInputValues.city.value,
          }}
          isValid={addressInputValues.city.isValid}
          invalidInputMessage="Please enter a valid city name"
        />
        <Input
          label="State"
          textInputConfig={{
            autoCapitalize: "characters",
            autoCorrect: false,
            maxLength: 2,
            onChangeText: (enteredText: string) => {
              handleTextChange("state", enteredText);
            },
            value: addressInputValues.state.value,
          }}
          isValid={addressInputValues.state.isValid}
          invalidInputMessage="Please enter a valid state abbreviation"
        />
        <Input
          label="Zip Code"
          textInputConfig={{
            autoCapitalize: "sentences",
            keyboardType: "numeric",
            maxLength: 5,
            autoCorrect: false,
            onChangeText: (enteredText: string) => {
              handleTextChange("zipcode", enteredText);
            },
            value: addressInputValues.zipcode.value,
          }}
          isValid={addressInputValues.zipcode.isValid}
          invalidInputMessage="Please enter a valid zipcode"
        />
      </View>
      <View style={styles.buttons}>
        <Button mode="flat2" onPress={cancelHandler} style={styles.button}>
          Cancel
        </Button>
        <Button mode="" onPress={confirmHandler} style={styles.button}>
          Confirm
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default ManageUserAddress;

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
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: "lightpurple",
    alignItems: "center",
  },
});
