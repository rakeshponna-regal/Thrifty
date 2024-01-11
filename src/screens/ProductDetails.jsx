import React, { useState } from 'react'
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
import { useDispatch ,useSelector} from 'react-redux';
import {  addToCart, removeItemFromCart } from '../services/slices/cartSlice';
import { HeaderBackTitle } from '../components/header';
import { selectCartItemExists } from '../services/slices/selector';

const ProductDetails = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const itemProduct = route.params?.product;
  // console.log(route.params.product)
  const [product,setProduct]  = useState(itemProduct)
  const [quantity,setQuantity]  = useState(1)
  const [price,setPrice]  = useState(product.price)
  const [desc,setDesc]  = useState(product.description)
  const [rating,setRating]  = useState(parseInt(product.rating.rate))
  const isCartItemExists = useSelector(selectCartItemExists(product.id));
  console.log("isCartItemExists",isCartItemExists)
  return (
    <SafeAreaView forceInset={{ top: 'always' }} style={styles.safeContainerStyle}>
       <HeaderBackTitle navigation={navigation} title={ product.title}  isBackVisible={true}/> 
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
        <View style={{ flex: 1 }}>
          <View style={{ height: 130, backgroundColor: colors.white }}>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <Text
                style={{
                  flex: 1,
                  fontSize: sizes.h3,
                  fontWeight: "700",
                  paddingHorizontal: sizes.padding,
                  marginTop: sizes.margin,
                }}
              >
                US ${price}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    top: 22,
                    left: 22,
                    paddingRight: sizes.padding - 15,
                  }}
                >
                  <StarRating
                    disable={true}
                    maxStars={1}
                    rating={rating}
                    starSize={13}
                    fullStarColor="#C5CCD6"
                  ></StarRating>
                </View>
                <View>
                  <Text
                    style={{
                      textAlign: "right",
                      fontSize: sizes.paragraph,
                      paddingHorizontal: sizes.padding,
                      marginTop: sizes.margin,
                      color: "#C5CCD6",
                    }}
                  >
                    {rating-1}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ marginTop: sizes.margin - 5 }}>
              <Text style={{ paddingHorizontal: sizes.padding }}>
                {desc}
              </Text>
            </View>
            {/* <View style={{ marginTop: sizes.margin - 8 }}>
              <Text style={{ paddingHorizontal: sizes.padding }}>
                {sold} orders
              </Text>
            </View> */}
          </View>
          <View
            style={{
              backgroundColor: colors.white,
              marginTop: sizes.margin,
            }}
          >
            <View style={{ flexDirection: "column", flexWrap: "wrap",marginTop:10 }}>
              <Text
                style={{
                  fontSize: sizes.h3,
                  fontWeight: "700",
                  paddingHorizontal: sizes.padding,
                }}
              >
                Customer Reviews
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: sizes.paragraph,
                      paddingHorizontal: sizes.padding,
                      marginTop: sizes.margin - 5,
                    }}
                  >
                    {rating}
                  </Text>
                </View>
                <View
                  style={{
                    fontSize: sizes.paragraph,
                    marginTop: sizes.margin - 3,
                    marginLeft: 0,
                  }}
                >
                  <StarRating
                    disable={true}
                    maxStars={5}
                    rating={rating}
                    starSize={13}
                  ></StarRating>
                </View>
              </View>
              <View style={{ marginTop: sizes.margin - 4 }}>
                <Text
                  style={{
                    fontSize: sizes.text,
                    paddingHorizontal: sizes.padding,
                    color: "#C5CCD6",
                  }}
                >
                  John Doe ({rating})
                </Text>
                <Text
                  style={{
                    fontSize: sizes.text,
                    paddingHorizontal: sizes.padding,
                    marginTop: sizes.margin - 5,
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit. Donec dapibus diam sed bibendum accumsan.
                  Vivamus ligula lorem, commodo nec pretium vel.
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: sizes.paragraph,
                      paddingHorizontal: sizes.padding,
                      marginTop: sizes.margin - 5,
                    }}
                  >
                    {rating}
                  </Text>
                </View>
                <View
                  style={{
                    fontSize: sizes.paragraph,
                    marginTop: sizes.margin - 3,
                    marginLeft: 0,
                  }}
                >
                  <StarRating
                    disable={true}
                    maxStars={5}
                    rating={rating}
                    starSize={13}
                  ></StarRating>
                </View>
              </View>
              <View style={{ marginTop: sizes.margin - 4 }}>
                <Text
                  style={{
                    fontSize: sizes.text,
                    paddingHorizontal: sizes.padding,
                    color: "#C5CCD6",
                  }}
                >
                  Martin ({rating})
                </Text>
                <Text
                  style={{
                    fontSize: sizes.text,
                    paddingHorizontal: sizes.padding,
                    marginTop: sizes.margin - 5,
                    marginBottom:10,
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit. Donec dapibus diam sed bibendum accumsan.
                  Vivamus ligula lorem, commodo nec pretium vel.
                </Text>
              </View>
            </View>
          </View>
          
          <View
            style={{
              backgroundColor: colors.white,
              marginTop: sizes.margin,
            }}
          >
{/*             
            <View>
              <View style={styles.generalCart}>
                <View style={styles.quantityText}>
                  <Text
                    style={{
                      fontSize: 16,
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1,
                      top: 5,
                    }}
                  >
                    Quantity
                  </Text>
                </View>
                <View style={styles.quantity}>
                  <TouchableOpacity
                    style={styles.decreaseButton}
                    onPress={decreaseQuantity}
                    disabled={
                      quantity  > 0 ? false : true
                    }
                  >
                    <Text
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        top: 5,
                      }}
                    >
                      {" "}
                      -{" "}
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 14,
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      top: 5,
                      paddingHorizontal: 10,
                    }}
                  >
                    {quantity}
                  </Text>
                  <TouchableOpacity
                    style={styles.increaseButton}
                    onPress={increaseQuantity}
                  >
                    <Text
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        top: 5,
                      }}
                    >
                      {" "}
                      +{" "}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View> */}

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
    marginBottom:60,
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
});