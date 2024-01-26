import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import { colors, sizes } from '../utils/Theme';
const { width, height } = Dimensions.get("window");
import StarRating from "react-native-star-rating";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../services/slices/cartSlice';
import { HeaderBackTitle } from '../components/header';
import { selectCartItemExists } from '../services/slices/selector';
import { Svg } from 'react-native-svg';
import { colorSelector, colorsMap, colorsTypes, sizeTypes } from '../utils/Constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { addToFavorite, removeFromFavorite } from '../services/slices/favoriteSlice';
import { showMessage } from 'react-native-flash-message';
import { sellerJson } from '../services/api/seller';

const ProductDetails = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const itemProduct = route.params?.product;
  // console.log(route.params.product)
  const [product, setProduct] = useState(itemProduct)
  const [quantity, setQuantity] = useState(1)
  const [price, setPrice] = useState(product.price)
  const [desc, setDesc] = useState(product.description)
  const [rating, setRating] = useState(parseInt(product.rating.rate))
  const isCartItemExists = useSelector(selectCartItemExists(product.id));
  const [selectedView, setSelectedView] = useState(null);
  const [selectedColorView, setSelectedColorView] = useState(null);
  const [likedProduct, setLikedProduct] = useState(false)
  const [seller, setSeller] = useState()
  useEffect(() => {
    setSeller(sellerJson.find((item) => item.id === product.seller_id))
  }, [seller])
  console.log("isCartItemExists", isCartItemExists, itemProduct)
  console.log("seller", seller)

  const handleViewClick = (viewIndex) => {
    // Update the state to store the selected view index
    setSelectedView(viewIndex);
  };
  const handleColorViewClick = (viewIndex) => {
    // Update the state to store the selected view index
    setSelectedColorView(viewIndex);
  };

  return (
    <SafeAreaView forceInset={{ top: 'always' }} style={styles.safeContainerStyle}>
      <HeaderBackTitle navigation={navigation} title={product.title} isBackVisible={true} isSellerVisible={true} isSellerActivated={false} />
      <ScrollView>
        <FlatList
          horizontal
          pagingEnabled
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={8}
          snapToAlignment="center"
          data={product.images}
          keyExtractor={(item, index) => `${item} ${index}`}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              resizeMode="contain"
              style={{ width, height: height / 2, overflow: "visible" }}
            />

          )}
        >
        </FlatList>
        <View style={{ flex: 1, backgroundColor: colors.backgroundView }}>
          <View style={{ backgroundColor: colors.backgroundView }}>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <Text
                style={{
                  flex: 1,
                  fontSize: sizes.h3,
                  fontWeight: "700",
                  paddingHorizontal: sizes.padding-10,
                  marginTop: sizes.margin,
                }}
              >
                US ${price} 
              </Text>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    textAlign: "right",
                    paddingHorizontal: sizes.padding + 20,
                    top: 10,
                    left: 22,
                  }}
                >
                  <MaterialIcons name={likedProduct ? 'favorite' : 'favorite-border'} color={likedProduct ? 'red' : 'grey'} size={30}
                    onPress={() => {
                      setLikedProduct(!likedProduct)
                      if (likedProduct) {
                        dispatch(removeFromFavorite(product.id))
                        showMessage({
                          message: ` ${!likedProduct ? 'Added to Favorite' : 'Removed from favorite'}`
                        });
                      } else {
                        dispatch(addToFavorite(product))
                        showMessage({
                          message: ` ${!likedProduct ? 'Added to Favorite' : 'Removed from favorite'}`
                        });
                      }
                    }} />
                </View>
              </View>
            </View>
            {/* <View style={{ marginTop: sizes.margin - 5 }}>
              <Text style={{ paddingHorizontal: sizes.padding }}>
                {desc}
              </Text>
            </View> */}

            <View style={{ marginStart: 5, marginTop: 10, flexDirection: "row", flex: 1 }}>
              <Text style={{
                paddingHorizontal: 5, fontSize: 16,
                fontWeight: "700", marginTop: 16,
              }}>
                Sizes :
              </Text>
              <Text style={{
                marginStart: 10,
                fontWeight: '400', fontSize: 14, alignItems: 'center', marginTop: 16,
              }}>
                {product.color ? product.size : 'M'}
              </Text>
            </View>

            <View style={{ marginStart: 5, marginTop: 10, flexDirection: "row", flex: 1 }}>
              <Text style={{
                paddingHorizontal: 5, fontSize: 16,
                fontWeight: "700", marginTop: 16,
              }}>
                Color :
              </Text>
              <Text style={{
                marginStart: 10,
                fontWeight: '400', fontSize: 14, alignItems: 'center', marginTop: 16,
              }}>
                {product.color ? product.color : 'WHITE'}
              </Text>
            </View>
            {/* 
            <View style={{ marginStart: 5, marginTop: 10, flexDirection: "row", flex: 1 }}>
              <Text style={{
                paddingHorizontal: 5, fontSize: 16,
                fontWeight: "700", marginTop: 16,
              }}>
                Sizes :
              </Text>
              <View style={{ marginStart: 5, marginTop: 10, flexDirection: "row", flex: 1 }}>
                {sizeTypes.map((key, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleViewClick(index)}
                  >
                    <View style={{
                      opacity: selectedView === index ? 1 : 0.3,
                      borderWidth: 2, borderColor: selectedView === index ? colors.secondary : colors.white,
                      marginEnd: 2, alignItems: 'center', justifyContent: 'center',
                      width: 35, height: 35, borderRadius: 35 / 2,
                      backgroundColor: selectedView === index ? colors.secondary : colors.white,
                    }}>
                      <Text style={{
                        fontWeight: '700', fontSize: 14, alignItems: 'center'
                      }}>
                        {key}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={{ marginStart: 5, marginTop: 10, flexDirection: "row", flex: 1, marginEnd: 5 }}>
              <Text style={{
                paddingHorizontal: 5, fontSize: 16,
                fontWeight: "700", marginTop: 16,
              }}>
                Colors :
              </Text>
              <ScrollView
                horizontal
              >
                <View style={{ marginTop: 10, flexDirection: "row", }}>
                  {colorSelector.map((key, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleColorViewClick(index)}
                    >
                      <View style={{
                        opacity: selectedColorView === index ? 1 : 0.3,
                        marginEnd: 5, alignItems: 'center', justifyContent: 'center',
                        width: 35, height: 35, borderRadius: 35 / 2, backgroundColor: key.name,
                      }}>
                        <Text style={styles.checkmark}> {selectedColorView === index ? '✔' : ''}</Text>
                      </View>

                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>

            </View>
 */}

            {
              seller ? (
                <>

                  <View style={{ marginStart: 5, marginTop: 10, flexDirection: "row", flex: 1 }}>
                    <Text style={{
                      paddingHorizontal: 5, fontSize: 16,
                      fontWeight: "700", marginTop: 16,
                    }}>
                      Seller
                    </Text>
                  </View>
                  <TouchableOpacity
                    key={''}
                    onPress={() => {
                      navigation.navigate('homeProdInfo', {
                        productInfo: seller
                      })
                    }}
                    style={styles.userItem}
                  >
                    <Image source={{ uri: seller?.image }} style={styles.userPhoto} />
                    <View style={{ marginStart: 5, marginTop: 0, flexDirection: "column", flex: 1 }}>
                      <Text style={styles.userName}>{seller?.name}</Text>
                      {/* <Text style={styles.userName}>{'Luther'}</Text> */}
                      {/* <Text style={styles.userName}>{'Luther'}</Text> */}
                    </View>
                  </TouchableOpacity>
                </>
              ) : (<></>)
            }

          </View>
          <View
            style={{
              marginTop: sizes.margin,
            }}
          >
            {isCartItemExists ? (<>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: sizes.h3,
                  color: colors.black,
                  paddingTop: sizes.padding - 10,
                  paddingBottom: sizes.padding - 10,
                }}
              >
                Added to Cart
              </Text>
            </>) : (
              <View style={{ backgroundColor: colors.add_to_cart_bg }}>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(addToCart(product))
                  }}
                  disabled={
                    quantity >= 1 ? false : true
                  }
                >
                  {route?.params?.msg === "Update" ? (
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: sizes.h3,
                        color: colors.white,
                        paddingTop: sizes.padding - 10,
                        paddingBottom: sizes.padding - 10,
                      }}
                    >
                      Update to Cart
                    </Text>
                  ) : (
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: sizes.h3,
                        color: colors.white,
                        paddingTop: sizes.padding - 10,
                        paddingBottom: sizes.padding - 10,
                      }}
                    >
                      Add to Cart
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            )}


          </View>
        </View>


      </ScrollView>
    </SafeAreaView>

  )
}


