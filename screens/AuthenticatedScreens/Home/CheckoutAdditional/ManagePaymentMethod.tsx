import { useState, useContext } from "react";
import { View, Text, Button, Alert } from "react-native";
import { CardField, useStripe } from "@stripe/stripe-react-native";
import { addPaymentMethod } from "../../../../api/checkout.api";
import { UserInputContext } from "../../../../store/user-input-context";
import { CheckoutContext } from "../../../../store/checkout-context";

type Props = {
  route: any;
  navigation: any;
};

const ManagePaymentMethod = ({ route, navigation }: Props) => {
  const { userInput }: any = useContext(UserInputContext);
  const checkoutCtx: any = useContext(CheckoutContext);
  const userId = userInput.id.value;
  const [cardDetails, setCardDetails] = useState<any>(null);
  const { createPaymentMethod } = useStripe();

  const stripeCustomerId = userInput.stripeCustomerId;

  const handleAddCard = async () => {
    if (!cardDetails?.complete) {
      Alert.alert("Please enter complete card details.");
      return;
    }

    const { paymentMethod, error } = await createPaymentMethod({
      paymentMethodType: "Card",
    });

    if (error) {
      Alert.alert(error.message);
      return;
    }

    const paymentMethodData = {
      userId: userId,
      stripeCustomerId: stripeCustomerId,
      paymentMethodId: paymentMethod.id,
    };

    const { stripePaymentMethod } = await addPaymentMethod(paymentMethodData);

    checkoutCtx.updatePaymentMethod(stripePaymentMethod);

    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <CardField
        style={{
          height: 50,
          marginVertical: 30,
        }}
        postalCodeEnabled={false}
        onCardChange={(card) => {
          setCardDetails(card);
        }}
      />
      <Button title="Add Card" onPress={handleAddCard} />
    </View>
  );
};

export default ManagePaymentMethod;
