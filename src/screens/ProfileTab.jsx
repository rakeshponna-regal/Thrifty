import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native'
import { HeaderBackTitle } from '../components/header'
import { KEY_IS_USER_LOGDED, KEY_USER_EMAIL, KEY_USER_ID, KEY_USER_NAME, removeAll, retrieveItem, storeItem } from '../utils/asyncStorage'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import { useDispatch, useSelector } from 'react-redux';
import { selectSeller } from '../services/slices/selector';

const ProfileTab = ({ navigation }) => {
  const dispatch = useDispatch();
  const seller = useSelector((state) => state.sellerverify);
  const sellerCount = useSelector(selectSeller);

  const [name, setUserName] = useState()
  const [email, setEmail] = useState()
  const [userID, setUserId] = useState()
  const isUserIdVerified = seller?.some((item) => item.user_id === userID);

  console.log("seller", sellerCount, seller)
  useEffect(() => {
    initData()
  }, [])

  const initData = async () => {
    let email = await retrieveItem(KEY_USER_EMAIL)
    let name = await retrieveItem(KEY_USER_NAME)
    let userID = await retrieveItem(KEY_USER_ID)
    setUserId(userID)
    console.log(name, email, userID)
    setUserName(name)
    setEmail(email)
  }

  const signOut = async () => {
    await storeItem(KEY_IS_USER_LOGDED, "false")
    navigation.replace('LoginScreen')
  }
  return (
    <SafeAreaView forceInset={{ top: 'always' }} style={styles.safeContainerStyle}>
      <HeaderBackTitle navigation={navigation} title={'Profile'} isBackVisible={false} isSellerVisible={false} isSellerActivated={false} />
      <View style={styles.containerView} >
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image
              style={styles.avatar}
              source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }}
            />

            <Text style={styles.name}>{name} </Text>
            <Text style={styles.userInfo}>{email}</Text>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.body2}>
            <TouchableOpacity
              onPress={() => {
                if (!isUserIdVerified) {
                  navigation.navigate('profileSellerVerify')
                }
              }}
              style={{
                marginStart: 5, marginTop: 10, flexDirection: "row",
                paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10
              }}>
              <Text style={styles.name}>Seller Authentication</Text>
              {
                isUserIdVerified ? (
                  <MaterialIcons name='verified-user' color='blue' size={20} />
                ) : (
                  <Octicons name='unverified' color='grey' size={20} />
                )
              }
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.box}
              onPress={() => {
                navigation.navigate('profileSellerVerify')
              }}
            >
              <Text style={styles.name}>Seller Authentication </Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.box}
              onPress={() => {
                navigation.navigate('profileOrders')
              }} >
              <Text style={styles.name}>Orders </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box}>
              <Text style={styles.name}>Returns</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box}
              onPress={() => {
                navigation.navigate('profilePayment')
              }}
            >
              <Text style={styles.name}>Payment Methods</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box}>
              <Text style={styles.name}>Refer </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box}>
              <Text style={styles.name}>Shipped </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box}
              onPress={() => {
                signOut()
              }}
            >
              <Text style={styles.name}>Sign out </Text>
            </TouchableOpacity>

          </View>
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
    backgroundColor: '#ffffff',
    color: "white"
  },
  header: {
    backgroundColor: '#DCDCDC',
  },
  headerContent: {
    padding: 10,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    marginStart: 10,
    marginEnd: 5,
    color: '#000000',
    fontWeight: '400',
  },
  body: {
    width: "100%",
    height: 500,
    alignItems: 'flex-start',
  },
  body2: {
    width: "100%",
    height: 500,
    alignItems: 'flex-start',
  },
  spacerStyle: {
    height: "10%",
    backgroundColor: '#ffffff',
    marginBottom: 15,
  },
  box: {
    width: "100%",
    padding: 10,
    marginBottom: 1,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
  },
  spacerStyleDivider: {
    marginBottom: 60,
  },
  title: {
    fontWeight: "500",
    fontSize: 16,
    color: "#666666",
    marginStart: 15,
    marginBottom: 5,
    marginTop: 10,
  },
})

export default ProfileTab
