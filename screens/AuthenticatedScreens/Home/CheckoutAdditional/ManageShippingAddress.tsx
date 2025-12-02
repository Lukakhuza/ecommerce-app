import { useContext, useLayoutEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Input from "../../../../components/atoms/Input";
import Button from "../../../../components/atoms/Button";
import { UserInputContext } from "../../../../store/user-input-context";
import {
  isValidAddressLine1,
  isValidCityName,
  isValidUSState,
  isValidUSZipCode,
} from "../../../../util/validation";
import { Colors } from "../../../../constants/colors";
import { CardField } from "@stripe/stripe-react-native";
import { CheckoutContext } from "../../../../store/checkout-context";

type Props = {
  route: any;
  navigation: any;
};

const ManageShippingAddress = ({ route, navigation }: Props) => {
  const { shippingAddress, updateShippingAddress }: any =
    useContext(CheckoutContext);

  // useLayoutEffect(() => {
  // navigation.setOptions({
  //   title: "Edit Address",
  // });
  // }, [navigation]);

  const cancelHandler = () => {
    navigation.goBack();
  };
  const confirmHandler = () => {
    // Validate the address inputs
    const addressLine1IsValid = isValidAddressLine1(
      shippingAddress.addressLine1.value
    );
    const cityIsValid = isValidCityName(shippingAddress.city.value);
    const stateIsValid = isValidUSState(shippingAddress.state.value);
    const zipcodeIsValid = isValidUSZipCode(shippingAddress.zipcode.value);

    if (
      !addressLine1IsValid ||
      !cityIsValid ||
      !stateIsValid ||
      !zipcodeIsValid
    ) {
      if (!addressLine1IsValid) {
        updateShippingAddress(
          "addressLine1",
          shippingAddress.addressLine1.value,
          false
        );
      }
      if (!cityIsValid) {
        updateShippingAddress("city", shippingAddress.city.value, false);
      }
      if (!stateIsValid) {
        updateShippingAddress("state", shippingAddress.state.value, false);
      }
      if (!zipcodeIsValid) {
        updateShippingAddress("zipcode", shippingAddress.zipcode.value, false);
      }
      return;
    }

    updateShippingAddress(
      "addressLine1",
      shippingAddress.addressLine1.value,
      true
    );
    updateShippingAddress("city", shippingAddress.city.value, true);
    updateShippingAddress("state", shippingAddress.state.value, true);
    updateShippingAddress("zipcode", shippingAddress.zipcode.value, true);

    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {/* <CardField
          postalCodeEnabled={true}
          onCardChange={(details) => {
            // setCardDetails(details);
          }}
        /> */}
        <Input
          label="Address Line 1"
          textInputConfig={{
            autoCapitalize: "sentences",
            autoCorrect: false,
            onChangeText: (enteredText: string) => {
              updateShippingAddress("addressLine1", enteredText, true);
            },
            value: shippingAddress.addressLine1.value,
          }}
          isValid={shippingAddress.addressLine1.isValid}
          invalidInputMessage="Please enter a valid street name and number"
        />
        <Input
          label="City"
          textInputConfig={{
            autoCapitalize: "words",
            autoCorrect: false,
            onChangeText: (enteredText: string) => {
              updateShippingAddress("city", enteredText, true);
            },
            value: shippingAddress.city.value,
          }}
          isValid={shippingAddress.city.isValid}
          invalidInputMessage="Please enter a valid city name"
        />
        <Input
          label="State"
          textInputConfig={{
            autoCapitalize: "characters",
            autoCorrect: false,
            maxLength: 2,
            onChangeText: (enteredText: string) => {
              updateShippingAddress("state", enteredText, true);
            },
            value: shippingAddress.state.value,
          }}
          isValid={shippingAddress.state.isValid}
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
              updateShippingAddress("zipcode", enteredText, true);
            },
            value: shippingAddress.zipcode.value,
          }}
          isValid={shippingAddress.zipcode.isValid}
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

export default ManageShippingAddress;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: 30,
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
    borderTopColor: Colors.lightpurple,
    alignItems: "center",
  },
});
