// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Image, Dimensions, TouchableOpacity, FlatList, StyleSheet, TouchableHighlight } from 'react-native';
import Swiper from 'react-native-swiper';
import FontAwesome from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { trackPromise } from 'react-promise-tracker';
import { getProducts } from '../services/api/productService';
import { HeaderBackTitle } from '../components/header';
import { addToFavorite } from '../services/slices/favoriteSlice';
import { selectFavoriteItemExists } from '../services/slices/selector';
import { addToCart } from '../services/slices/cartSlice';
import { showMessage } from 'react-native-flash-message';


const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeProduct, setActiveProduct] = useState()

  const [products, setProducts] = useState([])
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const [prize, setPrize] = useState("100")
  const [likedProduct, setLikedProduct] = useState(false)
  const [unLikedProduct, setUnLikedProduct] = useState(false)
  const favorite = useSelector((state) => state.favorite);

  useEffect(() => {
    trackPromise(
      dispatch(getProducts())
        .unwrap()
        .then(resp => {
          console.log("getProducts", resp)
          if (resp.status = "Success") {
            setProducts(resp.data)
            if (resp.data.length > 0) {
              console.log("resp.data ", resp.data[0])
              try {
                const isFavoriteItemExists = favorite.some((item) => item.id === resp.data[0].id)
                // const isFavoriteItemExists = useSelector(selectFavoriteItemExists(resp.data[0].id));
                console.log("isFavoriteItemExists", isFavoriteItemExists)
                if (isFavoriteItemExists) {
                  setLikedProduct(true)
                } else {
                  setUnLikedProduct(false)
                }
              } catch (error) {
                console.log("isFavoriteItemExists error", error)
              }
              setActiveIndex(0)
              setActiveProduct(resp.data[0])
              setPrize(resp.data[0].price)
            }
            // console.log("getProducts",resp.data)
          } else {

          }
        })
    )
    console.log(products)
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

  return (
    <SafeAreaView forceInset={{ top: 'always' }} style={styles.safeContainerStyle}>
      <HeaderBackTitle navigation={navigation} title={ 'products'}  isBackVisible={false}/>
      <View style={styles.containerView} >
        <View
          style={{
            height: '90%',
            justifyContent: 'flex-start',
          }}>
          {/* <FlatList
            style={{ width :"90%", height: '100%', overflow: "visible",marginEnd:10 }}
            horizontal
            pagingEnabled
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={8}
            snapToAlignment="center"
            data={products}
            keyExtractor={(item, index) => `${item.id} ${index}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{ width, height: "100%", overflow: "visible",margin:5, }}
                onPress={() => {
                  console.log("activeIndex", activeIndex)
                  navigation.navigate('Productinfo', {
                    product: item
                  });
                }}
              >
                <Image
                  source={{ uri: item.images[0] }}
                  resizeMode="contain"
                  style={{ width, height: height / 2 }}
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
            horizontal={true}
            autoplay={false}
            loadMinimal={false}
            loadMinimalSize={5}
            onIndexChanged={(index) => {
              setLikedProduct(false)
              setUnLikedProduct(false)
              setActiveIndex(index)
              setPrize(products[index]?.price);
              setActiveProduct(products[index])
              const isFavoriteItemExists = favorite.some((item) => item.id === products[index].id)
              checkExisitngProducState(isFavoriteItemExists)
              console.log("object", products[index], index)
            }}
          >
            {products?.map((data) => (
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
                <Image source={{ uri: data?.images[0] }} style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'cover',
                }} />
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
                marginTop:5,
                textAlign: 'center',
              }}>
              ${prize}
            </Text>

            <TouchableOpacity style ={{ marginEnd: 10,marginTop:5,}}
            onPress={()=>{
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
            <MaterialCommunityIcons name="backburger" size={30}  onPress={()=>{
              navigation.pop()
            }}/>
            <MaterialCommunityIcons name={unLikedProduct ? 'heart-broken' : 'heart-broken-outline'} color={unLikedProduct ? 'red' : 'grey'} size={30}
              onPress={() => {
                setUnLikedProduct(!unLikedProduct)
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
    height: '84%',
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