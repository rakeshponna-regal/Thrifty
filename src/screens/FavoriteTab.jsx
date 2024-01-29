import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import { HeaderBackTitle } from '../components/header'
import { useDispatch, useSelector } from 'react-redux'
import { sizes, colors } from "../utils/Theme";
import { removeFromFavorite } from '../services/slices/favoriteSlice';
import Icon from "react-native-vector-icons/Ionicons";
import { addToCart, removeFromCart } from '../services/slices/cartSlice';

const FavoriteTab = ({ navigation }) => {
  const favorite = useSelector((state) => state.favorite);
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  console.log("favorite", favorite)
  return (
    <SafeAreaView forceInset={{ top: 'always' }} style={styles.safeContainerStyle}>
      <HeaderBackTitle navigation={navigation} title={'Favorites'} isBackVisible={false} isSellerVisible={true} isSellerActivated={false} />
      <View style={styles.containerView} >
        {(!favorite || favorite.length === 0) ? (
          <Text
            style={{
              fontSize: 18,
              marginTop: 250,
              fontWeight: "bold",
              justifyContent: 'center',
              alignItems: "center",
              alignSelf: 'center',
              textAlign: "center",
            }}
          >
            No items in the favorite
          </Text>
        ) : null}
        <ScrollView>
          {favorite && favorite.map(item => {
            return (
              <View key={item.id} style={styles.cartItems}>
                <TouchableOpacity
                  onPress={() => {
                    console.log("goToItem", item.id, item.qty)
                    navigation.navigate('favoriteProdItems', {
                      product: item
                    });
                  }
                  }
                >
                  <Image style={styles.image} source={{ uri: item.images[0] }} />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>
                    {item?.title.slice(0.10)}...
                  </Text>
                  <Text style={styles.title}>
                    Price : ${item?.price}
                  </Text>

                  {
                    cart.some((cart) => cart.id === item.id) ?
                      (
                        <TouchableOpacity
                          onPress={() => {
                            dispatch(removeFromCart(item.id))
                          }
                          }
                          style={{
                            backgroundColor: '#00306b',
                            color: '#FFFFFF',
                            width: 130,
                            padding: 5,
                            alignItems: 'flex-start',
                            borderRadius: 10,
                            marginLeft: 10,
                            marginTop: 5,
                            marginBottom: 5,
                          }}
                        >
                          <Text style={{
                            color: '#FFFFFF',
                            paddingStart: 8,
                            fontSize: 12,
                            fontWeight: '600',
                          }}>Remove from cart</Text>
                        </TouchableOpacity>
                      ) :
                      (
                        <TouchableOpacity
                          onPress={() => {
                            dispatch(addToCart(item))
                          }
                          }
                          style={{
                            backgroundColor: '#00306b',
                            color: '#FFFFFF',
                            width: 90,
                            padding: 5,
                            alignItems: 'flex-start',
                            borderRadius: 10,
                            marginLeft: 10,
                            marginTop: 5,
                            marginBottom: 5,
                          }}
                        >
                          <Text style={{
                            color: '#FFFFFF',
                            paddingStart: 8,
                            fontSize: 12,
                            fontWeight: '600',
                          }}>Add to cart</Text>
                        </TouchableOpacity>
                      )
                  }
{/* 
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(addToCart(item))
                    }
                    }
                    style={{
                      backgroundColor: '#00306b',
                      color: '#FFFFFF',
                      width: 90,
                      padding: 5,
                      alignItems: 'flex-start',
                      borderRadius: 10,
                      marginLeft: 10,
                      marginTop: 5,
                      marginBottom: 5,
                    }}
                  >
                    <Text style={{
                      color: '#FFFFFF',
                      paddingStart: 8,
                      fontSize: 12,
                      fontWeight: '600',
                    }}>Add to cart</Text>
                  </TouchableOpacity>
 */}

                </View>

                <TouchableOpacity
                  style={{ ...styles.button }}
                  onPress={() => {
                    dispatch(removeFromFavorite(item.id))
                  }
                  }
                >
                  <View>
                    <Icon
                      name="trash"
                      size={30}
                      style={{
                        marginRight: 10,
                        textAlign: "right",
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>



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
    backgroundColor: '#ffffff',
    color: "white"
  },
  title: {
    fontSize: 14,
    paddingHorizontal: sizes.padding,
  },
  text: {
    paddingHorizontal: sizes.padding,
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

export default FavoriteTab