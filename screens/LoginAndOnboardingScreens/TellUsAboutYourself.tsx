import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { useState, useContext } from "react";
import { UserInputContext } from "../../store/user-input-context";
import { Colors } from "../../constants/colors";
import ContinueButton from "../../components/atoms/ContinueButton";
import { AuthContext } from "../../store/auth-context";
import SmallPurpleButton from "../../components/atoms/SmallPurpleButton";
import { createCustomerInStripe } from "../../api/users.api";
import DropdownComponent from "../../components/atoms/Dropdown";
import { createUser } from "../../api/users.api";
import LoadingOverlay from "../../components/atoms/LoadingOverlay";

type Props = {
  navigation: any;
};
const TellUsAboutYourself = ({ navigation }: Props) => {
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const userInputCtx: any = useContext(UserInputContext);
  const [selection, setSelection] = useState("");
  const [ageRange, setAgeRange] = useState("");

  const createUserHandler = async () => {
    setIsCreatingUser(true);
    const user = {
      email: userInputCtx.userInput.emailAddress.value,
      password: userInputCtx.userInput.password.value,
      firstName: userInputCtx.userInput.firstName.value,
      lastName: userInputCtx.userInput.lastName.value,
      phoneNumber: "123-456-7890",
      address: {
        addressLine1: "600 Main St.",
        city: "Washington",
        state: "NJ",
        zipcode: "01234",
      },
      shopFor: userInputCtx.userInput.shopFor.value,
      ageRange: userInputCtx.userInput.ageRange.value,
      favorites: { items: [] },
      cart: { items: [] },
      stripeCustomerId: "",
    };

    const createdUser = await createUser(user);
    console.log("Created User: ", createdUser);
    const { id: stripeId } = await createCustomerInStripe(createdUser);
    userInputCtx.updateStripeId(createdUser, stripeId);
    userInputCtx.clearUserInput();
    navigation.replace("EnterEmail");
    setIsCreatingUser(false);
  };

  if (isCreatingUser) {
    return <LoadingOverlay message="Creating User..." />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.outerContainer}>
        <View style={styles.topContainer}>
          <View>
            <Text style={styles.text1}>Tell us about yourself</Text>
          </View>
          <View>
            <Text style={styles.text2}>Who do you shop for?</Text>
            <View style={styles.genders}>
              <SmallPurpleButton
                style={styles.gender}
                text="Men"
                mode={selection === "men" ? "selected" : ""}
                onPress={() => {
                  if (selection === "men") {
                    setSelection("");
                    userInputCtx.updateUserInput("shopFor", "", true);
                  } else {
                    setSelection("men");
                    userInputCtx.updateUserInput("shopFor", "men", true);
                  }
                }}
              />
              <SmallPurpleButton
                style={styles.gender}
                mode={selection === "women" ? "selected" : ""}
                text="Women"
                onPress={() => {
                  if (selection === "women") {
                    setSelection("");
                    userInputCtx.updateUserInput("shopFor", "", true);
                  } else {
                    setSelection("women");
                    userInputCtx.updateUserInput("shopFor", "women", true);
                  }
                }}
              />
            </View>
          </View>
          <View>
            <Text style={styles.text2}>How old are you?</Text>
          </View>
          <View>
            <DropdownComponent
              style={styles.dropdown}
              value={ageRange}
              onChange={(item: any) => {
                setAgeRange(item.value);
                userInputCtx.updateUserInput("ageRange", item.value, true);
              }}
            />
          </View>
        </View>
        <View style={styles.footer}>
          <ContinueButton
            text="Finish"
            style={styles.button}
            onPress={createUserHandler}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TellUsAboutYourself;

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  outerContainer: { flex: 1 },
  topContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.white100,
    marginHorizontal: 30,
  },
  text1: {
    fontFamily: "Circular-Std",
    fontWeight: 700,
    marginBottom: 50,
    marginLeft: 0,
    marginTop: 100,
    textAlign: "left",
    fontSize: 28,
  },
  text2: {
    fontFamily: "Circular-Std",
    fontWeight: 400,
    fontSize: 17,
    marginLeft: 10,
    marginVertical: 10,
  },
  genders: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  gender: {
    width: "49%",
  },
  dropdown: {
    margin: 100,
    borderWidth: 1,
    paddingHorizontal: 15,
    height: 60,
    backgroundColor: Colors.bgLight2,
    borderRadius: 30,
  },

  footer: {
    backgroundColor: Colors.bgLight2,
    paddingHorizontal: 30,
    paddingBottom: 20,
  },
  button: {
    width: "100%",
  },
});
