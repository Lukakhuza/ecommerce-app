import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useState, useContext } from "react";
// import PurpleButton from "../../components/ui/PurpleButton";
import { UserInputContext } from "../../store/user-input-context";
import { Colors } from "../../constants/colors";
import ContinueButton from "../../components/atoms/ContinueButton";
// import { Dropdown } from "react-native-element-dropdown";
import { AuthContext } from "../../store/auth-context";
// import { addData, createUser } from "../../util/auth";
// import LoadingOverlay from "../../components/ui/LoadingOverlay";
import SmallPurpleButton from "../../components/atoms/SmallPurpleButton";
import DropdownComponent from "../../components/atoms/Dropdown";
import { createUser } from "../../api/users.api";
import LoadingOverlay from "../../components/atoms/LoadingOverlay";
// import { formToJSON } from "axios";

const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
];

type Props = {
  navigation: any;
};
const TellUsAboutYourself = ({ navigation }: Props) => {
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const authCtx: any = useContext(AuthContext);
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
      cart: { items: [] },
    };

    await createUser(user);
    userInputCtx.clearUserInput();
    navigation.replace("EnterEmail");
    setIsCreatingUser(false);
  };

  if (isCreatingUser) {
    return <LoadingOverlay message="Creating User..." />;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.innerContainer}>
        <View>
          <Text style={styles.text1}>Tell us about yourself</Text>
        </View>
        <View>
          <Text style={styles.text2}>Who do you shop for?</Text>
          <View style={styles.genders}>
            {/* <View
              style={{
                width: 1,
                height: "100%",
                backgroundColor: "black", // Black color
              }}
            /> */}
            <SmallPurpleButton
              style={{ width: "48%" }}
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
              style={{ width: "48%" }}
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
      </ScrollView>
      <View style={styles.footer}>
        <ContinueButton
          text="Finish"
          style={styles.button}
          onPress={createUserHandler}
        />
      </View>
    </View>
  );
};

export default TellUsAboutYourself;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    borderColor: "blue",
    borderWidth: 3,
  },
  innerContainer: {
    // top: 3,
    // marginTop: 150,
    // marginBottom: 200,
    // left: 30,
    // flex: 1,
    // flexDirection: "column",
    // justifyContent: "center",
    paddingHorizontal: 15,
  },
  selected: {
    backgroundColor: "yellow",
  },
  //   subcontainer: {
  //     // marginBottom: 100,
  //     // height: 100,
  //   },
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
  //   text3: {
  //     fontFamily: "Circular-Std",
  //     fontWeight: 400,
  //     fontSize: 17,
  //     marginLeft: 30,
  //     marginVertical: 10,
  //   },
  genders: {
    // flex: 1,
    // marginHorizontal: 20,
    // height: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    // margin: 10,
    // borderColor: "black",
    // borderWidth: 3,
    marginBottom: 30,
  },
  male: {
    width: 40,
    // marginRight: 10,
    marginLeft: 15,
  },
  female: {
    width: 40,
    // marginLeft: 10,
    marginRight: 15,
  },
  dropdown: {
    margin: 100,
    // borderColor: "black",
    borderWidth: 1,
    paddingHorizontal: 15,
    height: 60,
    backgroundColor: "#F4F4F4",
    borderRadius: 30,
    // borderBottomColor: "gray",
    // borderBottomWidth: 0.5,
  },
  //   //   textContainer: {
  //   //     top: 180,
  //   //     left: 27,
  //   //   },
  footer: {
    backgroundColor: Colors.bgLight2,
    height: 100,
    bottom: 0,
    left: 0,
    right: 0,
    position: "absolute",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  button: {
    width: "100%",
  },
});
