import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../theme/colors';
import { OrdersTabParamList } from '../../types/navigation';

type OrderItems = NativeStackScreenProps<OrdersTabParamList, 'OrderItems'>;

const OrderItems = ({ route }: OrderItems) => {
  const orderItems = route.params.orderData.items;

  const { subTotal, shippingCost, taxAmount, totalAmount } =
    route.params.orderData;

  return (
    <View style={{ flex: 1, paddingHorizontal: 30 }}>
      {orderItems.length > 0 && (
        <View
          style={{
            flex: 1,
            marginTop: 10,
            marginBottom: 20,
          }}
        >
          <FlatList
            horizontal={false}
            data={orderItems}
            renderItem={itemData => {
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
          <View
            style={{
              flexDirection: 'column',
            }}
          >
            {/* 1 */}
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
                ${subTotal.toFixed(2)}
              </Text>
            </View>
            {/* 2 */}
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
                ${shippingCost.toFixed(2)}
              </Text>
            </View>
            {/* 3 */}
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
                ${taxAmount.toFixed(2)}
              </Text>
            </View>
            <View
              style={{
                marginVertical: 8,
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
                ${totalAmount.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      )}
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
