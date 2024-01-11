import AsyncStorage from "@react-native-async-storage/async-storage";

export async function storeItem(key, value) {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.log("storeData error =>", error);
    }
}

export async function retrieveItem(key) {
    try {
        const data = await AsyncStorage.getItem(key)
        console.log("retrieveItem",data)
         return data
    } catch (error) {
        console.log("getData error=>", error);
    }
}

export async function getMultipleData(...item){
    try {
      const savedData = await AsyncStorage.multiGet(item);
    } catch (error) {
      console.log(error);
    }
  };

export async function removeItem(key) {
    try {
        return new Promise(async resolve => {
            await AsyncStorage.removeItem(key);
            resolve();
        });
    } catch (e) { 
        console.log("removeItem error=>", error);
    }
}

export async function removeAll() {
    try {
        return new Promise(async resolve => {
            await AsyncStorage.removeAll;
            resolve();
        });
    } catch (e) {
        console.log("removeAll error=>", error)
     }
}

export const KEY_USER_EMAIL = "user_email"
export const KEY_USER_ID = "user_Id"
export const KEY_USER_NAME = "user_name"
export const KEY_USER_PASSWORD = "password"
export const KEY_REMEMBER_ME = "remember"
export const KEY_IS_USER_LOGDED = "isUserLogged"
export const KEY_IS_DUMMY_DATA = "isDummyData"