export default ProductDetails

const styles = StyleSheet.create({
  safeContainerStyle: {
    backgroundColor: '#ededed',
    flex: 1,
    marginBottom: 60,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  text: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  dateTime: {
    paddingTop: 20,
  },
  generalCart: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 15,
  },
  quantity: {
    flexDirection: "row",
    justifyContent: "center",
  },
  quantityText: {
    flex: 1,
    flexDirection: "row",
  },
  input: {
    height: 40,
    width: 50,
    borderWidth: 1,
    borderColor: "rgba(27,31,35,0.05)",
    padding: 10,
    backgroundColor: "rgba(27,31,35,0.05)",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "#05a5d1",
    padding: 10,
    width: 150,
    height: 40,
  },
  buttonDisable: {
    backgroundColor: "#cccccc",
    color: "#666666",
    alignItems: "center",
    padding: 10,
    width: 150,
    height: 40,
    marginLeft: 20,
    borderBottomLeftRadius: 17,
    borderBottomRightRadius: 17,
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
  },
  decreaseButton: {
    height: 30,
    width: 30,
    backgroundColor: "rgba(27,31,35,0.05)",
  },
  increaseButton: {
    height: 30,
    width: 30,
    backgroundColor: "rgba(27,31,35,0.05)",
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    paddingBottom: 5,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    fontSize: 16,
    color: 'black',
  },
  userItem: {
    flexDirection: "row", flex: 1,
    marginRight: 10,
    marginStart: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  userPhoto: {
    marginRight: 15,
    marginTop: 10,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  userName: {
    marginTop: 25,
    textAlign: 'left',
  },
});