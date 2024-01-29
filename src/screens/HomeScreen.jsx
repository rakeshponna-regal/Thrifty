// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, SafeAreaView, Image, Dimensions, TouchableOpacity, FlatList, StyleSheet, TouchableHighlight } from 'react-native';
import Swiper from 'react-native-swiper';
import FontAwesome from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { trackPromise } from 'react-promise-tracker';
import { getProducts, getProductsJson } from '../services/api/productService';
import { HeaderBackTitle } from '../components/header';
import { addToFavorite } from '../services/slices/favoriteSlice';
import { addToCart } from '../services/slices/cartSlice';
import { showMessage } from 'react-native-flash-message';
import { removeItemFromProduct } from '../services/slices/productsInfo';


const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const flatListRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0)
  const [activeProduct, setActiveProduct] = useState()

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const [prize, setPrize] = useState("100")
  const [likedProduct, setLikedProduct] = useState(false)
  const [unLikedProduct, setUnLikedProduct] = useState(false)
  const favorite = useSelector((state) => state.favorite);
  const productsInfo = useSelector((state) => state.productsInfo);
  console.log("productsInfo", productsInfo.length)

  useEffect(() => {

    if (productsInfo) {
      try {
        const isFavoriteItemExists = favorite.some((item) => item.id === productsInfo[0].id)
        if (isFavoriteItemExists) {
          setLikedProduct(true)
        } else {
          setUnLikedProduct(false)
        }
      } catch (error) {
        console.log("isFavoriteItemExists error", error)
      }
      setActiveIndex(0)
      setActiveProduct(productsInfo[0])
      setPrize(productsInfo[0].price)
    }
  }, [])

  const checkExisitngProducState = (isFavoriteItemExists) => {
    console.log("isFavoriteItemExists", isFavoriteItemExists)
    if (isFavoriteItemExists) {
      setLikedProduct(true)
    } else {
      setUnLikedProduct(false)
    }
  }

  _renderItem = ({ item, index }) => {
    console.log(item)
    return (
      <View style={{
        borderRadius: 5,
        backgroundColor: 'floralwhite',
        margin: 5,
        width: "80%",
        height: 400,
        // height: height * .4,
      }}>
        <Text>{item.image_urls}</Text>
        <Image
          source={{ uri: "https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png" }}
          style={{ flex: 1, }}
          resizeMode="cover"
        />
      </View>
    )
  }

  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    if (contentOffset.x < 0) {
      // Block left-side scrolling by adjusting the contentOffset
      flatListRef.current.scrollToOffset({ offset: 0, animated: false });
    }
  };

  const handleContentSizeChange = (contentWidth) => {
    // Ensure that the content width is at least the width of the FlatList
    if (contentWidth < flatListWidth) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: false });
    }
  };

  return (
    <SafeAreaView forceInset={{ top: 'always' }} style={styles.safeContainerStyle}>
      <HeaderBackTitle navigation={navigation} title={'products'} isBackVisible={false} isSellerVisible={true} isSellerActivated={false} />
      <View style={styles.containerView} >
        <View
          style={{
            height: '90%',
            justifyContent: 'flex-start',
          }}>
        {/*   <FlatList
            style={{ width :"90%", height: '100%', overflow: "visible",marginEnd:10 ,alignSelf:'center', }}
            horizontal
            pagingEnabled
            scrollEnabled
            ref={flatListRef}
            onScroll={handleScroll}
            contentContainerStyle={{ flexGrow: 1 }}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={8}
            snapToAlignment="center"
            data={productsInfo}
            // onContentSizeChange={(contentWidth) => handleContentSizeChange(contentWidth)}
            keyExtractor={(item, index) => `${item.id} ${index}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{ width, height: height, }}
                onPress={() => {
                  console.log("activeIndex", activeIndex)
                  navigation.navigate('Productinfo', {
                    product: item
                  });
                }}
              >
                <Image
                  source={{ uri: item.images[0] }}
                  style={{ width :width, height: '100%' }}
                />

              </TouchableOpacity>
            )}
          >
          </FlatList> */}
          <Swiper
            dotColor="#ffffff"
            activeDotColor="red"
            showsPagination={false}
            loop={false}
            showsButtons={false}
            scrollEnabled={true}
            horizontal={true}
            autoplay={false}
            loadMinimal={false}
            loadMinimalSize={5}
            ref={flatListRef}
            onScroll={handleScroll}
            onIndexChanged={(index) => {
              setLikedProduct(false)
              setUnLikedProduct(false)
              setActiveIndex(index)
              setPrize(productsInfo[index]?.price);
              setActiveProduct(productsInfo[index])
              const isFavoriteItemExists = favorite.some((item) => item.id === productsInfo[index].id)
              checkExisitngProducState(isFavoriteItemExists)
              console.log("object", productsInfo[index], index)
            }}
          >
            {productsInfo?.map((data) => (
              <TouchableHighlight key={data?.id} style={{
                width: '100%',
                height: "100%",
                borderRadius: 10,
                borderBlockColor: 'black',
                alignItems: 'flex-start',
              }}

                onPress={() => {
                  console.log("activeIndex", activeIndex)
                  navigation.navigate('homeProdItems', {
                    product: data
                  });
                }}
              >
                {
                  data?.images ? (
                    data?.images[0].includes("file:///") ? (
                      <Image
                        source={{ uri: data?.images[0] }}
                        style={{
                          width: '100%',
                          height: '100%',
                          resizeMode: 'cover',
                        }} />
  
                    ) : (
                      <Image source={{ uri: data?.images[0] }} style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'cover',
                      }} />
  
                    )
                  ) : (<></>)
                }
              </TouchableHighlight>
            ))}
          </Swiper>
        </View>

        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text
              style={{
                fontSize: 14,
                marginStart: 10,
                marginTop: 5,
                textAlign: 'center',
              }}>
              ${prize}
            </Text>

            <TouchableOpacity style={{ marginEnd: 10, marginTop: 5, }}
              onPress={() => {
                dispatch(addToCart(activeProduct))
                showMessage({
                  message: "Product add to cart!"
                });
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  marginEnd: 10,
                  textAlign: 'center',
                  borderRadius: 10,
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                Add to cart
              </Text>
            </TouchableOpacity>

          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginStart: 10, marginEnd: 10 }}>
            <MaterialCommunityIcons name="backburger" size={30} onPress={() => {
              navigation.pop()
            }} />
            <MaterialCommunityIcons name={unLikedProduct ? 'heart-broken' : 'heart-broken-outline'} color={unLikedProduct ? 'red' : 'grey'} size={30}
              onPress={() => {
                // setUnLikedProduct(!unLikedProduct)
                dispatch(removeItemFromProduct(activeProduct.id))
                showMessage({
                  message: "Removed from List"
              });
              try {
                let nextItem = productsInfo[activeIndex+1]
                if (nextItem){
                  setActiveIndex(activeIndex+1)
                  setPrize(nextItem?.price);
                  setActiveProduct(nextItem)
                  const isFavoriteItemExists = favorite.some((item) => item.id === nextItem.id)
                  checkExisitngProducState(isFavoriteItemExists)
                }
              } catch (error) {
                console.log(error)
              }
              }}
            />
            <MaterialIcons name={likedProduct ? 'favorite' : 'favorite-border'} color={likedProduct ? 'red' : 'grey'} size={30}
              onPress={() => {
                setLikedProduct(!likedProduct)
                dispatch(addToFavorite(activeProduct))
              }} />
            <FontAwesome name="user-lock" size={30} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeContainerStyle: {
    backgroundColor: '#ededed',
    flex: 1,
    justifyContent: "flex-start",
  },
  containerView: {
    marginEnd: 5,
    width: "100%",
    height: '91%',
    backgroundColor: '#ffffff',
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
})