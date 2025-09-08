import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  SafeAreaView,
} from "react-native";
// import { fetchProfilePicture } from "../../util/auth";
// import { ProductsContext } from "../../store/context/productsContext";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../../store/auth-context";
import { UserInputContext } from "../../store/user-input-context";
import LoadingOverlay from "../../components/atoms/LoadingOverlay";
// import { FavoritesContext } from "../../store/context/favoritesContext";

type Props = {
  navigation: any;
};

const ProfileSettings = ({ navigation }: Props) => {
  const authCtx: any = useContext(AuthContext);
  const userInputCtx: any = useContext(UserInputContext);
  const editPressHandler = (basicInfo: any) => {
    navigation.navigate("ManageUserData"),
      {
        userData: basicInfo,
      };
  };

  const ProfilePicture = () => {
    return (
      <View>
        <Image
          source={{
            uri: "https://drive.google.com/uc?export=view&id=1LBJjTPXlYb-g8vXO9nIIMr9mcqK5l0xa",
          }}
          style={{ width: 50, height: 50, borderRadius: 25 }}
        />
      </View>
    );
  };

  const editUserAddress = () => {
    navigation.navigate("ManageUserAddress");
  };

  useEffect(() => {
    const getProfilePicture = async () => {
      //   const response = await fetchProfilePicture();
      //   setDummyUserData(response);
    };

    getProfilePicture();
  }, []);

  if (userInputCtx.isLoading) {
    return <LoadingOverlay message="Updating..." />;
  }

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <View style={styles.containerProfilePic}>
          <ProfilePicture />
        </View>
        <ScrollView contentContainerStyle={styles.categoriesContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.basicInfo,
              pressed && styles.pressed,
            ]}
          >
            <View>
              <Text style={styles.label1}>
                {userInputCtx.userInput.firstName.value}{" "}
                {userInputCtx.userInput.lastName.value}
              </Text>
              <Text style={styles.label2}>
                {userInputCtx.userInput.emailAddress.value}
              </Text>
              <Text style={styles.label2}>
                {userInputCtx.userInput.phoneNumber.value}
              </Text>
            </View>
            <Pressable
              onPress={editPressHandler}
              style={({ pressed }) => pressed && styles.pressed}
            >
              <Text style={{ color: "purple", fontSize: 17 }}>Edit</Text>
            </Pressable>
          </Pressable>
          <Pressable onPress={editUserAddress} style={styles.category}>
            <View>
              <Text style={styles.label}>Address</Text>
            </View>
            <View></View>
            <View style={{ maxWidth: 180 }}>
              <Text style={{ color: "gray" }} numberOfLines={1}>
                {userInputCtx.userInput.address.addressLine1.value}
                {", "}
                {userInputCtx.userInput.address.city.value}
                {", "}
                {userInputCtx.userInput.address.state.value}{" "}
                {userInputCtx.userInput.address.zipcode.value}
              </Text>
            </View>
            <View>
              <Ionicons name="chevron-forward-outline" size={35} />
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              // productsCtx.updateSelectedCategory("Jackets");
              navigation.navigate("Favorites");
            }}
            style={styles.category}
          >
            <View>
              <Text style={styles.label}>Wishlist</Text>
            </View>
            <View>
              <Ionicons name="chevron-forward-outline" size={35} />
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              // productsCtx.updateSelectedCategory("Jackets");
              navigation.navigate("Payment");
            }}
            style={styles.category}
          >
            <View>
              <Text style={styles.label}>Payment</Text>
            </View>
            <View>
              <Ionicons name="chevron-forward-outline" size={35} />
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              // productsCtx.updateSelectedCategory("Jackets");
              // navigation.navigate("Payment");
            }}
            style={styles.category}
          >
            <View>
              <Text style={styles.label}>Help</Text>
            </View>
            <View>
              <Ionicons name="chevron-forward-outline" size={35} />
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              //   productsCtx.updateSelectedCategory("Jackets");
              //   navigation.navigate("Welcome");
            }}
            style={styles.category}
          >
            <View>
              <Text style={styles.label}>Support</Text>
            </View>
            <View>
              <Ionicons name="chevron-forward-outline" size={35} />
            </View>
          </Pressable>
          <Pressable
            style={styles.signOutContainer}
            onPress={() => {
              userInputCtx.clearUserInput();
              authCtx.logout();
            }}
          >
            <Text style={styles.signOut}>Sign Out</Text>
          </Pressable>
        </ScrollView>
      </View>
      {/* <View></View> */}
    </SafeAreaView>
  );
};

export default ProfileSettings;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
    // backgroundColor: "gray",
  },
  containerProfilePic: {
    marginTop: 38,
    marginHorizontal: 30,
    alignItems: "center",
  },
  categories: {
    height: 840,
  },
  title: {
    marginLeft: 30,
    marginTop: 20,
    fontSize: 25,
    fontWeight: 500,
  },
  label: {
    fontSize: 17,
    marginLeft: 10,
  },
  label1: {
    fontSize: 20,
    marginLeft: 10,
    marginVertical: 4,
    fontWeight: 700,
  },
  label2: {
    color: "gray",
    fontSize: 17,
    marginLeft: 10,
    marginVertical: 4,
  },

  categoriesContainer: {
    display: "flex",
    flexDirection: "column",
    marginHorizontal: 20,
    paddingVertical: 20,
  },
  category: {
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F4F4F4",
    height: 80,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  basicInfo: {
    marginBottom: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F4F4F4",
    height: 110,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  image: {
    flex: 1,
    overflow: "hidden",
    resizeMode: "contain",
  },
  imageContainer: {
    height: 40,
    width: 40,
    marginLeft: 20,
    marginRight: 10,
    marginVertical: 5,
  },
  imageContainerProfilePic: {
    height: 50,
    width: 50,
    marginHorizontal: 30,
    backgroundColor: "brown",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "black",
  },
  signOut: {
    color: "red",
    fontSize: 15,
  },
  signOutContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
});
