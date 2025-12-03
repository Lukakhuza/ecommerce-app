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

const Payment = () => {
  const [paymentMethods, setPaymentMethods] = useState(null);
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
  }, []);

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
        <View>
          <Text>There are no saved payment methods.</Text>
          <Button title="Add Payment Method" />
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
});
