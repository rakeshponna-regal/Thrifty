import React, { useEffect } from 'react'
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { KEY_IS_DUMMY_DATA, retrieveItem, storeItem } from '../utils/asyncStorage';
import { products } from '../utils/Constants';
let realm = new Realm({ path: 'UserDatabase.realm' });

const UserTypeScreen = ({ navigation }) => {

    useEffect(() => {
        loadInitData()
    }, [])

    const loadInitData = async () => {
        try {
            const isLoaded = await retrieveItem(KEY_IS_DUMMY_DATA)
            console.log("object", isLoaded)
            if (isLoaded == null) {
                console.log("object Added")
                products.map((product) => {
                    realm.write(() => {
                        realm.create('products', product);
                    })
                })
             await storeItem(KEY_IS_DUMMY_DATA, "true")
            }
            var product = realm.objects('products');
            console.log( product.length)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.mainBody}>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>
                <View>
                    <KeyboardAvoidingView enabled>
                        <View style={{ alignItems: 'center' }}>
                            <Image
                                source={require('../assets/images/thrifty_logo.jpg')}
                                style={{
                                    width: '50%',
                                    height: 100,
                                    resizeMode: 'contain',
                                    margin: 30,
                                }}
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                            onPress={() => navigation.navigate('sellerScreen')}>
                            <Text style={styles.buttonTextStyle}>I wanna sell</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                            onPress={() => navigation.navigate('buyerScreen')}>
                            <Text style={styles.buttonTextStyle}>I wanna buy</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </View>
            </ScrollView>
        </View>
    )
}

export default UserTypeScreen

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        alignContent: 'center',
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    buttonStyle: {
        backgroundColor: '#7DE',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 25,
    },
    buttonTextStyle: {
        color: '#000000',
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        flex: 1,
        color: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#dadae8',
    },
    registerTextStyle: {
        color: '#000000',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        padding: 10,
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
});