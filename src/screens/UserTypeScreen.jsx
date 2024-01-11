import Realm from 'realm';
import React, { useEffect } from 'react'
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { KEY_IS_DUMMY_DATA, KEY_IS_USER_LOGDED, retrieveItem, storeItem } from '../utils/asyncStorage';
import { useDispatch ,useSelector} from 'react-redux';
import { trackPromise } from 'react-promise-tracker';
import { getProducts, storeProductsFromJson } from '../services/api/productService';
import { clearState } from '../services/slices/productsSlice';
let realm = new Realm({ path: 'UserDatabase.realm' });

const UserTypeScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    // const prod = useSelector(state => state.appconfig);


    useEffect(() => {
        dispatch(clearState());
        loadInitData()
    }, [])

    const loadInitData = async () => {
        try {
            const isLoaded = await retrieveItem(KEY_IS_DUMMY_DATA)
            console.log("object", isLoaded)
            if (isLoaded == null) {
                console.log("object Added")
                trackPromise(
                    dispatch(storeProductsFromJson())
                    .unwrap()
                    .then(data => {
                        storeItem(KEY_IS_DUMMY_DATA, "true")
                        console.log("storeProductsFromJson",data)
                     })
                )
            }else{
                // trackPromise(
                //     dispatch(getProducts())
                //     .unwrap()
                //     .then(resp => {
                //         if(resp.status = "Success"){
                //             console.log("getProducts",resp.data)
                //         }else{

                //         }
                        
                //      })
                // )
            }
        } catch (error) {
            console.log(error)
        }
    }
    const signOut = async () => {
        await storeItem(KEY_IS_USER_LOGDED, "false")
        navigation.replace('LoginScreen')
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
                            onPress={() => navigation.navigate('tabview')}>
                            <Text style={styles.buttonTextStyle}>I wanna buy</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                            onPress={() => {
                                signOut()
                            }}>
                            <Text style={styles.buttonTextStyle}>Sign Out</Text>
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