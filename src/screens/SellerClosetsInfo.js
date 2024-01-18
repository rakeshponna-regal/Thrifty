import React, { useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { HeaderBackTitle } from '../components/header'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux';
import { getProductsBySellerId, productsListItem } from '../services/slices/selector'

const SellerClosetsInfo = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const sellerItem = route.params?.sellerItem;
    const sellerId = route.params?.sellerId;
    const productsInfo = useSelector(state => getProductsBySellerId(state, { sellerId }));
    const columnCount = 3

    console.log("sellerItem", sellerItem)
    console.log("productsListItem", sellerId, productsInfo)
    return (
        <SafeAreaView forceInset={{ top: 'always' }} style={styles.safeContainerStyle}>
            <HeaderBackTitle navigation={navigation} title={sellerItem.name} isBackVisible={false} isSellerVisible={true} isSellerActivated={false} />
            <View style={styles.containerView} >
                <View style={{
                    flex: 1,
                    paddingEnd: 10,
                    marginEnd: 10,
                    marginStart:10,
                    marginBottom: 100,
                }}>
                    <View style={{
                        flexDirection: "row",
                        paddingHorizontal: 15,
                        marginBottom:10,
                        marginEnd: 10,
                        marginTop: 30,
                    }}>
                        <Image
                            style={{
                                width: 100,
                                height: 100,
                                justifyContent: 'flex-start',
                                alignItems: 'flex-start',
                                backgroundColor: 'blue',
                                borderColor: '#ddd',
                                borderRadius: 15,
                            }}
                            source={{ uri: sellerItem.image }}
                        />
                        <Text style={{
                            marginRight: 15,
                            paddingEnd: 15,
                            paddingVertical: 10,
                            marginStart: 20,
                            color: '#000',
                            fontSize: 20,
                            fontWeight: '500',
                        }}>
                            check out my closets ! Follow me instagram @logimart
                        </Text>
                    </View>

                    {
                        productsInfo.length == 1 ? (

                            <FlatList
                                data={productsInfo}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('sellerProductDetails', {
                                                product: item
                                            });
                                        }}
                                        style={{
                                            flex: 1,
                                            flexDirection: 'column',
                                            margin: 5,

                                        }}>
                                        <Image
                                            style={{
                                                height: 300,
                                                borderColor: '#ddd',
                                                borderRadius: 15,
                                            }}
                                            source={{ uri: item.images[0] }}
                                        />
                                    </TouchableOpacity>
                                )}
                                //Setting the number of column
                                numColumns={1}
                                keyExtractor={(item, index) => index}
                            />


                        ) : (
                            <>
                                {
                                    productsInfo.length == 2 ? (
                                        <FlatList
                                            data={productsInfo}
                                            renderItem={({ item }) => (
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        // navigation.navigate('sellerProducts', { 
                                                        //     sellerItem:item
                                                        // })
                                                    }}
                                                    style={{
                                                        flex: 0.6,
                                                        flexDirection: 'column',
                                                        margin: 5,

                                                    }}>
                                                    <Image
                                                        style={styles.imageThumbnail}
                                                        source={{ uri: item.images[0] }}
                                                    />
                                                </TouchableOpacity>
                                            )}
                                            //Setting the number of column
                                            numColumns={2}
                                            keyExtractor={(item, index) => index}
                                        />
                                    ) : (

                                        <>

                                            <FlatList
                                                data={productsInfo}
                                                renderItem={({ item }) => (
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            // navigation.navigate('sellerProducts', { 
                                                            //     sellerItem:item
                                                            // })
                                                        }}
                                                        style={{
                                                            flex: 1,
                                                            flexDirection: 'column',
                                                            margin: 5,

                                                        }}>
                                                        <Image
                                                            style={styles.imageThumbnail}
                                                            source={{ uri: item.images[0] }}
                                                        />
                                                    </TouchableOpacity>
                                                )}
                                                //Setting the number of column
                                                numColumns={columnCount}
                                                keyExtractor={(item, index) => index}
                                            />

                                        </>

                                    )
                                }
                            </>




                        )
                    }

                    {/*  <FlatList
                    //     data={productsInfo}
                    //     renderItem={({ item }) => (
                    //         <TouchableOpacity
                    //             onPress={() => {
                    //                 // navigation.navigate('sellerProducts', {
                    //                 //     sellerItem:item
                    //                 // })
                    //             }}
                    //             style={{
                    //                 flex: 1,
                    //                 flexDirection: 'column',
                    //                 margin: 5,

                    //             }}>
                    //             <Image
                    //                 style={styles.imageThumbnail}
                    //                 source={{ uri: item.images[0] }}
                    //             />
                    //         </TouchableOpacity>
                    //     )}
                    //     //Setting the number of column
                    //     numColumns={columnCount}
                    //     keyExtractor={(item, index) => index}
                    // /> */}
                </View>
            </View>
        </SafeAreaView >

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
        backgroundColor: '#FFF',
        color: "white"
    },
    spacerStyle: {
        marginBottom: 15,
    },
    spacerStyleDivider: {
        marginBottom: 60,
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#000",
        marginStart: 15,
        marginTop: 15,
        marginBottom: 10
    },
    title2: {
        fontWeight: "500",
        fontSize: 16,
        color: "#666666",
        marginStart: 15,
        marginBottom: 5,
        marginTop: 10,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    divider: {
        fontWeight: "bold",
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        marginTop: 5,
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        borderColor: '#ddd',
        borderRadius: 15,
    },
})
export default SellerClosetsInfo
