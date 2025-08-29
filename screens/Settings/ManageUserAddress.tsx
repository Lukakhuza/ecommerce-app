import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Input from "../../components/atoms/Input";
import Button from "../../components/atoms/Button";
import { UserInputContext } from "../../store/user-input";
import { AuthContext } from "../../store/auth-context";

type Props = {
  route: any;
  navigation: any;
};

const ManageUserAddress = ({ route, navigation }: Props) => {
  const userInputCtx: any = useContext(UserInputContext);
  const authCtx: any = useContext(AuthContext);
  console.log("T20", userInputCtx.userInput.address);
  useEffect(() => {
    // userInputCtx.updateInputs("email", authCtx.authEmail);
  }, []);
  // const [inputValues, setInputValues] = useState({
  //   addressLine1: userInputCtx.input
  //     ? userInputCtx.input.address.addressLine1.toString()
  //     : "",
  //   city: userInputCtx.input ? userInputCtx.input.address.city.toString() : "",
  //   state: userInputCtx.input
  //     ? userInputCtx.input.address.state.toString()
  //     : "",
  //   zipcode: userInputCtx.input
  //     ? userInputCtx.input.address.zipcode.toString()
  //     : "",
  // });

  // const handleTextChange = (inputIdentifier: any, enteredText: string) => {
  //   setInputValues((currInputValues) => {
  //     return {
  //       ...currInputValues,
  //       [inputIdentifier]: enteredText,
  //     };
  //   });
  // };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Edit Address",
    });
  }, [navigation]);

  const cancelHandler = () => {
    navigation.goBack();
  };
  const confirmHandler = () => {
    // Update the values as they are displayed:
    // userInputCtx.updateInputs("address", inputValues);
    // Update the user input context with new address:
    // userInputCtx.input.address = inputValues;

    // Save updated context to the database:
    // const updateUserAddressHandler = async () => {
    //   const user = {
    //     email: userInputCtx.input.email,
    //     password: userInputCtx.input.passwordPlaceholder,
    //     firstName: userInputCtx.input.firstName,
    //     lastName: userInputCtx.input.lastName,
    //     phoneNumber: userInputCtx.input.phoneNumber,
    //     address: userInputCtx.input.address,
    //     shopFor: userInputCtx.input.shopFor,
    //     ageRange: userInputCtx.input.ageRange,
    //     cart: { items: [] },
    //   };

    //   fetch(
    //     "https://backend-ecommerce-mobile-app.onrender.com/user/update-user/68496fe68999df7164dcfc1f",
    //     {
    //       method: "PUT",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(user),
    //     }
    //   )
    //     .then((result) => {
    //       console.log(result);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // };
    // updateUserAddressHandler();
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
            // onChangeText: handleTextChange.bind("addressLine1"),
            value: userInputCtx.userInput.address.addressLine1.value,
          }}
        />
        {/*
        <Input
          label="City"
          textInputConfig={{
            autoCapitalize: "words",
            autoCorrect: false,
            // onChangeText: handleTextChange.bind("city"),
            // value: inputValues.city,
          }}
        />
        <Input
          label="State"
          textInputConfig={{
            autoCapitalize: "characters",
            autoCorrect: false,
            maxLength: "2",
            // onChangeText: handleTextChange.bind("state"),
            // value: inputValues.state,
          }}
        />
        <Input
          label="Zip Code"
          textInputConfig={{
            autoCapitalize: "sentences",
            keyboardType: "numeric",
            maxLength: "5",
            autoCorrect: false,
            // onChangeText: handleTextChange.bind("zipcode"),
            // value: inputValues.zipcode,
          }}
        /> */}
      </View>
      <View style={styles.buttons}>
        <Button mode="flat" onPress={cancelHandler} style={styles.button}>
          Cancel
        </Button>
        <Button mode="" onPress={confirmHandler} style={styles.button}>
          Confirm
        </Button>
      </View>
    </SafeAreaView>
    //   <SafeAreaView style={styles.container}>
    //       <View>
    //         <Input
    //           label="First Name"
    //           textInputConfig={{
    //             autoCapitalize: "sentences",
    //             autoCorrect: false,
    //             onChangeText: handleTextChange.bind(this, "firstName"),
    //             value: inputValues.firstName,
    //           }}
    //         />
    //         <Input
    //           label="Last Name"
    //           textInputConfig={{
    //             autoCapitalize: "sentences",
    //             autoCorrect: false,
    //             onChangeText: handleTextChange.bind(this, "lastName"),
    //             value: inputValues.lastName,
    //           }}
    //         />
    //         <Input
    //           label="Email Address"
    //           textInputConfig={{
    //             editable: false,
    //             placeholder: "Email Address",
    //             maxLength: 12,
    //             value: inputValues.email,
    //             style: { color: "black", fontSize: 17, backgroundColor: "none" },
    //           }}
    //         />
    //         <Input
    //           label="Phone Number"
    //           textInputConfig={{
    //             keyboardType: "numeric",
    //             onChangeText: handleTextChange.bind(this, "phoneNumber"),
    //             placeholder: "###-###-####",
    //             maxLength: 12,
    //             value: inputValues.phoneNumber,
    //           }}
    //         />
    //       </View>
    //       <View style={styles.buttons}>
    //         <Button mode="flat" onPress={cancelHandler} style={styles.button}>
    //           Cancel
    //         </Button>
    //         <Button onPress={confirmHandler} style={styles.button}>
    //           Confirm
    //         </Button>
    //       </View>
    //   </SafeAreaView>
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
