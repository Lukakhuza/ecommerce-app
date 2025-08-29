import { useContext, useLayoutEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Input from "../../components/atoms/Input";
// import IconButton from "../components/ui/IconButton";
import Button from "../../components/atoms/Button";
import { UserInputContext } from "../../store/user-input";
import { AuthContext } from "../../store/auth-context";

type Props = {
  route: any;
  navigation: any;
};

const ManageUserData = ({ route, navigation }: Props) => {
  const userInputCtx: any = useContext(UserInputContext);
  const [originalValues, setOriginalValues] = useState({
    firstName: userInputCtx.userInput.firstName.value,
    lastName: userInputCtx.userInput.lastName.value,
    phoneNumber: userInputCtx.userInput.phoneNumber.value,
  });
  console.log(originalValues);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Edit Basic Info",
    });
  }, [navigation]);

  const confirmHandler = () => {
    setOriginalValues({
      firstName: userInputCtx.userInput.firstName.value,
      lastName: userInputCtx.userInput.lastName.value,
      phoneNumber: userInputCtx.userInput.phoneNumber.value,
    });
    navigation.goBack();
  };

  const cancelHandler = () => {
    // Change the values back to original values and close the modal.
    userInputCtx.updateUserInput("firstName", originalValues.firstName, true);
    userInputCtx.updateUserInput("lastName", originalValues.lastName, true);
    userInputCtx.updateUserInput(
      "phoneNumber",
      originalValues.phoneNumber,
      true
    );
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
              userInputCtx.updateUserInput("firstName", enteredText, true);
            },
            value: userInputCtx.userInput.firstName.value,
          }}
        />
        <Input
          label="Last Name"
          textInputConfig={{
            autoCapitalize: "sentences",
            autoCorrect: false,
            onChangeText: (enteredText: string) => {
              userInputCtx.updateUserInput("lastName", enteredText, true);
            },
            value: userInputCtx.userInput.lastName.value,
          }}
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
            keyboardType: "numeric",
            onChangeText: (enteredText: string) => {
              userInputCtx.updateUserInput("phoneNumber", enteredText, true);
            },
            placeholder: "###-###-####",
            maxLength: 12,
            value: userInputCtx.userInput.phoneNumber.value,
          }}
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
