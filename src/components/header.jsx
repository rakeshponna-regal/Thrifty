import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, Button, View, Text, SafeAreaView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

export function HeaderBackTitle({ navigation ,title ,isBackVisible ,isSellerVisible = true}) {
    return (
        <View style={{ backgroundColor: '#ffffff' }}>
            <View style={{ flexDirection: 'row', height: 45, padding: 10, marginTop: 0, alignSelf: 'center', backgroundColor: '#ffffff' }}>
                <TouchableOpacity style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}
                    onPress={() => {
                         navigation.goBack()
                         }}>
                        {
                            isBackVisible ?  (<Icon name="angle-left" size={26} color="#000000" />) : <></>
                        }
                    
                    <Text style={{
                        fontWeight: "bold",
                        fontSize: 18,
                        marginStart: 15,
                        color: "#000000",
                    }}> { title ? title : 'Back' }</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' , }}
                    onPress={() => { navigation.navigate("sellerScreen") }}>
                   <View >
                    <Text style={{
                        flex: 1, fontWeight: "bold",
                        fontSize: 18,
                        color: "#00306b",
                    }}>{isSellerVisible? "Switch to Seller":''}</Text>
                </View>
                </TouchableOpacity>

                

            </View>
            <View style={{
                borderBottomColor: '#000',
                opacity: 0.2,
                borderBottomWidth: 1,
            }} />
        </View>

    );
}