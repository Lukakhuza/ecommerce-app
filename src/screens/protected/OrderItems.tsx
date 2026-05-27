import { useRoute } from '@react-navigation/core';
import { useContext } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../../components/atoms/ScreenContainer';
import { CartContext } from '../../store/cart-context';
import { ProductsContext } from '../../store/products-context';
import { UserInputContext } from '../../store/user-input-context';
import { Colors } from '../../theme/colors';

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

  console.log('Test 11: ', route.params.orderData);

  return (
    <View style={{ flex: 1, paddingHorizontal: 30 }}>
      {cartCtx.cartItems.length > 0 && (
        <View
          style={{
            flex: 1,
            marginTop: 10,
          }}
        >
          <FlatList
            horizontal={false}
            data={orderItems}
            renderItem={itemData => {
              return (
                // <View style={styles.cartItem}>
                //   <View>
                //     <Image
                //       style={styles.image}
                //       source={{
                //         uri: productsCtx.products[itemData.item.product.id - 1]
                //           .image,
                //       }}
                //     />
                //   </View>
                //   <View style={{ width: 190 }}>
                //     <Text numberOfLines={1}>{itemData.item.product.title}</Text>
                //   </View>

                //   {/*  */}

                //   <View>
                //     <Text style={{ marginHorizontal: 5 }}>
                //       <Text
                //         style={{
                //           fontWeight: 800,
                //         }}
                //       >
                //         Qty:{' '}
                //       </Text>{' '}
                //       {itemData.item.quantity}
                //     </Text>
                //   </View>
                //   {/*  */}
                //   <View>
                //     <Text style={{ fontWeight: 700 }}>
                //       $
                //       {(
                //         itemData.item.product.price * itemData.item.quantity
                //       ).toFixed(2)}
                //     </Text>
                //   </View>
                // </View>
                <View style={styles.cartItem}>
                  <View>
                    <Image
                      style={styles.image}
                      source={{
                        uri: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png',
                      }}
                    />
                  </View>
                  <View
                    style={{
                      marginLeft: 20,
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
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
                          flexDirection: 'row',
                        }}
                      >
                        <Text style={{ marginRight: 5 }}>
                          <Text
                            style={{
                              fontWeight: 800,
                            }}
                          >
                            Id:{' '}
                          </Text>{' '}
                          {itemData.item.product.id}
                        </Text>
                        <Text style={{ marginHorizontal: 5 }}>
                          <Text
                            style={{
                              fontWeight: 800,
                            }}
                          >
                            Price:{' '}
                          </Text>{' '}
                          ${itemData.item.product.price.toFixed(2)}
                        </Text>
                        <Text style={{ marginHorizontal: 5 }}>
                          <Text
                            style={{
                              fontWeight: 800,
                            }}
                          >
                            Qty:{' '}
                          </Text>{' '}
                          {itemData.item.quantity}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        // flex: 1,
                        // justifyContent: 'flex-start',
                        // alignItems: 'flex-end',
                        marginRight: 10,
                      }}
                    >
                      <View>
                        <Text style={{ fontWeight: 700 }}>
                          $
                          {(
                            itemData.item.product.price * itemData.item.quantity
                          ).toFixed(2)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              );
            }}
          />

          {/*  */}

          <View
            style={{
              flexDirection: 'column',
            }}
          >
            <View
              style={{
                marginVertical: 8,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ fontSize: 17, color: 'gray', marginLeft: 8 }}>
                Subtotal
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontWeight: 700,
                  marginRight: 10,
                }}
              >
                {/* ${subtotal.toFixed(2)} */} 55.5
              </Text>
              {/*
             
            </View>
            <View
              style={{
                marginVertical: 8,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ fontSize: 17, color: 'gray', marginLeft: 8 }}>
                Shipping Cost
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontWeight: 700,
                  marginRight: 10,
                }}
              >
                ${shippingCost}
              </Text>
            </View>
            <View
              style={{
                marginVertical: 8,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ fontSize: 17, color: 'gray', marginLeft: 8 }}>
                Tax
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontWeight: 700,
                  marginRight: 10,
                }}
              >
                ${taxAmount}
              </Text>
            </View>
            */}
            </View>
          </View>

          {/*  */}
          <View
            style={{
              marginVertical: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontWeight: 700,
                color: 'gray',
                marginLeft: 8,
              }}
            >
              Total
            </Text>
            <Text
              style={{
                color: 'black',
                fontWeight: 700,
                marginRight: 10,
              }}
            >
              ${total.toFixed(2)}
            </Text>
          </View>
        </View>
      )}
      {/* {cartCtx.cartItems.length > 0 && (
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            borderColor: 'brown',
            borderWidth: 1,
          }}
        >
          <View style={styles.root}>
            <View
              style={{
                flex: 1,
                // height: 650,
                // borderColor: 'blue',
                // borderWidth: 2,
              }}
            >
              <FlatList
                horizontal={false}
                data={orderItems}
                renderItem={itemData => {
                  // console.log('Test 0: ', typeof itemData.item.product.id);
                  // console.log(
                  //   productsCtx.products[itemData.item.product.id - 1]
                  //     .image,
                  // );
                  return (
                    <View style={styles.cartItem}>
                      <View>
                        <Image
                          style={styles.image}
                          source={{
                            uri: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png',
                          }}
                        />
                      </View>
                      <View
                        style={{
                          marginLeft: 20,
                          flexDirection: 'row',
                          justifyContent: 'space-evenly',
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
                              flexDirection: 'row',
                            }}
                          >
                            <Text style={{ marginRight: 5 }}>
                              <Text
                                style={{
                                  fontWeight: 800,
                                }}
                              >
                                Id:{' '}
                              </Text>{' '}
                              {itemData.item.product.id}
                            </Text>
                            <Text style={{ marginHorizontal: 5 }}>
                              <Text
                                style={{
                                  fontWeight: 800,
                                }}
                              >
                                Price:{' '}
                              </Text>{' '}
                              ${itemData.item.product.price.toFixed(2)}
                            </Text>
                            <Text style={{ marginHorizontal: 5 }}>
                              <Text
                                style={{
                                  fontWeight: 800,
                                }}
                              >
                                Qty:{' '}
                              </Text>{' '}
                              {itemData.item.quantity}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flex: 1,
                            justifyContent: 'flex-start',
                            alignItems: 'flex-end',
                            marginRight: 20,
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
              iew>
            </View>
          </View>
        </View>
      )} */}
    </View>
  );
};

export default OrderItems;

const styles = StyleSheet.create({
  header: {
    fontSize: 17,
    textAlign: 'center',
  },
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderColor: 'red',
    // borderWidth: 2,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingBottom: 40,
  },
  imageContainer: {
    justifyContent: 'center',
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
    flex: 1,
    // marginHorizontal: 20,
    borderColor: 'blue',
    borderWidth: 1,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: Colors.white100,
    height: 100,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
});
