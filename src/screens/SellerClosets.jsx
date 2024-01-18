import React, { useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { HeaderBackTitle, HeaderSearchTitle } from '../components/header'
import { SafeAreaView } from 'react-native-safe-area-context'
import { sellerJson } from '../services/api/seller'
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../components/SearchBar'

const SellerClosets = ({ navigation }) => {
    const dispatch = useDispatch();
    const sellerUser = useSelector((state) => state.sellerUser);
    console.log("sellerUser", sellerUser)
    const [sellerList, setSellerList] = useState([])
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);

    let dataList = []
    useEffect(() => {
        sellerUser.map((data) => {
            dataList.push(data)
        })
        sellerJson.map((data) => {
            dataList.push(data)
        })
        setSellerList(dataList)
    }, [])

    const _onSeachPress = () => {
        navigation.navigate('sellerSearchScreen')
    }

    return (
        <SafeAreaView forceInset={{ top: 'always' }} style={styles.safeContainerStyle}>
            <HeaderSearchTitle navigation={navigation} title={'Seller closets'} isBackVisible={false} onSeachPress={_onSeachPress} />
            {/* <SearchBar
                searchPhrase={searchPhrase}
                setSearchPhrase={setSearchPhrase}
                clicked={clicked}
                setClicked={setClicked}
            /> */}

            <View style={styles.containerView} >
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    marginBottom: 100,
                }}>
                    <Text
                        style={{
                            justifyContent: 'center',
                            alignSelf: 'center',
                            marginTop: 20,
                            marginBottom: 20,
                            margin: 1,
                            color: '#000',
                            fontSize: 30,
                            fontWeight: '500',
                        }}
                    >Monthly Hottest {"\n"}Sellers closets</Text>
                    <FlatList
                        data={sellerList}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('sellerClosetsInfo', {
                                        productInfo: item,
                                        sellerItem: item,
                                        sellerId: item.id,
                                    })
                                }}
                                style={{
                                    flex: 1,
                                    flexDirection: 'column',
                                    margin: 5,

                                }}>
                                <Image
                                    style={styles.imageThumbnail}
                                    source={{ uri: item.image }}
                                />
                            </TouchableOpacity>
                        )}
                        //Setting the number of column
                        numColumns={3}
                        keyExtractor={(item, index) => index}
                    />
                </View>
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
        backgroundColor: '#ededed',
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
export default SellerClosets
