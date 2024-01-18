// cartSlice.js
import Realm from 'realm';
import { createSlice } from '@reduxjs/toolkit';
import realmSchema, { sch_cart } from '../../database/RealmConfig';
import { getCart } from '../api/cartService';
import { KEY_USER_ID, retrieveItem } from '../../utils/asyncStorage';

const initialState = [];

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart(state) {
            return [];
        },

        addToCart(state, { payload }) {
            const { id } = payload;
            const find = state.find((item) => item.id === id);
            if (find) {
                // return state.map((item) =>
                //     item.id === id
                //         ? {
                //             ...item,
                //             quantity: item.quantity + 1
                //         }
                //         : item
                // );
            } else {
                state.push({
                    ...payload,
                    quantity: 1
                });
            }
        },

        removeFromCart (state,{payload}){
            const index = state.findIndex(item => item.id === payload);
            state = state.filter((_, i) => i !== index);
            return state
        },

        increament(state, { payload }) {
            return state.map((item) =>
                item.id === payload
                    ? {
                        ...item,
                        quantity: item.quantity + 1
                    }
                    : item
            );
        },
        decrement(state, { payload }) {
            return state.map((item) =>
                item.id === payload
                    ? {
                        ...item,
                        quantity: item.quantity - 1
                    }
                    : item
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCart.fulfilled, (state, payload) => {
                state.cartItems = payload;
            }).addCase(getCart.rejected, (state, payload) => {
                state.errorMessage = payload.message;
            })
    },
});

// Action creators are generated for each case reducer function
export const { addToCart,increament, decrement,removeFromCart ,clearCart} =
    cartSlice.actions;
export default cartSlice.reducer;

export { getCart };
// The reducer

// Helper function to save cart items to AsyncStorage
const saveCartToDB = async (data) => {
    try {
        console.log("object", data)
        let userID = await retrieveItem(KEY_USER_ID)
        let cart = realmSchema.objects(sch_cart)
        var ID = Math.floor(Math.random() * 100)
        var c_ID = Math.floor(Math.random() * 100)
        const updatedAtDate = new Date();
        console.log(updatedAtDate); // This will log the Date object
        const formattedDate = updatedAtDate.toISOString();
        console.log(formattedDate); // This will log the formatted date string

        if (cart.length == 0) {
            let prod = {
                id: parseInt(ID),
                product_id: parseInt(data.id),
                cart_id: parseInt(c_ID),
                user_id: userID,
                qty: parseInt(data.qty),
                title: data.title,
                price: parseFloat(data.price),
                images: data.images,
                created_at: formattedDate,
            }
            console.log("saveCartToDB => be", prod)
            let res = realmSchema.write(() => {
                realmSchema.create(sch_cart, prod);
            })
            let cart = realmSchema.objects(sch_cart);
            console.log("Read cart => ", cart)
            console.log("saveCartToDB => ", res)
        }
    } catch (e) {
        console.error(e);
    }
};

const removeCartToDB = (data) => {
    let cart_id = data.cart_id
    const objectsToDelete = realmSchema.objects(sch_cart).filtered('CarId == $0', cart_id);
    let res = realmSchema.write(() => {
        realmSchema.delete(sch_cart, objectsToDelete);
    })
    console.log(res)
}

const updateCartToDB = (data) => {
    let cart_id = data.cart_id
    const objects = realmSchema.objects(sch_cart).filtered('CarId == $0', cart_id);
    objects = data
    let res = realmSchema.write(() => {
        realmSchema.write(sch_cart, objects);
    })
    console.log(res)
}