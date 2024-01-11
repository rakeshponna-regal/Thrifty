import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { HeaderBackTitle } from '../components/header'
import { SafeAreaView } from 'react-native-safe-area-context'

const SellerClosets = ({navigation}) => {
  return (
    <SafeAreaView forceInset={{ top: 'always' }} style={styles.safeContainerStyle}>
       <HeaderBackTitle navigation={navigation} title={ 'Seller closets'}  isBackVisible={false} /> 
       <View style={styles.containerView} >

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
      marginEnd:5,
      width: "100%",
      height: '100%',
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
export default SellerClosets
