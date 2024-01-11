// cartSlice.js
import Realm from 'realm';
import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        clear(state) {
            return [];
        },

        addToFavorite(state, { payload }) {
            const { id } = payload;
            console.log("payload",payload)
            console.log("prod_id",id)
            console.log("state ",state)
            const find = state.find((item) => item.id === id);

            if (find) {
                return state.map((item) =>
                    item.id === id
                        ? {
                            ...item,
                            quantity: item.quantity + 1
                        }
                        : item
                );
            } else {
                state.push({
                    ...payload,
                    quantity: 1
                });
            }
        },

        removeFromFavorite (state,{payload}){
            const index = state.findIndex(item => item.id === payload);
            state = state.filter((_, i) => i !== index);
            return state
        },

        isFavorite(state, { payload }) {
            return state.map((item) =>
                item.id === payload
                    ? true
                    : false
            );
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
});

// Action creators are generated for each case reducer function
export const { addToFavorite,increament, decrement,removeFromFavorite ,isFavorite} =
favoriteSlice.actions;
export default favoriteSlice.reducer;
