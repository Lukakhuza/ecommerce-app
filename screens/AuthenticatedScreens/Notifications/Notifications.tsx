import {
  BackHandler,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import SmallPurpleButton from "../../../components/atoms/SmallPurpleButton";
import { Colors } from "../../../constants/colors";

type Props = {
  navigation: any;
};

const Notifications = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.header}>Notifications</Text>
      <ScrollView contentContainerStyle={styles.root}>
        <View style={styles.content}>
          <Image
            style={styles.image}
            source={require("../../../assets/bell.png")}
          />
          <View>
            <Text style={{ fontSize: 20, marginVertical: 10 }}>
              No Notifications yet
            </Text>
          </View>
          <View>
            <SmallPurpleButton
              onPress={() => {
                navigation.navigate("HomeTab", { screen: "Categories" });
              }}
              text="Explore Categories"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  safeArea: {
    height: "100%",
  },
  header: {
    fontSize: 17,
    textAlign: "center",
  },
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  imageContainer: {
    justifyContent: "center",
    width: 200,
    height: 200,
    borderColor: Colors.yellow100,
    borderWidth: 4,
  },
  image: {
    width: 100,
    height: 100,
  },
});
