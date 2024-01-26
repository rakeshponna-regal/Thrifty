import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    KeyboardAvoidingView,
    Image,
    PermissionsAndroid,
    Alert,
} from 'react-native';
import { HeaderBackTitle } from '../components/header';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { showMessage } from 'react-native-flash-message';
import CustomTextinput from '../components/CustomTextinput';
import { colors } from '../utils/Theme';
import { validateEmail } from '../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { addToSeller } from '../services/slices/profileSlice';
import { KEY_USER_ID, retrieveItem } from '../utils/asyncStorage';
import {  addToSellerVerify, clearState } from '../services/slices/sellerverify';

const SellerVerificationScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const seller = useSelector((state) => state.sellerverify);

    const [singleImage, setSingleImage] = useState("");
    const [frontImage, setFrontImage] = useState("");
    const [backImage, setBackImage] = useState("");

    const [firstName, setfirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [brand, setBrandName] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [drivingLicence, setDrivingLicence] = useState("");

    const [state, setState] = useState({
        isValid: false,
        errors: false
    });
    console.log("profile ",seller)
    const onNextStep = () => {
        if (!state.isValid) {
            setState({ ...state, errors: true });
        } else {
            setState({ ...state, errors: false });
        }
    };

    const requestPermission = async () => {

        if (Platform.OS === 'android') {
            // Calling the permission function
            const granted = await PermissionsAndroid.requestMultiple(
                [PermissionsAndroid.PERMISSIONS.CAMERA,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE],
                {
                    title: 'Camera Permission',
                    message: 'App needs access to your camera',
                },
            );
            if (granted == PermissionsAndroid.RESULTS.GRANTED) {
                // Permission Granted
                console.log("Permission Granted")
            } else {
                console.log("Permission Denied")
                // Permission Denied
                // alert('CAMERA Permission Denied');
            }
        } else {

        }

    }

    useEffect(() => {
        // dispatch(clearState())
        requestPermission()
    }, [])

    const progressStepsStyle = {
        activeStepIconBorderColor: 'lightblue',
        activeLabelColor: 'black',
        activeStepNumColor: 'black',
        activeStepIconColor: 'lightblue',
        completedStepIconColor: 'lightgreen',
        completedProgressBarColor: 'lightgreen',
        completedCheckColor: 'green'
    };

    const buttonTextStyle = {
        color: '#686868',
        fontWeight: 'bold'
    };

    const handleCameraLaunch = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        launchCamera(options, response => {
            if (response.didCancel) {
                console.log('User cancelled camera');
            } else if (response.error) {
                console.log('Camera Error: ', response.error);
            } else {
                let imageUri = response.uri || response.assets?.[0]?.uri;
                setSingleImage(imageUri);
                setFrontImage(imageUri);
                console.log("imageUri", imageUri);
            }
        });
    }

    const handleBackCameraLaunch = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        launchCamera(options, response => {
            if (response.didCancel) {
                console.log('User cancelled camera');
            } else if (response.error) {
                console.log('Camera Error: ', response.error);
            } else {
                let imageUri = response.uri || response.assets?.[0]?.uri;
                setBackImage(imageUri);
                console.log("imageUri", imageUri);
            }
        });
    }

    const handleGalleryLaunch = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('User cancelled camera');
            } else if (response.error) {
                console.log('Camera Error: ', response.error);
            } else {
                let imageUri = response.uri || response.assets?.[0]?.uri;
                setSingleImage(imageUri);
                console.log("imageUri", imageUri);
            }
        });
    }

    const step1 = () => {
        return (
            <>
                <View style={{ marginStart: 5, width: '100%', height: '100%', marginTop: 10, flexDirection: "row", flex: 1, justifyContent: 'space-around' }}>
                    <TouchableOpacity
                        onPress={() => {
                            handleCameraLaunch()
                        }}
                        style={{
                            marginStart: 5, marginTop: 10, flexDirection: "row", borderColor: 'black', borderWidth: 1, borderRadius: 5,
                            paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10
                        }}>
                        <MaterialCommunityIcons name='camera' color='grey' size={30} />
                        <Text style={{ marginStart: 20, alignItems: 'center', alignSelf: 'center', fontSize: 16, fontWeight: '500' }}>Open Camera</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            handleGalleryLaunch()
                        }}
                        style={{
                            marginStart: 5, marginTop: 10, flexDirection: "row", borderColor: 'black', borderWidth: 1, borderRadius: 5,
                            paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10
                        }}>
                        <MaterialCommunityIcons name='image-plus' color='grey' size={30} />
                        <Text style={{ marginStart: 20, alignItems: 'center', alignSelf: 'center', fontSize: 16, fontWeight: '500' }}>From Gallery</Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    borderRadius: 5,
                    margin: 30,
                }}>
                    <Image
                        source={{ uri: singleImage }}
                        // source={require('../assets/images/thrifty_logo.jpg')}
                        style={{ height: 300, width: 300 }}
                        resizeMode="contain"
                    />
                </View>
            </>
        )
    }

    const showMsg = (msg) => {
        showMessage(
            {
                message: msg,
                position: "top"
            }
        )
    }

    const validate = async () => {
        let userId = await retrieveItem(KEY_USER_ID)
        if (!firstName) {
            showMsg('Please enter first name')
        } else if (firstName.length < 5) {
            showMsg('Minimum length should be 5 ')
        } else if (!lastName) {
            showMsg('Please enter last name')
        } else if (lastName.length < 5) {
            showMsg('Minimum length should be 5 ')
        }else if (!email) {
            showMsg('Please enter email id')
        } else if (!validateEmail(email)) {
            showMsg('Please enter valid email id')
        } else if (!mobile) {
            showMsg('Please enter contact number')
        } else if (mobile.length < 8) {
            showMsg('Minimum length should be 8 ')
        } else if (!brand) {
            showMsg('Please enter brand name')
        } else if (!drivingLicence) {
            showMsg('Please enter driving licence')
        }
        // else if (!frontImage) {
        //     showMsg('Please upload front driving licence copy')
        // }else if (!backImage) {
        //     showMsg('Please upload back driving licence copy')
        // }
         else {
            try {
                var ID = Math.floor(Math.random() * 100)
            let data = {
                id : ID,
                f_name : firstName,
                l_name : lastName,
                brand_name : brand,
                email : email,
                mobile : mobile,
                dl_no : drivingLicence,
                userType : 'seller',
                user_id : userId,
                image : {
                    front : frontImage,
                    back :backImage,
                }
            }
           dispatch(addToSellerVerify(data))
            Alert.alert(
                "Thank you choosing seller account",
                "Verification is under process it may take  2-4 business hours.",
                [
                    {
                        text: "Ok",
                        onPress: async () => {
                            navigation.pop()
                        }
                    },
                    // {
                    //     text: "Cancel",
                    //     onPress: () => { }
                    // },
                ],
                {
                    cancelable: true,
                }
            );
            } catch (error) {
                console.log(error)
            }
            
        }
    }

    const HeaderTitle = (title) => {
        return (
            <View style={{ backgroundColor: '#ffffff' }}>
                <View style={{ flexDirection: 'row', height: 45, padding: 10, marginTop: 0, alignSelf: 'center', backgroundColor: '#ffffff' }}>
                    <TouchableOpacity style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}
                        onPress={() => {
                            navigation.goBack()
                        }}>
                        <Icon name="angle-left" size={26} color="#000000" />
                        <Text style={{
                            fontWeight: "bold",
                            fontSize: 18,
                            marginStart: 15,
                            color: "#000000",
                        }}> Seller Verification</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', borderRadius: 25, marginEnd: 10 }}
                        onPress={() => { validate() }}>
                        <View >
                            <Text style={{
                                flex: 1, fontWeight: "bold",
                                fontSize: 18,
                                color: "#00306b",
                            }}>Submit</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{
                    borderBottomColor: '#000',
                    opacity: 0.2,
                    borderBottomWidth: 1,
                }} />
            </View>
        )
    }

    return (

        <SafeAreaView forceInset={{ top: 'always' }} style={styles.safeContainerStyle}>
            <HeaderTitle />
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>
                {/* <KeyboardAvoidingView
                    behavior='padding'
                > */}
                    <View style={styles.containerView} >

                        <CustomTextinput
                            value={firstName}
                            placeholder="First name"
                            onChangeText={value => setfirstName(value)}
                            multiline={true}
                            autoCapitalize="sentences"
                            style={{ textAlignVertical: 'top' }}
                        />
                        <CustomTextinput
                            value={lastName}
                            placeholder="Last name"
                            onChangeText={value => setLastName(value)}
                            multiline={true}
                            autoCapitalize="sentences"
                            style={{ textAlignVertical: 'top' }}
                        />
                        <CustomTextinput
                            value={email}
                            placeholder="Email id"
                            onChangeText={value => setEmail(value)}
                            multiline={true}
                            autoCapitalize="sentences"
                            style={{ textAlignVertical: 'top' }}
                        />
                        <CustomTextinput
                            value={mobile}
                            placeholder="Contact number"
                            onChangeText={value => setMobile(value)}
                            multiline={true}
                            keyboardType='numeric'
                            autoCapitalize="sentences"
                            style={{ textAlignVertical: 'top' }}
                        />
                         <CustomTextinput
                            value={brand}
                            placeholder="Brand name"
                             onChangeText={value => setBrandName(value)}
                            multiline={true}
                            autoCapitalize="sentences"
                            style={{ textAlignVertical: 'top' }}
                        />
                        <CustomTextinput
                            value={drivingLicence}
                            placeholder="Driving licence"
                            onChangeText={value => setDrivingLicence(value)}
                            multiline={true}
                            textTransform ='uppercase' 
                            autoCapitalize="characters"
                            style={{ textAlignVertical: 'top' }}
                        />
                        <Text style={{ marginStart: 10, marginTop: 10, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', fontSize: 18, fontWeight: '600' }}>Upload Driving licence</Text>
                        {/* {
                            frontImage ? (
                                <>
                                    <View style={{
                                        height: 230, width: '80%', justifyContent: 'center', borderColor: colors.inputTextBackground, borderWidth: 1, borderRadius: 5,
                                        marginTop: 30, marginStart: 30, marginEnd: 30, marginBottom: 10,
                                    }}>
                                        <Image
                                            source={{ uri: frontImage }}
                                            // source={require('../assets/images/thrifty_logo.jpg')}
                                            style={{ height: 230, }}
                                            resizeMode="contain"
                                        />
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            handleCameraLaunch()
                                        }}
                                    >
                                        <Text style={{ marginStart: 10, marginBottom: 10, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', fontSize: 16, fontWeight: '500' }}>Click here to upload again!</Text>
                                    </TouchableOpacity>
                                </>
                            ) : (
                                <>
                                    <TouchableOpacity
                                        onPress={() => {
                                            handleCameraLaunch()
                                        }}
                                        style={{
                                            height: 230, width: '80%', alignSelf: 'center', justifyContent: 'center',
                                            marginStart: 5, marginTop: 10, flexDirection: "row", borderColor: 'black', borderWidth: 1, borderRadius: 5,
                                            paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10
                                        }}>
                                        <MaterialCommunityIcons name='camera' color='grey' size={30} style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', fontSize: 16, fontWeight: '500' }} />
                                        <Text style={{ marginStart: 10, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', fontSize: 16, fontWeight: '500' }}>Scan Front Page</Text>
                                    </TouchableOpacity>

                                </>
                            )
                        }

                        {
                            backImage ? (
                                <>
                                    <View style={{
                                        height: 230, width: '80%', justifyContent: 'center', borderColor: colors.inputTextBackground, borderWidth: 1, borderRadius: 5,
                                        marginTop: 30, marginStart: 30, marginEnd: 30, marginBottom: 10,
                                    }}>
                                        <Image
                                            source={{ uri: backImage }}
                                            // source={require('../assets/images/thrifty_logo.jpg')}
                                            style={{ height: 230, }}
                                            resizeMode="contain"
                                        />
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            handleBackCameraLaunch()
                                        }}
                                    >
                                        <Text style={{ marginStart: 10, marginBottom: 10, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', fontSize: 16, fontWeight: '500' }}>Click here to upload again!</Text>
                                    </TouchableOpacity>
                                </>
                            ) : (
                                <>
                                    <TouchableOpacity
                                        onPress={() => {
                                            handleBackCameraLaunch()
                                        }}
                                        style={{
                                            height: 230, width: '80%', alignSelf: 'center', justifyContent: 'center',
                                            marginStart: 5, marginTop: 10, flexDirection: "row", borderColor: 'black', borderWidth: 1, borderRadius: 5,
                                            paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10
                                        }}>
                                        <MaterialCommunityIcons name='camera' color='grey' size={30} style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', fontSize: 16, fontWeight: '500' }} />
                                        <Text style={{ marginStart: 10, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', fontSize: 16, fontWeight: '500' }}>Scan Back Page</Text>
                                    </TouchableOpacity>

                                </>
                            )
                        } */}

                        {/* <TouchableOpacity style={{
                            width: "60%",
                            backgroundColor: colors.dark_accent,
                            borderRadius: 25,
                            height: 40,
                            alignSelf: 'center',
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: 30,
                            fontWeight: "bold",
                            marginBottom: 10,
                        }} onPress={() => {
                            validate()
                        }}>
                            <Text style={{
                                color: "white",
                                fontSize: 20,
                            }}>Submit</Text>
                        </TouchableOpacity> */}
                    </View>
                {/* </KeyboardAvoidingView> */}

            </ScrollView>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    safeContainerStyle: {
        backgroundColor: '#ededed',
        flex: 1,
        marginBottom: 60,
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

export default SellerVerificationScreen;