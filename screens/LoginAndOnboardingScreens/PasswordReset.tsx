import { View, Text, Image, StyleSheet, SafeAreaView } from "react-native";
import PurpleButtonSmall from "../../components/atoms/PurpleButtonSmall";

type Props = {
  navigation: any;
};

const PasswordReset = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.outerContainer}>
        <View>
          <Image
            style={styles.image}
            source={require("../../assets/password-reset.png")}
          />
        </View>
        <View>
          <Text style={styles.text}>
            We sent you an email to reset your password.
          </Text>
        </View>
        <View>
          <PurpleButtonSmall
            onPress={() => {
              navigation.replace("EnterEmail");
            }}
          >
            Return to Login
          </PurpleButtonSmall>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PasswordReset;

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  outerContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  text: {
    fontSize: 24,
    marginHorizontal: 10,
    marginVertical: 30,
    textAlign: "center",
  },
});
