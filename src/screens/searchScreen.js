// Searching using Search Bar Filter in React Native List View
// https://aboutreact.com/react-native-search-bar-filter-on-listview/

// import React in our code
import React, { useState, useEffect } from 'react';

// import all the components we are going to use
import {
    SafeAreaView,
    Text,
    Image,
    StyleSheet,
    View,
    FlatList,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { HeaderBackTitle } from '../components/header';
import { useDispatch, useSelector } from 'react-redux';

const SearchScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const productsInfo = useSelector((state) => state.productsInfo);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((responseJson) => {
                setFilteredDataSource(productsInfo);
                setMasterDataSource(productsInfo);
                // setFilteredDataSource(responseJson);
                // setMasterDataSource(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource
            // Update FilteredDataSource
            const newData = masterDataSource.filter(
                function (item) {
                    const itemData = item.title
                        ? item.title.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setFilteredDataSource(masterDataSource);
            setSearch(text);
        }
    };

    const ItemView = ({ item }) => {
        return (
            <>
                <View key={item.id} style={{
                    flex: 1,
                    flexDirection: "row",
                    paddingHorizontal: 20,
                    marginTop: 10,
                    marginBottom: 5,
                }}>

                    <TouchableOpacity
                        onPress={() => {
                            console.log("goToItem", item.id, item.qty)
                            navigation.navigate('sellerProductDetails', {
                                product: item
                            });
                        }
                        }
                    >
                        <Image style={styles.image} source={{ uri: item.images[0] }} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            console.log("goToItem", item.id, item.qty)
                            navigation.navigate('sellerProductDetails', {
                                product: item
                            });
                        }
                        } style={{ marginStart:10,flex: 1 ,justifyContent:'flex-start',alignContent:'center' }}>
                        <Text style={styles.title}>
                            {item?.title}
                        </Text>
                        <Text style={styles.title}>
                            Price : ${item?.price}
                        </Text>
                        <Text style={styles.title}>
                            Size : {item?.size}
                        </Text>
                        <Text style={styles.title}>
                            Seller code : {item?.seller_id}
                        </Text>
                    </TouchableOpacity>

                </View>

            </>
        );
    };

    const ItemSeparatorView = () => {
        return (
            // Flat List Item Separator
            <View
                style={{
                    height: 0.5,
                    width: '100%',
                    backgroundColor: '#C8C8C8',
                }}
            />
        );
    };

    const getItem = (item) => {
        // Function for click on an item
        alert('Id : ' + item.id + ' Title : ' + item.title);
    };

    return (
        <SafeAreaView forceInset={{ top: 'always' }} style={styles.safeContainerStyle}>
            <HeaderBackTitle navigation={navigation} title={'Search'} isBackVisible={true} />

            <View style={styles.container}>
                <TextInput
                    style={styles.textInputStyle}
                    onChangeText={(text) => searchFilterFunction(text)}
                    value={search}
                    underlineColorAndroid="transparent"
                    placeholder="Search Here"
                />
                <FlatList
                    data={filteredDataSource}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={ItemSeparatorView}
                    renderItem={ItemView}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeContainerStyle: {
        backgroundColor: '#ededed',
        flex: 1,
        justifyContent: "flex-start",
    },
    container: {
        backgroundColor: 'white',
    },
    itemStyle: {
        padding: 10,
    },
    textInputStyle: {
        height: 40,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: '#009688',
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 14,
        paddingHorizontal: 10,
      },
      text: {
        paddingHorizontal: 10,
      },
      image: {
        width: 80,
        height: 80,
      },
});

export default SearchScreen;