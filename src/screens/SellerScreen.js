import React, { createRef, useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, TextInput, View, StyleSheet, Image, Button, Platform, PermissionsAndroid, TouchableOpacity, Text, FlatList, KeyboardAvoidingView, Alert } from 'react-native'
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-picker';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Loader from '../components/Loader';
import { Dimensions } from 'react-native';
import CustomTextinput from '../components/CustomTextinput';
import SelectDropdown from 'react-native-select-dropdown';
import { colorsTypes, sizeTypes } from '../utils/Constants';
import Realm from 'realm';
let realm = new Realm({ path: 'UserDatabase.realm' });


function SellerScreen({ navigation }) {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [productName, setProductName] = useState("");
    const [productSize, setProductSize] = useState("");
    const [productAgency, setProductAgency] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productSizeType, setProductSizeType] = useState("");
    const [productBrand, setProductBrand] = useState("");
    const [productColor, setProductColor] = useState("");
    const [description, setDescription] = useState("");

    const descriptionInputRef = createRef();

    const win = Dimensions.get('window');

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
    }, [navigation]);

    function selectImage() {
        let options = {
            title: 'You can choose one image',
            maxWidth: 256,
            maxHeight: 256,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, response => {
            console.log({ response });

            if (response.didCancel) {
                console.log('User cancelled photo picker');
                Alert.alert('You did not select any image');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let source = { uri: response.uri };
                console.log({ source });
            }
        });
    }

    const onSave = () => {
        showMessage({
            message: 'Saving...'
        });

        realm.write(() => {
            var ID = realm.objects('products').sorted('product_id', true).length > 0
              ? realm.objects('products').sorted('product_id', true)[0]
                .product_id + 1
              : 1;

              const data = {
                product_id: ID,
                user_id: 1,
                product_name: productName,
                product_description: description,
                size_type: productSizeType,
                size: productSizeType,
                image_urls: images[0],
                price: productPrice,
                agency: productAgency,
                brand: productBrand,
                color: productColor,
            }
           const status =  realm.create('products', data);
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
                response.assets?.forEach((item) => {
                    tempArray.push(item.uri)
                })
                setImages(tempArray)
                console.log(images)
            }
        });
    };



    handleCameraLaunch = () => {
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
                setSelectedImage(imageUri);
                console.log(imageUri);
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

    useEffect(() => {
        requestPermission()
    }, [])

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
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <FlashMessage />
            <Loader loading={loading} />
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>
                <KeyboardAvoidingView
                    behavior='padding'
                >
                    <CustomTextinput
                        value={productName}
                        placeholder="Enter Name"
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
                        autoCapitalize="sentences"
                        returnKeyType="next"
                        style={{ textAlignVertical: 'top' }}
                    />

                    <CustomTextinput
                        value={productAgency}
                        placeholder="Enter Agency"
                        onChangeText={value => setProductAgency(value)}
                        multiline={true}
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


                    <CustomTextinput
                        value={productBrand}
                        placeholder="Enter brand"
                        onChangeText={value => setProductBrand(value)}
                        multiline={true}
                        autoCapitalize="sentences"
                        returnKeyType="next"
                        style={{ textAlignVertical: 'top' }}
                    />

                    <CustomTextinput
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
                        style={{ textAlignVertical: 'top' }}
                    />

                    <TouchableOpacity
                        onPress={openImagePicker}
                        style={[
                            styles.selectButtonContainer,
                            { backgroundColor: Colors.primaryLight }
                        ]}
                    >
                        <Text style={styles.selectButtonTitle}>Upload an image</Text>
                    </TouchableOpacity>


                </KeyboardAvoidingView>

                <FlatList
                    horizontal
                    style={{ margin: 10 }}
                    data={images}
                    renderItem={(item) => _renderItem(item)}
                    keyExtractor={(item, index) => index}
                />
            </ScrollView>

        </View>

    )
}

export default SellerScreen

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
    dropdown1BtnTxtStyle: { color: '#000', textAlign: 'left',fontSize: 14,  },
    dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
    dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#dadae8' },
    dropdown1RowTxtStyle: { color: '#444', textAlign: 'left', },
});