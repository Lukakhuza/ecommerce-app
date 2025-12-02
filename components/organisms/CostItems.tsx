import { View, Text, StyleSheet } from "react-native";

const CostItems = ({ subtotal, shippingCost, tax, total }: any) => {
  return (
    <View style={styles.costItemsContainer}>
      <View style={styles.costItemContainer}>
        <Text style={styles.costItemLabel}>Subtotal</Text>
        <Text style={styles.costItemValue}>${subtotal}</Text>
      </View>
      <View style={styles.costItemContainer}>
        <Text style={styles.costItemLabel}>Shipping Cost</Text>
        <Text style={styles.costItemValue}>${shippingCost}</Text>
      </View>
      <View style={styles.costItemContainer}>
        <Text style={styles.costItemLabel}>Tax</Text>
        <Text style={styles.costItemValue}>${tax}</Text>
      </View>
      <View style={styles.costItemContainerTotal}>
        <Text style={styles.costItemLabelTotal}>Total</Text>
        <Text style={styles.costItemValue}>${total}</Text>
      </View>
    </View>
  );
};

export default CostItems;

const styles = StyleSheet.create({
  costItemContainer: {
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  costItemLabel: { fontSize: 17, color: "gray", marginLeft: 8 },
  costItemValue: {
    color: "black",
    fontWeight: 700,
    marginRight: 10,
  },
  costItemLabelTotal: {
    fontSize: 17,
    fontWeight: 700,
    color: "gray",
    marginLeft: 8,
  },
  costItemsContainer: {
    flexDirection: "column",
  },
  costItemContainerTotal: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
