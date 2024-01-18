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
import { removeFromFavorite } from '../services/slices/favoriteSlice';
import Icon from "react-native-vector-icons/Ionicons";
import { addToCart } from '../services/slices/cartSlice';
import { productJson } from '../services/api/products';
import { showMessage } from 'react-native-flash-message';
import { selectCartItemExists } from '../services/slices/selector';

const ProductInfo = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const sellerProducts = useSelector((state) => state.sellerProducts);

    const type = route.params?.type;
    console.log("type", type)
    const orders = route.params?.orders;
    console.log("type orders", orders)
    const itemProduct = route.params?.productInfo;
    const [sellerList, setSellerList] = useState([])
    const [id, setId] = useState()
    let dataList = []
    useEffect(() => {
        if (type) {
            setSellerList(orders)
        } else {
            if (sellerProducts) {
              sellerProducts?.forEach((item) => {
                // if(item.seller_id)
                if (itemProduct.id == item.seller_id) {
                    const status = cart.find((item) => item.id === itemProduct.id);
                    dataList.push({ ...itemProduct, isInTheCart: status ? true : false });
                }
              })
            }
            productJson.map((data) => {
                if (itemProduct.id == data.seller_id) {
                    const status = cart.find((item) => item.id === data.id);
                    dataList.push({ ...data, isInTheCart: status ? true : false });
                }
                console.log(dataList)
                setSellerList(dataList)
            })
        }

    }, [])

    return (
        <SafeAreaView forceInset={{ top: 'always' }} style={styles.safeContainerStyle}>
            <HeaderBackTitle navigation={navigation} title={'Products'} isBackVisible={true} isSellerVisible = {true} isSellerActivated={false}/>
            <View style={styles.containerView} >
                {(!sellerList || sellerList.length === 0) ? (
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
                        No items Found for Seller
                    </Text>
                ) : null}
                <ScrollView>
                    {sellerList && sellerList.map(item => {
                        return (
                            <View key={item.id} style={styles.cartItems}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate('sellerProductDetails', {
                                            product: item
                                        });
                                    }
                                    }
                                >
                                {
                                    item.images ? (<Image style={styles.image} source={{ uri: item.images[0] }} />) :
                                     (<Image style={styles.image} 
                                        source={require('../assets/images/thrifty_logo.jpg')}
                                         />)
                                }
                                    
                                </TouchableOpacity>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.title}>
                                        {item?.title}
                                    </Text>
                                    <Text style={styles.title}>
                                        Price : ${item?.price}
                                    </Text>

                                    {
                                        type ? (
                                            <>
                                            </>
                                        ) : (<>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    console.log("object ", item)
                                                    if (item.isInTheCart == false) {
                                                        dispatch(addToCart(item))
                                                        item.isInTheCart = true
                                                        showMessage({
                                                            message: "Product add to cart!"
                                                        });
                                                    } else {
                                                        showMessage({
                                                            message: "Product already add to cart!"
                                                        });
                                                    }
                                                }
                                                }
                                                style={{
                                                    backgroundColor: '#00306b',
                                                    color: '#FFFFFF',
                                                    width: 100,
                                                    padding: 5,
                                                    alignItems: 'flex-start',
                                                    borderRadius: 10,
                                                    marginLeft: 10,
                                                    marginTop: 5,
                                                    marginBottom: 5,
                                                }}
                                            >
                                                <Text style={{
                                                    color: '#FFFFFF',
                                                    paddingStart: 8,
                                                    fontSize: 12,
                                                    fontWeight: '600',
                                                }}> {item.isInTheCart ? 'Added to cart' : 'Add to cart'} </Text>
                                            </TouchableOpacity>
                                        </>)
                                    }



                                </View>

                                {/* {
                                    type ? (
                                        <></>
                                    ) : (<>
                                        <TouchableOpacity
                                            style={{ ...styles.button }}
                                            onPress={() => {
                                                dispatch(removeFromFavorite(item.id))
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
                                    </>)
                                } */}
                            </View>
                        );
                    })}
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

export default ProductInfo