import { useContext, useEffect, useState } from "react";
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { fetchPaymentMethods } from "../../../api/checkout.api";
import { UserInputContext } from "../../../store/user-input-context";
import { Colors } from "../../../constants/colors";
import PaymentMethodComponent from "../../../components/organisms/PaymentMethodComponent";
import { wait } from "../../../util/helpers";
import LoadingOverlay from "../../../components/atoms/LoadingOverlay";

type Props = {
  navigation: any;
};

const Payment = ({ navigation }: Props) => {
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const userInputCtx: any = useContext(UserInputContext);
  const { stripeCustomerId: customerId } = userInputCtx.userInput;

  useEffect(() => {
    const load = async () => {
      const methods = await fetchPaymentMethods(customerId);
      setPaymentMethods(methods.data);
      await wait(500);
      setIsLoading(false);
    };
    load();
  }, [paymentMethods]);

  if (isLoading) {
    return <LoadingOverlay message="Loading Payment Methods..." />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {paymentMethods?.length > 0 ? (
        <FlatList
          data={paymentMethods}
          renderItem={(itemData) => {
            return <PaymentMethodComponent cardInfo={itemData.item.card} />;
          }}
        />
      ) : (
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.noMethodsText}>
              There are no saved payment methods.
            </Text>
          </View>
          <Button
            title="Add Payment Method"
            onPress={() => {
              navigation.navigate("ManagePaymentMethod");
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Payment;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginHorizontal: 10,
    paddingTop: 20,
    // borderColor: "yellow",
    // borderWidth: 3,
  },
  card: {
    flex: 1,
    alignItems: "center",
    borderWidth: 3,
    borderColor: Colors.primary100,
    marginHorizontal: 10,
    marginVertical: 5,
    height: 50,
    borderRadius: 35,
    justifyContent: "center",
  },
  cardInfo: {
    fontSize: 16,
    fontWeight: 500,
  },
  header: {
    fontSize: 17,
    textAlign: "center",
  },
  container: {
    marginTop: 150,
    marginHorizontal: 10,
    // borderColor: "brown",
    // borderWidth: 3,
    alignItems: "center",
  },
  textContainer: {
    height: 50,
    // justifyContent: "center",
  },
  noMethodsText: {
    // color: Colors.primary100,
    textAlign: "center",
    // borderColor: "blue",
    // borderWidth: 2,
    fontSize: 18,
    justifyContent: "center",
    fontWeight: 500,
  },
});
