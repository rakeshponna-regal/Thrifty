import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import { HeaderBackTitle } from '../components/header'
import { useDispatch, useSelector } from 'react-redux'
import { sizes, colors } from "../utils/Theme";
import { KEY_USER_ID, retrieveItem } from '../utils/asyncStorage';

const OrderHistroy = ({ navigation }) => {
    const orders = useSelector((state) => state.orders);
    const dispatch = useDispatch();
    const [ordersHistroy, setOrdersHistroy] = useState([])
    console.log("orders", orders)
    const initData = async () => {
        setOrdersHistroy([])
        let ord = []
        let userID = await retrieveItem(KEY_USER_ID)
        orders.map((item) => {
            if(item.user_id == userID){
                console.log('added')
                console.log(JSON.stringify(item))
                ord.push(item)
                // 
            }
        })
        setOrdersHistroy(ord)
    }
    useEffect(
        () => {
            initData()
        }, []
    )

const calculateOrderPrice = (orders) => {
    // Initialize the total price to zero
    let totalPrice = 0;
    orders.map((order) => {
        totalPrice += parseFloat(order.price);
    });
    // Return the calculated total price
    return `$${totalPrice}`;
};

    return (
        <SafeAreaView forceInset={{ top: 'always' }} style={styles.safeContainerStyle}>
            <HeaderBackTitle navigation={navigation} title={'Order Histroy'} isBackVisible={true} isSellerVisible={false} isSellerActivated={false} />
            <View style={styles.containerView} >
                {(!ordersHistroy || ordersHistroy.length === 0) ? (
                    <Text
                        style={{
                            fontSize: 18,
                            marginTop: 250,
                            fontWeight: "bold",
                            justifyContent: 'center',
                            alignItems: "center",
                            alignSelf: 'center',
                            textAlign: "center",
                        }}
                    >
                        No orders yet
                    </Text>
                ) : null}
                <ScrollView>
                    {
                        ordersHistroy && ordersHistroy.map((dataItem, index) => {
                            console.log("item histroy ", index, dataItem)
                            {
                                return (
                                    <TouchableOpacity style={styles.card}
                                        onPress={() => {
                                            navigation.navigate('profileProductInfo', {
                                                type: 'orders',
                                                orders: dataItem.orders
                                            })
                                        }}
                                    >
                                       {/*  <Text>
                                            CartID :  {dataItem?.orderId}
                                        </Text> */}
                                        <Text>
                                            Order Status :  {dataItem?.status}
                                        </Text>
                                        <Text>
                                            Products :  {dataItem?.orders?.length}
                                        </Text>
                                        <Text>
                                            Total Price :  {calculateOrderPrice(dataItem?.orders)}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            }
                        })
                    }

                </ScrollView>
            </View>
        </SafeAreaView>
    )
}


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
    card: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        margin: 10,
        shadowOpacity: 0.26,
        elevation: 8,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10
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

export default OrderHistroy