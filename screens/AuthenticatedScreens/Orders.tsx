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
// import PurpleButton from "../../components/ui/PurpleButton";
import SmallPurpleButton from "../../components/atoms/SmallPurpleButton";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";
import { fetchOrders } from "../../api/orders.api";
import { UserInputContext } from "../../store/user-input-context";

import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import LoadingOverlay from "../../components/atoms/LoadingOverlay";
import { wait } from "../../util/helpers";
import { OrderStatus } from "../../types/order";

type Props = {
  navigation: any;
};

const Orders = ({ navigation }: Props) => {
  const userInputCtx: any = useContext(UserInputContext);
  const userId = userInputCtx.userInput.id.value;
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState(OrderStatus.Processing);
  const [selectedStatus, setSelectedStatus] = useState(OrderStatus.Processing);
  const isFocused = useIsFocused();
  const statuses = Object.values(OrderStatus);

  useEffect(() => {
    const fetchOrdersFunction = async () => {
      setIsLoading(true);
      console.log(isFocused);
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
  console.log(orders[0].items.length);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.header}>Orders</Text>
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
          <View
            style={[
              styles.status,
              selectedStatus === status && styles.selected,
            ]}
            key={status}
          >
            <Text style={selectedStatus === status && { color: "white" }}>
              {status}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.root}>
        {orders.length > 0 && (
          <View>
            <FlatList
              data={orders}
              contentContainerStyle={
                {
                  // borderColor: "brown", borderWidth: 3
                }
              }
              renderItem={(order) => {
                return (
                  <Pressable
                    onPress={() => {
                      // productsCtx.updateSelectedCategory("Jackets");
                      navigation.navigate("HomeTab", { screen: "Favorites" });
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
                      <View
                        style={
                          {
                            // borderWidth: 2,
                            // borderColor: "green",
                          }
                        }
                      >
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
        )}
        {orders.length === 0 && (
          <View style={styles.content}>
            <Image
              style={styles.image}
              source={require("../../assets/check-out.png")}
            />
            <View>
              <Text style={{ fontSize: 20, marginVertical: 10 }}>
                No Orders yet
              </Text>
              <Text style={{ fontSize: 20, marginVertical: 10 }}>
                {orders.length}
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
        )}
      </View>
    </SafeAreaView>
  );
};

export default Orders;

const styles = StyleSheet.create({
  safeArea: {
    // height: "100%",
  },
  header: {
    fontSize: 17,
    textAlign: "center",
  },
  root: {
    // flex: 1,
    // justifyContent: "flex-start",
    // borderColor: "yellow",
    // borderWidth: 3,
  },
  content: {
    // alignItems: "center",
    // justifyContent: "flex-start",
  },
  imageContainer: {
    // justifyContent: "center",
    // width: 200,
    // height: 200,
    // borderColor: Colors.yellow100,
    // borderWidth: 4,
  },
  image: {
    // width: 100,
    // height: 100,
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
