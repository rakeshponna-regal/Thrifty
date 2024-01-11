import Realm from 'realm';
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { sizes, colors } from "../utils/Theme";
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, decrement, increament, removeFromCart } from "../services/slices/cartSlice";
import { HeaderBackTitle } from "../components/header";
import { cartQtySelector, cartTotalPriceSelector } from "../services/slices/selector";
import { addToOrders } from "../services/slices/ordersSlice";
import { KEY_USER_ID, retrieveItem } from "../utils/asyncStorage";

const CartTab = ({ navigation }) => {
  const cart = useSelector((state) => state.cart);
  const orders = useSelector((state) => state.orders);

  const dispatch = useDispatch();
  const totalPrice = useSelector(cartTotalPriceSelector);
  const totalqty = useSelector(cartQtySelector);
  console.log("cart List", cart)
  console.log("order List", JSON.stringify(orders))

  return (
    <SafeAreaView forceInset={{ top: 'always' }} style={[styles.safeContainerStyle]}>
      <HeaderBackTitle navigation={navigation} title={'My Cart'} isBackVisible={false} />
      <View style={[styles.containerView, { height: '86%' }]} >
        {(!cart || cart.length === 0) ? (
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginTop:250,
              textAlign: "center",
            }}
          >
            No items in the cart
          </Text>
        ) : null}

        <ScrollView>
          {cart && cart.map(item => {
            return (
              <View key={item.id} style={styles.cartItems}>
                <TouchableOpacity
                  onPress={() => {
                    console.log("goToItem", item.id, item.qty)
                    navigation.navigate('cartProdItems', {
                      product: item
                    });
                  }
                  }
                >
                  <Image style={styles.image} source={{ uri: item.images[0] }} />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>
                    {item?.title}
                  </Text>
                  <Text style={styles.title}>
                    ${item?.price}
                  </Text>
                  <View style={styles.quantity}>
                    <TouchableOpacity
                      style={styles.decreaseButton}
                      onPress={() => {
                        dispatch(decrement(item.id));
                      }}
                      disabled={item.quantity == 1}
                    >
                      <Text
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          fontWeight: 600,
                          top: 3,
                        }}
                      >
                        {" "}
                        -{" "}
                      </Text>
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 14,
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        top: 5,
                        paddingHorizontal: 10,
                      }}
                    >
                      {item.quantity}
                    </Text>
                    <TouchableOpacity
                      style={styles.increaseButton}
                      onPress={() => {
                        dispatch(increament(item.id));
                      }}
                    >
                      <Text
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          fontWeight: 600,
                          top: 3,
                        }}
                      >
                        {" "}
                        +{" "}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* <Text style={styles.text}>
                    Quantity - {item.quantity}
                  </Text> */}
                </View>
                {/* <TouchableOpacity
                  style={{ ...styles.button }}
                  onPress={() => {
                    console.log("goToItem", item.id, item.qty)
                    navigation.navigate('cartProdItems', {
                      product: item
                    });
                    //this.goToItem(item.id, item.quantity)
                  }
                  }
                >
                  <View>
                    <Icon
                      name="eye"
                    
                      size={30}
                      style={{
                        marginRight: 10,
                        textAlign: "right",
                      }}
                    />
                  </View>
                </TouchableOpacity> */}
                <TouchableOpacity
                  style={{ ...styles.button }}
                  onPress={() => {
                    dispatch(removeFromCart(item.id))
                    console.log("removeItemFromCart", item.id)
                    //cart.removeItemFromCart(item.id)}
                  }
                  }
                >
                  <View>
                    <Icon
                      name="trash"
                      size={30}
                      style={{
                        marginRight: 10,
                        textAlign: "right",
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
        <View style={{
          flexDirection: "row",
          paddingHorizontal: 10,
        }}>
          <View

            style={{
              paddingTop: 10,
              borderTopColor: "#BBBBBB",
              paddingHorizontal: 0,
              paddingBottom: 10,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Sub Total: $
              {totalPrice}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Convenience Fee: $20
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Total: $
              {totalPrice == 0 ? totalPrice : totalPrice + 20}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Total Quantity:{" "}
              {totalqty}
            </Text>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: '#00306b',
              color: '#FFFFFF',
              height: 40,
              alignItems: 'flex-end',
              borderRadius: 20,
              marginLeft: 55,
              marginRight: 35,
              marginTop: 20,
              marginBottom: 20,
              paddingHorizontal: 40,
            }}
            activeOpacity={0.5}
            onPress={() => { 

              Alert.alert(
                "Order placed",
                "Thanks for ordering.You will receive your order in 2-4 business dats.Cash on delivery",
                [
                  {
                    text: "Cancel",
                    onPress: () =>  
                    navigation.navigate('cartcheckout')
                    ,
                  },
                  {
                    text: "Ok",
                    onPress: async() => {
                      try {
                        var ID = Math.floor(Math.random() * 100)
                        const orders = {
                          orderId : new Realm.BSON.ObjectId().toString(),
                          user_id :  await retrieveItem(KEY_USER_ID),
                          status :"Pending",
                          payment_id: ID,
                          orders : cart
                        }
                        dispatch(addToOrders(orders))
                      } catch (error) {
                        console.log(error)
                      }
                     
                    }
                    //  dispatch(clearCart())
                     ,
                    // style: "cancel",
                  },
                ],
                {
                  cancelable: true,
                }
              );
                // Alert.alert("Order placed","Thanks for ordering.You will receive your order in 2-4 business dats.Cash on delivery")
            }}>
            <Text style={{
              color: '#FFFFFF',
              paddingVertical: 10,
              fontSize: 16,
            }}>Oder Now</Text>
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>


  )
}

export default CartTab

const styles = StyleSheet.create({
  safeContainerStyle: {
    backgroundColor: '#ededed',
    flex: 1,
    justifyContent: "flex-start",
  },
  containerView: {
    marginEnd: 5,
    width: "100%",
    height: '100%',
    backgroundColor: '#ffffff',
    color: "white"
  },
  title: {
    fontSize: 14,
    paddingHorizontal: sizes.padding,
  },
  text: {
    paddingHorizontal: sizes.padding,
  },
  image: {
    width: 80,
    height: 80,
  },
  cartItems: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 5,
  },
  quantity: {
    flexDirection: "row",
    marginStart: 15,
    justifyContent: "flex_start",
  },
  quantityText: {
    flex: 1,
    flexDirection: "row",
  },
  decreaseButton: {
    height: 25,
    width: 25,
    backgroundColor: "rgba(27,31,35,0.05)",
  },
  increaseButton: {
    height: 25,
    width: 25,
    backgroundColor: "rgba(27,31,35,0.05)",
  },
});