import {
  BackHandler,
  Image,
  SafeAreaView,
  ScrollView,
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";
import { useCallback, useContext, useEffect, useState } from "react";
import SmallPurpleButton from "../../../components/atoms/SmallPurpleButton";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../constants/colors";
import { fetchOrders } from "../../../api/orders.api";
import { UserInputContext } from "../../../store/user-input-context";
import { useIsFocused } from "@react-navigation/native";
import LoadingOverlay from "../../../components/atoms/LoadingOverlay";
import { wait } from "../../../util/helpers";
import { OrderStatus } from "../../../types/order";
import { filter } from "lodash";

type Props = {
  navigation: any;
};

interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status:
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "returned"
    | "cancelled";
  createdAt: string; // ISO date string
  __v: number;
}

type OrdersResponse = Order[];

const emptyOrdersArray: OrdersResponse = [];

const Orders = ({ navigation }: Props) => {
  const userInputCtx: any = useContext(UserInputContext);
  const userId = userInputCtx.userInput.id.value;
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState(emptyOrdersArray);
  const [selectedStatus, setSelectedStatus] = useState(OrderStatus.Processing);
  const isFocused = useIsFocused();
  const statuses = Object.values(OrderStatus);

  useEffect(() => {
    const fetchOrdersFunction = async () => {
      setIsLoading(true);
      await wait(500);
      if (isFocused) {
        const fetchedOrders = await fetchOrders(userId);
        setOrders(fetchedOrders);
      }
      setIsLoading(false);
    };

    fetchOrdersFunction();
  }, [isFocused]);

  if (isLoading) {
    return <LoadingOverlay message="Loading Orders..." />;
  }

  const filteredOrders = orders.filter((order) => {
    return selectedStatus === order.status;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.header}>Orders</Text>
      <View style={styles.root}>
        {orders.length > 0 && (
          <View>
            <ScrollView
              horizontal
              contentContainerStyle={{
                // borderWidth: 2,
                // borderColor: "blue",
                flexDirection: "row",
                alignItems: "center",
                height: 60,
              }}
              showsHorizontalScrollIndicator={true}
            >
              {statuses.map((status) => (
                <Pressable
                  style={[
                    styles.status,
                    selectedStatus === status && styles.selected,
                  ]}
                  key={status}
                  onPress={() => {
                    setSelectedStatus(status);
                  }}
                >
                  <Text style={selectedStatus === status && { color: "white" }}>
                    {status}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
            <View>
              <FlatList
                data={filteredOrders}
                contentContainerStyle={
                  {
                    // borderColor: "brown", borderWidth: 3
                  }
                }
                renderItem={(order) => {
                  return (
                    <Pressable
                      onPress={() => {
                        const cleanOrder = JSON.parse(JSON.stringify(order));
                        // productsCtx.updateSelectedCategory("Jackets");
                        navigation.navigate("OrdersTab", {
                          screen: "OrderDetails",
                          params: { orderData: cleanOrder },
                        });
                      }}
                      style={{
                        marginVertical: 5,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "stretch",
                        backgroundColor: Colors.bgLight2,
                        height: 80,
                        borderRadius: 20,
                        paddingHorizontal: 10,
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          // borderWidth: 2,
                          // borderColor: "red",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Ionicons name="receipt-outline" size={25} />
                      </View>
                      <View
                        style={{
                          flex: 4,
                          // borderColor: "purple",
                          // borderWidth: 3,
                          alignItems: "flex-start",
                          justifyContent: "center",
                          paddingLeft: 10,
                        }}
                      >
                        <View>
                          <Text
                            style={{ fontWeight: 900 }}
                          >{`Order #${order.item._id.slice(-10)}`}</Text>
                        </View>
                        <View>
                          <Text>{order.item.items.length} Item(s)</Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          // borderWidth: 2,
                          // borderColor: "blue",
                          alignItems: "flex-end",
                          justifyContent: "center",
                          paddingLeft: 10,
                        }}
                      >
                        <Ionicons name="chevron-forward-outline" size={35} />
                      </View>
                    </Pressable>
                  );
                }}
              />
            </View>
          </View>
        )}
        {orders.length === 0 && (
          <View style={styles.content}>
            <Image
              style={styles.image}
              source={require("../../../assets/check-out.png")}
            />
            <View>
              <Text style={{ fontSize: 20, marginVertical: 10 }}>
                No Orders yet
              </Text>
              {/* <Text style={{ fontSize: 20, marginVertical: 10 }}>
                {orders.length}
              </Text> */}
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
        )}
      </View>
    </SafeAreaView>
  );
};

export default Orders;

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
    justifyContent: "flex-start",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  status: {
    paddingHorizontal: 7,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: Colors.bgLight2,
  },
  selected: {
    backgroundColor: Colors.primary100,
  },
});
