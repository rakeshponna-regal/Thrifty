import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, Button, View, Text, SafeAreaView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { KEY_USER_ID, retrieveItem } from '../utils/asyncStorage';
import { useDispatch, useSelector } from 'react-redux';
import { selectSeller } from '../services/slices/selector';

const sellerActivated = async () => {
    return await retrieveItem(KEY_USER_ID)
}

export const HeaderBackTitle = ({ navigation, title, isBackVisible, isSellerVisible = false, isSellerActivated = false }) => {
    const sellerCount = useSelector(selectSeller);
    console.log("HeaderBackTitle sellerCount", sellerCount)
    return (
        <View style={{ backgroundColor: '#ffffff' }}>
            <View style={{ flexDirection: 'row', height: 45, padding: 10, marginTop: 0, alignSelf: 'center', backgroundColor: '#ffffff' }}>
                {
                    isBackVisible ? (<>
                        <TouchableOpacity style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}
                            onPress={() => {
                                navigation.goBack()
                            }}>
                            <Icon name="angle-left" size={26} color="#000000" />
                            <Text style={{
                                fontWeight: "bold",
                                fontSize: 18,
                                marginStart: 5,
                                color: "#000000",
                            }}> {title ? title : 'Back'}</Text>
                        </TouchableOpacity>
                    </>) : (
                        <>
                            <TouchableOpacity style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}
                            >
                                <Text style={{
                                    fontWeight: "bold",
                                    fontSize: 18,
                                    marginStart: 15,
                                    color: "#000000",
                                }}> {title ? title : 'Back'}</Text>
                            </TouchableOpacity>
                        </>
                    )
                }
                {
                    sellerCount > 0 ? (
                        <>
                            <TouchableOpacity style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', }}
                                onPress={() => { navigation.navigate("sellerScreen") }}>
                                <View >
                                    <Text style={{
                                        flex: 1, fontWeight: "bold",
                                        fontSize: 18,
                                        color: "#00306b",
                                    }}>Switch to Seller</Text>
                                </View>
                            </TouchableOpacity>
                        </>

                    ) : (
                        <>
                            <TouchableOpacity style={{ opacity: isSellerVisible ? 1 : 0.2, flex: 1, flexDirection: 'row', justifyContent: 'flex-end', }}
                            >
                                <View >
                                    <Text style={{
                                        opacity: isSellerVisible ? 0.2 : 0,
                                        flex: 1, fontWeight: "bold",
                                        fontSize: 18,
                                        color: "#00306b",
                                    }}>{isSellerVisible ? 'Switch to Seller' : ''}</Text>
                                </View>
                            </TouchableOpacity>
                        </>
                    )
                }
            </View>
            <View style={{
                borderBottomColor: '#000',
                opacity: 0.2,
                borderBottomWidth: 1,
            }} />
        </View>

    );
}

export const HeaderSearchTitle = ({ navigation, title ,isBackVisible ,onSeachPress }) => {
    const sellerCount = useSelector(selectSeller);
    console.log("HeaderBackTitle sellerCount", sellerCount)
    return (
        <View style={{ backgroundColor: '#ffffff' }}>
            <View style={{ flexDirection: 'row', height: 45, padding: 10, marginTop: 0, alignSelf: 'center', backgroundColor: '#ffffff' }}>
                {
                    isBackVisible ? (<>
                        <TouchableOpacity style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}
                            onPress={() => {
                                navigation.goBack()
                            }}>
                            <Icon name="angle-left" size={26} color="#000000" />
                            <Text style={{
                                fontWeight: "bold",
                                fontSize: 18,
                                marginStart: 5,
                                color: "#000000",
                            }}> {title ? title : 'Back'}</Text>
                        </TouchableOpacity>
                    </>) : (
                        <>
                            <TouchableOpacity style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}
                            >
                                <Text style={{
                                    fontWeight: "bold",
                                    fontSize: 18,
                                    marginStart: 15,
                                    color: "#000000",
                                }}> {title ? title : 'Back'}</Text>
                            </TouchableOpacity>
                        </>
                    )
                }
                  <Icon name="search" size={24} color="#000000" onPress = {onSeachPress}/>
            </View>
            <View style={{
                borderBottomColor: '#000',
                opacity: 0.2,
                borderBottomWidth: 1,
            }} />
        </View>

    );
}





