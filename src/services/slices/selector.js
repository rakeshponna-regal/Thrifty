import AsyncStorage from "@react-native-async-storage/async-storage";
import { KEY_USER_ID, retrieveItem } from "../../utils/asyncStorage";
import { sleep } from "../../components/Loader";
import { createSelector } from 'reselect';

// const { createSelector } = require("@reduxjs/toolkit");

const cartSelector = (state) => state.cart;
const favoriteSelector = (state) => state.favorite;
const sellerSelector = (state) => state.sellerverify;
const products = (state) => state.products.products;
const productsInfoSelector = (state) => state.productsInfo;
const orders = (state) => state.orders;

// Define a selector to get the list of cart items
export const selectCartItems = createSelector([cartSelector], (cart) => cart);

export const productsList = createSelector([products], (item) => item);

// Seller ID to filter products
const selectedSellerIdSelector = (state, props) => props.sellerId;

export const userIDSelector = async () => {
    let user = await retrieveItem(KEY_USER_ID)
    return user
};

export const getUserIdFromAsyncStorage = async () => {
    try {
        const userId = await AsyncStorage.getItem(KEY_USER_ID);
        return userId;
    } catch (error) {
        console.error('Error fetching user ID from AsyncStorage:', error);
        return null;
    }
};

// Define the selectedUserIdSelector using createAsyncSelector
export const selectedUserIdSelector = createSelector(
    [getUserIdFromAsyncStorage],
    (userid) => userid
  );

export const getProductsBySellerId = createSelector(
    [productsInfoSelector, selectedSellerIdSelector],
    (products, sellerId) => {
        console.log(products, sellerId)
        // Filter products based on the seller ID
        return products.filter(product => product.seller_id === sellerId);
    }
);

export const getSellerByUser = createSelector(
    [sellerSelector, getUserIdFromAsyncStorage],
    (seller, userID) => {
        console.log("object", userID)
        return seller.filter(item => item.user_id === userID);
    }
);

export const getSellersByUserId = createSelector(
    [sellerSelector, (_, user_id) => user_id], // (_, user_id) is a selector that takes the second argument (user_id)
    (seller, user_id) => {
        return seller.filter(product => product.user_id === user_id);
    }
);

// Define a selector to check if an item with a specific cart_id already exists
export const selectCartItemExists = (id) =>
    createSelector([selectCartItems], (cart) =>
        cart.some((item) => item.id === id)
    );

// Define a selector to get the list of cart items
export const selectFavoriteItems = createSelector([favoriteSelector], (cart) => cart);

// Define a selector to check if an item with a specific cart_id already exists
export const selectFavoriteItemExists = (id) =>
    createSelector([selectFavoriteItems], (cart) =>
        cart.some((item) => item.id === id)
    );

// Define a selector to get the list of cart items
export const selectSeller = createSelector([sellerSelector],
    seller => (seller ? seller.length : 0)
);

export const cartTotalSelector = createSelector([cartSelector], (cart) =>
    cart.reduce((total, current) => (total += current.quantity), 0)
);

export const cartQtySelector = createSelector([cartSelector], (cart) =>
    cart.reduce((quantity, current) => (quantity += current.quantity), 0)
);

export const checkProductAddedTocartSelector = createSelector([cartSelector], (cart) =>
    cart.reduce((quantity, current) => (quantity += current.quantity), 0)
);

export const cartTotalPriceSelector = createSelector([cartSelector], (cart) =>
    cart.reduce(
        (total, current) => (total += current.price * current.quantity),
        0
    )
);