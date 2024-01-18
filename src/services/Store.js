import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { loginSlice } from "./slices/loginSlice";
import { registerSlice } from "./slices/registerSlice";
import { productSlice } from "./slices/productsSlice";
import { cartSlice } from "./slices/cartSlice";
import { favoriteSlice } from "./slices/favoriteSlice";
import { orderSlice } from "./slices/ordersSlice";
import { profileSlice } from "./slices/profileSlice";
import { sellerVerifySlice } from "./slices/sellerverify";
import { sellerProductsSlice } from "./slices/sellerProducts";
import sellerUser, { sellerUserSlice } from "./slices/sellerUser";
import { productInfoSlice } from "./slices/productsInfo";

//TODO Provide meaningful names to reducers which will conflict between app modules
const reducers = combineReducers({
    login: loginSlice.reducer,
    register: registerSlice.reducer,
    products: productSlice.reducer,
    cart: cartSlice.reducer,
    favorite:favoriteSlice.reducer,
    orders:orderSlice.reducer,
    profile:profileSlice.reducer,
    sellerverify:sellerVerifySlice.reducer,
    sellerProducts:sellerProductsSlice.reducer,
    sellerUser:sellerUserSlice.reducer,
    productsInfo:productInfoSlice.reducer,
  });


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    timeout: null,
  };
  
  const persistedReducer = persistReducer(persistConfig, reducers);
  
  const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
      }),
    devTools: process.env.NODE_ENV !== 'production',
  });
  
  export default store;