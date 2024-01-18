import React, { createRef, useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, TextInput, View, StyleSheet, Image, Button, Platform, PermissionsAndroid, TouchableOpacity, Text, FlatList, KeyboardAvoidingView, Alert } from 'react-native'
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-picker';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Loader from '../components/Loader';
import { Dimensions } from 'react-native';
import CustomTextinput, { CustomDescriptionTextinput } from '../components/CustomTextinput';
import SelectDropdown from 'react-native-select-dropdown';
import { colorsTypes, sizeTypes } from '../utils/Constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { colors } from '../utils/Theme';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { addToSellerProducts } from '../services/slices/sellerProducts';
import { addToSelleruser } from '../services/slices/sellerUser';
import { addToProducts, addToProductsList } from '../services/slices/productsInfo';
import { getSellerByUser, getSellersByUserId, getUserIdFromAsyncStorage, selectedUserIdSelector, userIDSelector } from '../services/slices/selector';
import { KEY_USER_ID, retrieveItem } from '../utils/asyncStorage';

const SellerScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const seller = useSelector((state) => state.sellerverify);
    console.log(seller)
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [productName, setProductName] = useState("");
    const [productSize, setProductSize] = useState("");
    const [productAgency, setProductAgency] = useState(seller[0].brand_name);
    const [productPrice, setProductPrice] = useState("");
    const [productSizeType, setProductSizeType] = useState("");
    const [productBrand, setProductBrand] = useState("");
    const [productColor, setProductColor] = useState("");
    const [description, setDescription] = useState("");
    const descriptionInputRef = createRef();
    const win = Dimensions.get('window');
    // const sellerInfo = useSelector(state => getSellersByUserId(state, '65a6a750b5c3f6683d464bdf'));
    const [sellerInfo, setSellerInfo] = useState(null)
    React.useLayoutEffect(() => {
        navigation.setOptions?.(
            {
                headerTitle: `Upload Products`,
                headerStyle: {
                    backgroundColor: Colors.White
                },
                headerRight: () => (
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={() => {
                            onSave()
                        }}>
                        <Text style={styles.buttonTextStyle}>Save</Text>
                    </TouchableOpacity>
                ),
            });
    }, [navigation, images]);

    useEffect(() => {
        requestPermission()
        initData()
    }, [sellerInfo])

    const initData = async () => {
        let userID = await retrieveItem(KEY_USER_ID)
        seller.map((item) =>{
            if(item.user_id == userID){
                setSellerInfo(item)
            }
        })
        setProductAgency(sellerInfo.brand_name)
        console.log("object",sellerInfo)
      }

    const onSave = () => {
        showMessage({
            message: 'Saving...'
        });
        var ID = Math.floor(Math.random() * 1000)
        const updatedAtDate = new Date();
        const formattedDate = updatedAtDate.toISOString();
        const jsonData = {
            "id": ID,
            "title": productName,
            "price": productPrice,
            "description": description,
            "images": images,
            "seller_id": sellerInfo.id,
            "color":productColor,
            "size" :productSizeType,
            "creationAt": formattedDate,
            "updatedAt": formattedDate,
            "rating": {
                "rate": 3.9,
                "count": 120
            },
            "category": {
                "id": 1,
                "name": "Clothes1",
                "image": "https://i.imgur.com/QkIa5tT.jpeg",
                "creationAt": "2024-01-05T16:24:11.000Z",
                "updatedAt": "2024-01-05T16:42:09.000Z"
            }
        }
        console.log("jsonData", jsonData)
        dispatch(addToSellerProducts(jsonData))
        dispatch(addToProductsList(jsonData))

        let sellerJson = {
            "id": sellerInfo.id,
            "name": sellerInfo.f_name,
            "user_id": sellerInfo.user_id,
            "image": "https://media.istockphoto.com/id/1386866479/photo/smiling-confident-caucasian-young-businesswoman-auditor-writing-on-clipboard-signing-contract.jpg?s=2048x2048&w=is&k=20&c=wUUzLCwXehztcBYO5ca6Z2WEOFyA4s0Vph7FgAJx9ps="
        }
        console.log("sellerJson", sellerJson)
        dispatch(addToSelleruser(sellerJson))
        Alert.alert(
            'Success',
            'Product added successfully',
            [
              {
                text: 'Ok',
                onPress: () => navigation.goBack(),
              },
            ],
            { cancelable: false }
          );
        /* 
                realmSchema.write(() => {
                    var ID = realmSchema.objects('products').sorted('product_id', true).length > 0
                      ? realmSchema.objects('products').sorted('product_id', true)[0]
                        .product_id + 1
                      : 1;
        
                      const data = {
                        product_id: ID,
                        user_id: 1,
                        product_name: productName,
                        product_description: description,
                        size_type: productSizeType,
                        size: productSizeType,
                        image_urls: img,
                        price: productPrice,
                        agency: productAgency,
                        brand: productBrand,
                        color: productColor,
                    }
                   const status =  realmSchema.create('products', data);
                   console.log("status",status)
        
                   Alert.alert(
                    'Success',
                    'Product added successfully',
                    [
                      {
                        text: 'Ok',
                        onPress: () => navigation.replace('UserType'),
                      },
                    ],
                    { cancelable: false }
                  );
                  })
         */
    }

    const openImagePicker = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
            multiple: true,
            selectionLimit: 5,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('Image picker error: ', response.error);
            } else {
                console.log('Image picker response: ', response);
                let tempArray = []
                if (images) {
                    images?.forEach((item) => {
                        tempArray.push(item)
                    })
                }
                response.assets?.forEach((item) => {
                    tempArray.push(item.uri)
                })
                setImages(tempArray)
                console.log(images)
            }
        });
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
                console.log("response", response)
                let tempArray = []
                if (images) {
                    images?.forEach((item) => {
                        tempArray.push(item)
                    })
                }
                response.assets?.forEach((item) => {
                    tempArray.push(item.uri)
                })
                setImages(tempArray)
                console.log(images);
            }
        });
    }


    requestPermission = async () => {

        if (Platform.OS === 'android') {
            // Calling the permission function
            const granted = await PermissionsAndroid.requestMultiple(
                [PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE],
                {
                    title: 'Example App Camera Permission',
                    message: 'Example App needs access to your camera',
                },
            );
            if (granted == PermissionsAndroid.RESULTS.GRANTED) {
                // Permission Granted

            } else {
                // Permission Denied
                // alert('CAMERA Permission Denied');
            }
        } else {

        }

    }

    
    const ImageView = () => {
        return (
            <>
                <View style={{ marginStart: 5,marginBottom:10, width: '100%', height: '100%', marginTop: 0, flexDirection: "row", flex: 1, justifyContent: 'space-around' }}>
                    <TouchableOpacity
                        onPress={() => {
                            handleCameraLaunch()
                        }}
                        style={{
                            marginStart: 5, marginTop: 10, flexDirection: "row", borderColor: colors.inputTextBackground, borderWidth: 1, borderRadius: 5,
                            paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10
                        }}>
                        <MaterialCommunityIcons name='camera' color='grey' size={30} />
                        <Text style={{ marginStart: 20, alignItems: 'center', alignSelf: 'center', fontSize: 16, fontWeight: '500' }}>Open Camera</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            openImagePicker()
                        }}
                        style={{
                            marginEnd: 10, marginTop: 10, flexDirection: "row", borderColor: colors.inputTextBackground, borderWidth: 1, borderRadius: 5,
                            paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10
                        }}>
                        <MaterialCommunityIcons name='image-plus' color='grey' size={30} />
                        <Text style={{ marginStart: 20, alignItems: 'center', alignSelf: 'center', fontSize: 16, fontWeight: '500' }}>From Gallery</Text>
                    </TouchableOpacity>
                </View>
            </>
        )
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
                        }}>Upload Product</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', borderRadius: 25, marginEnd: 10 }}
                        onPress={() => { onSave() }}>
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

    _renderItem = ({ item }) => {
        return (
            <View style={{
                borderRadius: 5,
                margin: 5,
                width: 250,
                height: win.height * .4,
            }}>
                <Image
                    source={{ uri: item }}
                    style={{ flex: 1 }}
                    resizeMode="cover"
                />
            </View>
        )
    }

    return (
        <SafeAreaView forceInset={{ top: 'always' }} style={styles.safeContainerStyle}>
            <HeaderTitle />
            <Loader loading={loading} />
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>
                <View style={styles.containerView} >
                    <CustomTextinput
                        value={productName}
                        placeholder="Enter product name"
                        onChangeText={value => setProductName(value)}
                        multiline={true}
                        autoCapitalize="sentences"
                        returnKeyType="next"
                        style={{ textAlignVertical: 'top' }}
                    />

                    <CustomTextinput
                        value={productPrice}
                        placeholder="Enter Price"
                        onChangeText={value => setProductPrice(value)}
                        multiline={true}
                        keyboardType='numeric'
                        autoCapitalize="sentences"
                        returnKeyType="next"
                        style={{ textAlignVertical: 'top' }}
                    />

                    <CustomTextinput
                        value={productAgency}
                        placeholder="Enter Agency"
                        onChangeText={value => setProductAgency(value)}
                        multiline={true}
                        editable={false}
                        autoCapitalize="sentences"
                        returnKeyType="next"
                        style={{ textAlignVertical: 'top' }}
                    />

                     <View style={styles.SectionStyle}>
                        <SelectDropdown
                            style={styles.buttonTextStyle}
                            data={colorsTypes}
                            defaultButtonText= "Select colors"
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index)
                                setProductColor(selectedItem)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                // text represented after item is selected
                                // if data array is an array of objects then return selectedItem.property to render after item is selected
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                // text represented for each item in dropdown
                                // if data array is an array of objects then return item.property to represent item in dropdown
                                return item
                            }}
                            buttonStyle={styles.dropdown1BtnStyle}
                            buttonTextStyle={styles.dropdown1BtnTxtStyle}
                            // renderDropdownIcon={isOpened => {
                            //     return <FontAwesomeIcon name={isOpened ? 'mug-saucer' : 'mug-saucer'} color={'#444'} size={18} />;
                            // }}
                            dropdownIconPosition={'right'}
                            dropdownStyle={styles.dropdown1DropdownStyle}
                            rowStyle={styles.dropdown1RowStyle}
                            rowTextStyle={styles.dropdown1RowTxtStyle}
                        />

                    </View>

                    <View style={styles.SectionStyle}>
                        <SelectDropdown
                            style={styles.buttonTextStyle}
                            data={sizeTypes}
                            defaultButtonText= "Select Size"
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index)
                                setProductSizeType(selectedItem)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                // text represented after item is selected
                                // if data array is an array of objects then return selectedItem.property to render after item is selected
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                // text represented for each item in dropdown
                                // if data array is an array of objects then return item.property to represent item in dropdown
                                return item
                            }}
                            buttonStyle={styles.dropdown1BtnStyle}
                            buttonTextStyle={styles.dropdown1BtnTxtStyle}
                            // renderDropdownIcon={isOpened => {
                            //     return <FontAwesomeIcon name={isOpened ? 'mug-saucer' : 'mug-saucer'} color={'#444'} size={18} />;
                            // }}
                            dropdownIconPosition={'right'}
                            dropdownStyle={styles.dropdown1DropdownStyle}
                            rowStyle={styles.dropdown1RowStyle}
                            rowTextStyle={styles.dropdown1RowTxtStyle}
                        />

                    </View>


                    {/*   <CustomTextinput
                        value={productBrand}
                        placeholder="Enter brand"
                        onChangeText={value => setProductBrand(value)}
                        multiline={true}
                        autoCapitalize="sentences"
                        returnKeyType="next"
                        style={{ textAlignVertical: 'top' }}
                    /> */}

                    <CustomDescriptionTextinput
                        value={description}
                        placeholder="Description"
                        onChangeText={value => setDescription(value)}
                        maxLength={225}
                        numberOfLines={5}
                        multiline={true}
                        autoCapitalize="sentences"
                        returnKeyType="next"
                        onSubmitEditing={() =>
                            descriptionInputRef.current &&
                            descriptionInputRef.current.focus()
                        }
                        style={{ textAlignVertical: 'top',height: 200 }}
                    />

                    {/*  <TouchableOpacity
                        onPress={openImagePicker}
                        style={[
                            styles.selectButtonContainer,
                            { backgroundColor: Colors.primaryLight }
                        ]}
                    >
                        <Text style={styles.selectButtonTitle}>Upload an image</Text>
                    </TouchableOpacity> */}
                    {
                        ImageView()
                    }

                </View>

                <FlatList
                    horizontal
                    style={{ margin: 10 }}
                    data={images}
                    renderItem={(item) => _renderItem(item)}
                    keyExtractor={(item, index) => index}
                />
            </ScrollView>

        </SafeAreaView>

    )
}

export default SellerScreen

const styles = StyleSheet.create({
    safeContainerStyle: {
        backgroundColor: '#ededed',
        flex: 1,
        marginBottom: 60,
        justifyContent: "flex-start",
    },
    containerView: {
        marginEnd: 5,
        backgroundColor: '#ffffff',
        color: "white"
    },
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        alignContent: 'center',
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    buttonStyle: {
        borderWidth: 0,
        color: '#000000',
        height: 40,
        alignItems: 'center',
    },
    inputStyle: {
        flex: 1,
        color: 'white',
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 1,
        borderRadius: 5,
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
    selectButtonContainer: {
        margin: 10,
        borderRadius: 5
    },
    selectButtonTitle: {
        borderColor: '#dadae8',
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        fontSize: 18
    },
    buttonTextStyle: {
        color: '#000000',
        paddingVertical: 10,
        fontSize: 16,
        fontWeight: '500'
    },
    dropdown1BtnStyle: {
        width: '100%',
        height: 40,
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#dadae8',
    },
    dropdown1BtnTxtStyle: { color: '#000', textAlign: 'left', fontSize: 14, },
    dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
    dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#dadae8' },
    dropdown1RowTxtStyle: { color: '#444', textAlign: 'left', },
});