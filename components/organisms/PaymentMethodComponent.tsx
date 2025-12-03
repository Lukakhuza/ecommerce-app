import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";
import { Image } from "react-native";

const PaymentMethodComponent = ({ cardInfo }: any) => {
  const cardImages: any = {
    visa: require("../../assets/visa.png"),
    mastercard: require("../../assets/mastercard.png"),
    amex: require("../../assets/amex.png"),
    discover: require("../../assets/discover.png"),
  };

  const cardBrand = cardInfo?.brand;

  return (
    <View style={styles.container}>
      <View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View>
            {cardImages[cardBrand] && (
              <Image style={styles.image} source={cardImages[cardBrand]} />
            )}
          </View>
          <Text style={styles.label2} numberOfLines={1}>
            {`****${cardInfo.last4}, ${cardInfo.exp_month}/${cardInfo.exp_year}`}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PaymentMethodComponent;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.bgLight2,
    height: 80,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  label1: {
    color: Colors.gray100,
    fontSize: 17,
    marginLeft: 10,
    marginVertical: 4,
  },
  label2: {
    fontSize: 20,
    marginLeft: 10,
    marginVertical: 4,
    fontWeight: 700,
  },
  image: {
    width: 80,
    height: 40,
    marginLeft: 10,
  },
});
