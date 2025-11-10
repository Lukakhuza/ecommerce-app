import { View, Text, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Colors } from "../../../constants/colors";

type Props = {
  route: any;
  navigation: any;
};

const OrderDetails = ({ navigation }: Props) => {
  const route: any = useRoute();
  const orderData = route.params.orderData;

  return (
    <View style={{ marginHorizontal: 25 }}>
      <View
        style={{
          // justifyContent: "space-between",
          // alignItems: "stretch",
          // flexDirection: "row",
          // justifyContent: "space-between",
          marginTop: 30,
          marginBottom: 60,
        }}
      >
        <View
          style={{
            alignItems: "center",
            // borderWidth: 3,
            // borderColor: "yellow",
            // flexDirection: "row",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 30,
          }}
        >
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Ionicons
              name="checkmark-circle"
              size={30}
              color={Colors.primary100}
            />
            <Text style={{ marginLeft: 15, fontSize: 20 }}>Delivered</Text>
          </View>
          <View>
            <Text style={{ fontSize: 20 }}>28 May</Text>
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
            // borderWidth: 3,
            // borderColor: "yellow",
            // flexDirection: "row",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 30,
          }}
        >
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Ionicons
              name="checkmark-circle"
              size={30}
              color={Colors.primary100}
            />
            <Text style={{ marginLeft: 15, fontSize: 20 }}>Shipped</Text>
          </View>
          <View>
            <Text style={{ fontSize: 20 }}>28 May</Text>
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
            // borderWidth: 3,
            // borderColor: "yellow",
            // flexDirection: "row",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 30,
          }}
        >
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Ionicons
              name="checkmark-circle"
              size={30}
              color={Colors.primary100}
            />
            <Text style={{ marginLeft: 15, fontSize: 20 }}>
              Order Confirmed
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 20 }}>28 May</Text>
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
            // borderWidth: 3,
            // borderColor: "yellow",
            // flexDirection: "row",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Ionicons
              name="checkmark-circle"
              size={30}
              color={Colors.primary100}
            />
            <Text style={{ marginLeft: 15, fontSize: 20 }}>Order Placed</Text>
          </View>
          <View>
            <Text style={{ fontSize: 20 }}>28 May</Text>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.orderItems}>Order Items</Text>
        <View
          style={{
            marginVertical: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "stretch",
            backgroundColor: Colors.bgLight2,
            height: 80,
            borderRadius: 20,
            paddingHorizontal: 10,
          }}
        >
          <View style={styles.receiptContainer}>
            <Ionicons name="receipt-outline" size={25} />
          </View>
          <View style={styles.itemsContainer}>
            <View>
              <Text>{orderData.item.items.length} Item(s)</Text>
            </View>
          </View>
          <View
            style={{
              flex: 2,
              justifyContent: "center",
              // alignItems: "flex-start",
            }}
          >
            <Pressable
              onPress={() => {
                navigation.navigate("OrderItems", { orderData: orderData });
              }}
            >
              <Text
                style={{
                  color: Colors.primary100,
                  fontWeight: 500,
                  fontSize: 15,
                }}
              >
                View All
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.orderItems}>Shipping Details</Text>
        <View
          style={{
            marginVertical: 20,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "stretch",
            backgroundColor: Colors.bgLight2,
            height: 80,
            borderRadius: 20,
            paddingHorizontal: 10,
          }}
        >
          <View style={styles.shippingAddress}>
            <Text style={{ fontSize: 16 }}>
              100 Main St., Washington, NJ 08945
            </Text>
          </View>
          <View style={styles.phoneNumber}>
            <Text style={{ fontSize: 16 }}>908-215-5165</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  orderItems: { fontSize: 18, fontWeight: 600 },
  receiptContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  itemsContainer: {
    flex: 6,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 10,
  },
  shippingAddress: { marginVertical: 4 },
  phoneNumber: { marginVertical: 4 },
});
