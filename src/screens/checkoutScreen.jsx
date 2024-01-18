import { SafeAreaView, View, StyleSheet, ScrollView, TextInput,KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import CustomTextinput from "../components/CustomTextinput";
import { HeaderBackTitle } from "../components/header";

const CheckOutScreen = ({navigation}) => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [AddressLine1, setAddressLine1] = useState("");
  const [AddressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");

  const handleChange = () => {
    // Creating an object to store the user's input
    let address = {
      first_name: firstName,
      last_name: lastName,
      email,
      address_1: AddressLine1,
      address_2: AddressLine2,
      city,
      province,
      postal_code: postalCode,
      phone,
      company,
      country
    };
    // Calling the onChange function and passing the address object as an argument
    // onChange(address);
  };

  return (
    <SafeAreaView forceInset={{ top: 'always' }} style={[styles.safeContainerStyle]}>
      <View style={styles.container}>
      <HeaderBackTitle navigation={navigation} title={'Checkout'} isBackVisible={true} isSellerVisible = {true} isSellerActivated={false}/>
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
              value={firstName}
              placeholder="First Name"
              onChangeText={value => {
                setFirstName(value)
                handleChange();
              }}
              autoCapitalize="sentences"
              returnKeyType="next"
              style={{ textAlignVertical: 'top' }}
            />

          <CustomTextinput
              value={lastName}
              placeholder="Last Name"
              onChangeText={value => {
                setLastName(value)
                handleChange();
              }}
              autoCapitalize="sentences"
              returnKeyType="next"
              style={{ textAlignVertical: 'top' }}
            />
            <CustomTextinput
              value={email}
              placeholder="Email"
              onChangeText={value => {
                setEmail(value)
                handleChange();
              }}
              returnKeyType="next"
              style={{ textAlignVertical: 'top' }}
            />
            <CustomTextinput
              value={AddressLine1}
              placeholder="Address Line 1"
              multiline={true}
              onChangeText={value => {
                setAddressLine1(value)
                handleChange();
              }}
              returnKeyType="next"
              style={{ textAlignVertical: 'top' }}
            />
            <CustomTextinput
              value={AddressLine2}
              multiline={true}
              placeholder="Address Line 2"
              onChangeText={value => {
                setAddressLine2(value)
                handleChange();
              }}
              returnKeyType="next"
              style={{ textAlignVertical: 'top' }}
            />
            <CustomTextinput
              value={city}
              placeholder="City"
              onChangeText={value => {
                setCity(value)
                handleChange();
              }}
              returnKeyType="next"
              style={{ textAlignVertical: 'top' }}
            />
            <CustomTextinput
              value={country}
              placeholder="Country"
              onChangeText={value => {
                setCountry(value)
                handleChange();
              }}
              returnKeyType="next"
              style={{ textAlignVertical: 'top' }}
            />
            <CustomTextinput
              value={province}
              placeholder="Province"
              onChangeText={value => {
                setProvince(value)
                handleChange();
              }}
              returnKeyType="next"
              style={{ textAlignVertical: 'top' }}
            />
            <CustomTextinput
              value={postalCode}
              placeholder="Postal Code"
              onChangeText={value => {
                setPostalCode(value)
                handleChange();
              }}
              returnKeyType="next"
              style={{ textAlignVertical: 'top' }}
            />
            <CustomTextinput
              value={phone}
              placeholder="Phone"
              onChangeText={value => {
                setPhone(value)
                handleChange();
              }}
              returnKeyType="next"
              style={{ textAlignVertical: 'top' }}
            />
          </KeyboardAvoidingView>
        </ScrollView>



      </View>
    </SafeAreaView>
  )
}

export default CheckOutScreen


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
  input: {
    borderWidth: 1,
    padding: 12,
    borderColor: "#E5E5E5",
    borderRadius: 5,
    marginTop: 10.2,
  },

});