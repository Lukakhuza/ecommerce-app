import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useRoute } from "@react-navigation/core";
import LoadingOverlay from "../../../components/atoms/LoadingOverlay";
import PurpleButtonSmall from "../../../components/atoms/PurpleButtonSmall";
import { UserInputContext } from "../../../store/user-input-context";
import { ProductsContext } from "../../../store/products-context";
import { useContext, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { CartContext } from "../../../store/cart-context";
import { Colors } from "../../../constants/colors";

type Props = {
  navigation: any;
};

const OrderItems = ({ navigation }: Props) => {
  const route: any = useRoute();
  const orderItems = route.params.orderData.item.items;
  const total = route.params.orderData.item.totalAmount;
  const userInputCtx: any = useContext(UserInputContext);
  const productsCtx: any = useContext(ProductsContext);
  const cartCtx: any = useContext(CartContext);

  return (
    <SafeAreaView style={styles.safeArea}>
      {cartCtx.cartItems.length > 0 && (
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <View>
            <View style={styles.root}>
              <View>
                <View
                  style={{
                    height: 650,
                  }}
                >
                  <FlatList
                    horizontal={false}
                    data={orderItems}
                    renderItem={(itemData) => {
                      return (
                        <View style={styles.cartItem}>
                          {/* <View>
                            <Image
                              style={styles.image}
                              source={{
                                uri: productsCtx.products[
                                  itemData.item.product.id - 1
                                ]?.image,
                              }}
                            />
                          </View> */}
                          <View
                            style={{
                              marginLeft: 20,
                              flexDirection: "row",
                              justifyContent: "space-evenly",
                            }}
                          >
                            <View>
                              <View style={{ width: 190 }}>
                                <Text numberOfLines={1}>
                                  {itemData.item.product.title}
                                </Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: "row",
                                }}
                              >
                                <Text style={{ marginRight: 5 }}>
                                  <Text
                                    style={{
                                      fontWeight: 800,
                                    }}
                                  >
                                    Id:{" "}
                                  </Text>{" "}
                                  {itemData.item.product.id}
                                </Text>
                                <Text style={{ marginHorizontal: 5 }}>
                                  <Text
                                    style={{
                                      fontWeight: 800,
                                    }}
                                  >
                                    Price:{" "}
                                  </Text>{" "}
                                  ${itemData.item.product.price.toFixed(2)}
                                </Text>
                                <Text style={{ marginHorizontal: 5 }}>
                                  <Text
                                    style={{
                                      fontWeight: 800,
                                    }}
                                  >
                                    Qty:{" "}
                                  </Text>{" "}
                                  {itemData.item.quantity}
                                </Text>
                              </View>
                            </View>
                            <View
                              style={{
                                flex: 1,
                                justifyContent: "flex-start",
                                alignItems: "flex-end",
                                marginRight: 20,
                                // borderWidth: 3,
                                // borderColor: "yellow",
                              }}
                            >
                              <View>
                                <Text style={{ fontWeight: 700 }}>
                                  $
                                  {(
                                    itemData.item.product.price *
                                    itemData.item.quantity
                                  ).toFixed(2)}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      );
                    }}
                  />
                  <View
                    style={{
                      flexDirection: "column",
                    }}
                  >
                    {/* <View
                      style={{
                        marginVertical: 8,
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{ fontSize: 17, color: "gray", marginLeft: 8 }}
                      >
                        Subtotal
                      </Text>
                      <Text
                        style={{
                          color: "black",
                          fontWeight: 700,
                          marginRight: 10,
                        }}
                      >
                        ${subtotal.toFixed(2)}
                      </Text>
                    </View> */}
                    {/* <View
                      style={{
                        marginVertical: 8,
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{ fontSize: 17, color: "gray", marginLeft: 8 }}
                      >
                        Shipping Cost
                      </Text>
                      <Text
                        style={{
                          color: "black",
                          fontWeight: 700,
                          marginRight: 10,
                        }}
                      >
                        ${shippingCost}
                      </Text>
                    </View> */}
                    {/* <View
                      style={{
                        marginVertical: 8,
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{ fontSize: 17, color: "gray", marginLeft: 8 }}
                      >
                        Tax
                      </Text>
                      <Text
                        style={{
                          color: "black",
                          fontWeight: 700,
                          marginRight: 10,
                        }}
                      >
                        ${taxAmount}
                      </Text>
                    </View> */}
                    <View
                      style={{
                        marginVertical: 20,
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 17,
                          fontWeight: 700,
                          color: "gray",
                          marginLeft: 8,
                        }}
                      >
                        Total
                      </Text>
                      <Text
                        style={{
                          color: "black",
                          fontWeight: 700,
                          marginRight: 10,
                        }}
                      >
                        ${total.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default OrderItems;

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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 40,
  },
  imageContainer: {
    justifyContent: "center",
    width: 200,
    height: 200,
    borderColor: Colors.yellow100,
    borderWidth: 4,
  },
  image: {
    width: 40,
    height: 40,
  },
  cartItem: {
    marginVertical: 0,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.white100,
    height: 100,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  removeAll: {
    alignItems: "flex-end",
    marginRight: 25,
  },
  removeAllText: {
    fontSize: 16,
    fontWeight: 500,
  },
});
